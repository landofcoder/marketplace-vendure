import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { IoMdCash } from "react-icons/io";
import LayoutFive from "../../../components/Layout/LayoutFive";
import BreadcrumbOne from "../../../components/Breadcrumb/BreadcrumbOne";
import StepProgressBar from "../../../components/common/StepProgressBar/StepProgressBar";
import { stepCheckout } from "../../../lib/checkout";
// import { useToasts } from "react-toast-notifications";

import {
  // SET_SHIPPING_ADDRESS,
  GET_SHIPPING_ADDRESS,
  GET_ELIGIBLE_SHIPPING_METHODS,
} from "@bavaan/graphql/checkout/checkout-shipping.graphql";
import {
  GET_CUSTOMER_ADDRESSES,
} from "@bavaan/graphql/documents.graphql";
import { formatterConvertCurrency } from "../../../lib/product";
import { updateCartResponse } from "../../../redux/actions/cartActions";
// import CartTotal from "../../../components/checkout/CartTotal";
import { GET_ACTIVE_ORDER_VENDOR } from "@bavaan/graphql/cart/cart-drawer.graphql";
import Guest from "../../../components/OrderWorkFlow/Guest/Guest";


const ShippingStepCheckout = ({ cartItems }) => {
  // const getActiveCustomer = useQuery(GET_ACTIVE_CUSTOMER, {});
  const getActiveCustomerAddress = useQuery(GET_CUSTOMER_ADDRESSES);
  const getActiveOrder = useQuery(GET_ACTIVE_ORDER_VENDOR);
  const getShippingAddress = useQuery(GET_SHIPPING_ADDRESS, {});
  // const [currentCustomer, setCurrentCustomer] = useState(null);
  // const [addShippingReq] = useMutation(SET_SHIPPING_ADDRESS, {});
  // const [customerInput, setCustomerInput] = useState({});
  // const [activeAddress, setActiveAddress] = useState({
  //       fullName: '',
  //       phoneNumber: '',
  //       company: '',
  //       streetLine1: '',
  //       streetLine2: '',
  //       countryCode: 'AF',
  //       city: '',
  //       province: '',
  //       postalCode: '',
  // });
  const getShippingMethod = useQuery(GET_ELIGIBLE_SHIPPING_METHODS, {});
  let formatter = null;
  if (cartItems?.orders?.length > 0) {
    formatter = formatterConvertCurrency(cartItems.orders[0].currencyCode);
  }
  const router = useRouter();
  const redirectToPayment = () => {
    router.push("/other/checkout/payment");
  };
  // const myOnChange = (event) => {
  //   setCustomerInput({...customerInput, [event.target.name]: event.target.value});
  // };
  useEffect(() => {
    // if (getShippingAddress.data && getShippingAddress.data.activeOrderVendors) {
    //   actionActiveAddress(getShippingAddress.data.activeOrderVendors[0]);
    // }
    // if (
    //   getActiveCustomer.data &&
    //   getActiveCustomer.data.activeCustomer &&
    //   getActiveCustomer
    // ) 
    // { 
    //   delete getActiveCustomer.data.activeCustomer.id;
    //   delete getActiveCustomer.data.activeCustomer.__typename;
      // if (getActiveCustomer.data.activeCustomer !== currentCustomer) {
      //   setCurrentCustomer(getActiveCustomer.data.activeCustomer);
      // }
      // if (getActiveCustomer.data.activeCustomer !== customerInput) {
      //   setCustomerInput(getActiveCustomer.data.activeCustomer)
      // }
      
    //}
    if (cartItems && cartItems.orders && cartItems.orders.length > 0) {
      if (cartItems.orders[0].state === 'ArrangingPayment') {
        redirectToPayment()
      }
    }

  }, [
    getShippingAddress,
    getShippingMethod,
    getActiveOrder,
    getActiveCustomerAddress,
  ]);
  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
  });
  // const actionActiveAddress = (data) => {
  //   if (data.shippingAddress && activeAddress !== data.shippingAddress) {
  //     setActiveAddress(data.shippingAddress);
  //     getShippingAddress.refetch();
  //   }
  // };
  // const setAddressForOrder = async (addressParams) => {

  //   const address = { ...addressParams };
  //   address.countryCode = address.countryCode != null ? address.countryCode : address.country.code;
  //   delete address.id;
  //   delete address.country;
  //   delete address.__typename;
  //   try {
  //     const response = await addShippingReq({
  //       variables: {input: address}
  //     })
  //     if (response.data && response.data.setOrderVendorShippingAddress) {
        
  //       if (addToast) {
  //         addToast("Set Shipping Information Success !", {
  //           appearance: "success",
  //           autoDismiss: true,
  //         });
  //       }
  //     }
  //     else {
  //       if (addToast) {
  //         addToast("Please fill all above fields !", {
  //           appearance: "error",
  //           autoDismiss: true,
  //         });
  //       }
  //     }
  //   }
  //   catch(e) {
  //     if (addToast)
  //       addToast(e.message || e, {
  //         appearance: "error",
  //         autoDismiss: true,
  //       });
  //   }
  // };
  return (
    <LayoutFive>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="Checkout"
        backgroundImage="/assets/images/example/about-us/breadcrumb-example.png"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>
          <li>Checkout</li>
        </ul>
      </BreadcrumbOne>
      <div className="checkout-area space-mt--r130 space-mb--r130">
        <Container>
          {cartItems.orders && cartItems.orders.length >= 1 ? (
            <Row>
              <Col>
                <div className="lezada-form">
                  <div className="checkout-form">
                    <div className="row row-40">
                      <div className="col">
                        <Row style={{ position: "relative", top: "-35px" }}>
                          <StepProgressBar
                            steps={stepCheckout()}
                            activeStep={1}
                          />
                        </Row>
                        {/* account */}
                        <Guest
                          />
                        
                        {/* test */}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon space-mb--30">
                    <IoMdCash />
                  </div>
                  <div className="item-empty-area__text">
                    <p className="space-mb--30">
                      No items found in cart to checkout
                    </p>
                    <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                      <a className="lezada-button lezada-button--medium">
                        Shop Now
                      </a>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </LayoutFive>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCartItems: (cart) => {
      dispatch(updateCartResponse(cart));
    }
  };
};
const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShippingStepCheckout);
