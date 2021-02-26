export const UPDATE_CART_ITEM = "UPDATE_CART_ITEM";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";
export const APPLY_SHIPPING_METHOD = "APPLY_SHIPPING_METHOD";
export const RELOAD_PAGE = "RELOAD_PAGE";
export const ASSIGN_PREV_STEP = "ASSIGN_PREV_STEP";

import {
  ADD_TO_CART,
  ADD_TO_VENDOR,
} from "@bavaan/graphql/product/product-detail.graphql";
import { APPLY_SHIPPING_METHOD_GRAPHQL } from "@bavaan/graphql/order/shipping-method.graphql";
import { client } from "../../config/graphql";
import gql from "graphql-tag";
import Router from 'next/router'

import {
  ADJUST_ITEM_QUANTITY,
  REMOVE_ITEM_FROM_CART,
  GET_ACTIVE_ORDER_VENDOR,
} from "@bavaan/graphql/cart/cart-drawer.graphql";
import {
  APPLY_COUPON_CODE_ORDER_VENDOR,
  REMOVE_COUPON_CODE_ORDER_VENDOR,
  TRANSITION_ORDER_VENDOR_STATE,
  SET_CUSTOMER_FOR_ORDER_VENDORS,
} from "@bavaan/graphql/checkout/checkout-shipping.graphql";

import { ADD_PAYMENT_TO_ORDER_VENDOR } from "@bavaan/graphql/checkout/checkout-payment.graphql";
export const clearCartReducer = () => {
  return (dispatch) => {
    dispatch({ type: DELETE_ALL_FROM_CART });
  };
};

