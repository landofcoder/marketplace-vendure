import { UPDATE_CART_ITEM, DELETE_ALL_FROM_CART, ASSIGN_PREV_STEP } from "../actions/cartActions";
import { gql } from "apollo-boost";

const initState = { orders: [], lines: [], count: 0, totalCartPrice: 0, prevStep: '/'};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_CART_ITEM:
      const stateCloned = { ...state, ...{orders: action.payload}};
      const orders = stateCloned.orders;
      
      console.log("Payload", action.payload)
      console.log("ORDERS", orders)
      let totalAddedToCart = 0;
      let totalCartPrice = 0;
      if (orders != undefined && orders.length > 0) {
        orders.map(order => {
          totalCartPrice += order.total;
          order.lines.map(line => {
            totalAddedToCart += line.quantity;
          })
        })
        
      }
      
      return { ...state, orders: orders, count: totalAddedToCart, totalCartPrice: totalCartPrice };
    case DELETE_ALL_FROM_CART:
      return initState;
    case ASSIGN_PREV_STEP:
      return {...state, prevStep: action.payload }
  }
  return state;
};

export default cartReducer;