export const updateCartByAPI = () => {
  return async (dispatch) => {
    try {
      const updateCurrentCard = await client.query({
        query: GET_ACTIVE_ORDER_VENDOR,
        fetchPolicy: "network-only",
      });
      const cartItems = updateCurrentCard.data.activeOrderVendors;
      
      if (cartItems != null) {
        dispatch({
          type: UPDATE_CART_ITEM,
          payload: updateCurrentCard.data.activeOrderVendors,
        });
      } else {
        dispatch({
          type: DELETE_ALL_FROM_CART,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const updateCartResponse = (cart) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_CART_ITEM,
      payload: cart,
    });
  };
};

//add to cart
export const addToCart = (item, addToast, quantityCount) => {
  return async (dispatch) => {
    try {
      
      let addItemToCartResult = await client.mutate({
        mutation: ADD_TO_CART,
        variables: {
          variantId: (item.productVariant && item.productVariant.id) ?? item.id,
          qty: quantityCount,
        },
      });
      if (addToast) {
        addToast("Added To Cart", {
          appearance: "success",
          autoDismiss: true,
        });
      }
      dispatch({
        type: UPDATE_CART_ITEM,
        payload: addItemToCartResult.data.addItemToOrder,
      });
    } catch (e) {
      if (addToast)
        addToast(e.message || e, {
          appearance: "error",
          autoDismiss: true,
        });
      return null;
    }
  };
};

export const addToVendor = (item, addToast, quantityCount) => {
  
  return async (dispatch) => {
    try {
      
      let addItemToVendorResult = await client.mutate({
        mutation: ADD_TO_VENDOR,
        variables: {
          variantId: item.id,
          qty: quantityCount,
          channel: item.channel.id,
        },
      });
      dispatch({
        type: UPDATE_CART_ITEM,
        payload: addItemToVendorResult.data.addItemToOrderVendor,
      });
      /* console.log("Result", addItemToVendorResult.data.addItemToOrderVendor[0]) */
      if (addToast) {
        addToast("Added To Cart Success", {
          appearance: "success",
          autoDismiss: true,
        });
      }
    } catch (e) {
      if (addToast)
        addToast(e.message || e, {
          appearance: "error",
          autoDismiss: true,
        });
      return null;
    }
  };
};

export const buyNowAction = (item, addToast, quantityCount) => {
  //const router = useRouter();
  return async (dispatch) => {
    try {
      
      let addItemToVendorResult = await client.mutate({
        mutation: ADD_TO_VENDOR,
        variables: {
          variantId: item.id,
          qty: quantityCount,
          channel: item.channel.id,
        },
      });
      dispatch({
        type: UPDATE_CART_ITEM,
        payload: addItemToVendorResult.data.addItemToOrderVendor,
      });
      /* console.log("Result", addItemToVendorResult.data.addItemToOrderVendor[0]) */
      if (addToast) {
        // direct to /other/cart
        return Router.push("/other/cart");
      }
    } catch (e) {
      if (addToast)
        addToast(e.message || e, {
          appearance: "error",
          autoDismiss: true,
        });
      return null;
    }
  };
};

//decrease from cart
export const decreaseQuantity = (item, addToast) => {
  
  return async (dispatch) => {
    try {
      let adjustOrderLineResult = {};
      if (item.quantity > 1) {
        adjustOrderLineResult = await client.mutate({
          mutation: ADJUST_ITEM_QUANTITY,
          variables: {
            id: item.id,
            qty: item.quantity - 1,
          },
        });
      } else {
        adjustOrderLineResult = await client.mutate({
          mutation: REMOVE_ITEM_FROM_CART,
          variables: {
            id: item.id,
          },
        });
      }

      if (addToast) {
        addToast("Item Decremented From Cart", {
          appearance: "warning",
          autoDismiss: true,
        });
      }
      dispatch({
        type: UPDATE_CART_ITEM,
        payload:
          adjustOrderLineResult.data.adjustOrderVendorLine ??
          adjustOrderLineResult.data.removeOrderVendorLine,
      });
    } catch (e) {
      if (addToast) {
        addToast(e.message || e, {
          appearance: "warning",
          autoDismiss: true,
        });
      }
      return null;
    }
  };
};
//delete from cart
export const deleteFromCart = (item, addToast) => {
  return async (dispatch) => {
    try {
      
      /* console.log('Orderline', item.lines[0].id) */
      let deleteFromCart = await client.mutate({
        mutation: REMOVE_ITEM_FROM_CART,
        variables: {
          id: item.id,
        },
      });

      if (addToast) {
        addToast("Removed From Cart", {
          appearance: "error",
          autoDismiss: true,
        });
      }
      dispatch({
        type: UPDATE_CART_ITEM,
        payload: deleteFromCart.data.removeOrderVendorLine,
      });
    } catch (e) {
      if (addToast) {
        addToast(e.message || e, {
          appearance: "error",
          autoDismiss: true,
        });
      }
      console.log(e.message);
    }
  };
};

//delete all from cart
export const deleteAllFromCart = (addToast) => {
  return async (dispatch) => {
    // let deleteAllCart = await client.mutate({
    //   mutation: REMOVE_ITEM_FROM_CART,
    //   variables: {
    //     id: item.id,
    //     qty: 1,
    //   },
    // });
    if (addToast) {
      addToast("Removed All From Cart", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    dispatch({
      type: DELETE_ALL_FROM_CART,
    });
  };
};

// get stock of cart item
export const cartItemStock = (item, color, size) => {
  if (item.stock) {
    return item.stock;
  } else {
    //   return item.variation
    //     .filter((single) => single.color === color)[0]
    //     .size.filter((single) => single.name === size)[0].stock;
  }
};
export const applyShippingMethodByOrder = (methodId_, orderId_, addToast) => {
  return async (dispatch) => {
    try {
      let applyShippingMethodResult = await client.mutate({
        mutation: APPLY_SHIPPING_METHOD_GRAPHQL,
        variables: {
          methodId: methodId_,
          oderId: orderId_,
        },
      });
      
      dispatch({
        type: UPDATE_CART_ITEM,
        payload: applyShippingMethodResult.data.setShippingMethodByOrderVendor,
      });
      if (addToast) {
        addToast("Applied shipping method success!", {
          appearance: "success",
          autoDismiss: true,
        });
      }
    } catch (e) {
      if (addToast)
        addToast(e.message || e, {
          appearance: "error",
          autoDismiss: true,
        });
      return null;
    }
  };
};

export const applyCouponCode = (orderId_, couponCode_, addToast) => {
  return async (dispatch) => {
    try {
      let applyCouponCodeResult = await client.mutate({
        mutation: APPLY_COUPON_CODE_ORDER_VENDOR,
        variables: {
          orderId: orderId_,
          couponCode: couponCode_,
        },
      });
      dispatch({
        type: UPDATE_CART_ITEM,
        payload: applyCouponCodeResult.data.applyCouponCodeForOrderVendor,
      });
      if (addToast) {
        addToast("Applied coupon code success!", {
          appearance: "success",
          autoDismiss: true,
        });
      }
    } catch (e) {
      if (addToast)
        addToast(e.message || e, {
          appearance: "error",
          autoDismiss: true,
        });
      return null;
    }
  };
};
export const removeCouponCode = (orderId_, couponCode_, addToast) => {
  return async (dispatch) => {
    try {
      const removeCouponCodeResponse = await client.mutate({
        mutation: REMOVE_COUPON_CODE_ORDER_VENDOR,
        variables: {
          orderId: orderId_,
          couponCode: couponCode_,
        },
      });
      dispatch({
        type: UPDATE_CART_ITEM,
        payload: removeCouponCodeResponse.data.removeCouponCodeForOrderVendor,
      });
      if (addToast) {
        addToast("Coupon code was removed for this order!", {
          appearance: "warning",
          autoDismiss: true,
        });
      }
    } catch (e) {
      if (addToast)
        addToast(e.message || e, {
          appearance: "error",
          autoDismiss: true,
        });
      return null;
    }
  };
};
export const processToPayment = (addToast) => {
  return async (dispatch) => {
    try {
      const transitionStateResponse = await client.mutate({
        mutation: TRANSITION_ORDER_VENDOR_STATE
      })
      if (transitionStateResponse.data != null && transitionStateResponse.data.transitionOrderVendorToState != null) {
        dispatch({
          type: UPDATE_CART_ITEM,
          payload: transitionStateResponse.data.transitionOrderVendorToState
        })
        if (addToast) {
            addToast("In ArrangingPayment State !", {
              appearance: "success",
              autoDismiss: true,
            });
          }
        }
    } catch (error) {
      if (addToast) {
        addToast(error.message || error, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  }
}
// export const processToPayment = (input_, currentCustomer, cartItems,  addToast) => {
//   console.log("CHECK LOGGED IN", input_);
//   return async (dispatch) => {
//     try {
//       if (cartItems.orders && cartItems.orders.length > 0 && cartItems.orders[0].shippingAddress)
//       {
//         console.log('Current customer', currentCustomer)
//         if (currentCustomer == null || Object.keys(currentCustomer).length === 0) {
//           const customerResponse = await client.mutate({
//             mutation: SET_CUSTOMER_FOR_ORDER_VENDORS,
//             variables: {
//               input: input_,
//             },
//           });
//         }
//         const latestResponse = await client.mutate({
//           mutation: TRANSITION_ORDER_VENDOR_STATE,
//         });
//         dispatch({
//           type: UPDATE_CART_ITEM,
//           payload: latestResponse.data.transitionOrderVendorToState,
//         });
  
//         if (addToast) {
//           addToast("In ArrangingPayment State !", {
//             appearance: "success",
//             autoDismiss: true,
//           });
//         }
//       }
//       else {
//         if (addToast) {
//           addToast("Must be choose shipping address before pay !", {
//             appearance: "error",
//             autoDismiss: true,
//           });
//         }
//       }
//     } catch (e) {
//       if (addToast)
//         addToast(e.message || e, {
//           appearance: "error",
//           autoDismiss: true,
//         });
//       return null;
//     }
//   };
// };

export const addPaymentToOrderVendor = (input_, addToast) => {
  
  return async (dispatch) => {
    try {
      const addPaymentResponse = await client.mutate({
        mutation: ADD_PAYMENT_TO_ORDER_VENDOR,
        variables: {
          input: input_,
        },
      });
      await updateCartByAPI();

      if (addToast) {
        addToast("Payment Success, Thank you !", {
          appearance: "success",
          autoDismiss: true,
        });
      }
     
    } catch (e) {
      if (addToast)
        addToast(e.message || e, {
          appearance: "error",
          autoDismiss: true,
        });
      return null;
    }
  };
};
export const assignPrevStep = (prevStep) => {
  
  return async (dispatch) => {
    try {
      dispatch({
        type: ASSIGN_PREV_STEP,
        payload: prevStep,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
