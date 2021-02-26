import {
  UPDATE_ACTIVE_CUSTOMER,
  DELETE_CART_CUSTOMER,
} from "../actions/customerAction";

const initState = { customer: undefined };

const customerReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_ACTIVE_CUSTOMER:
      return {
        ...state,
        ...{ customer: action.payload },
      };
    case DELETE_CART_CUSTOMER:
      return initState;
    default:
      break;
  }
  return state;
};
export default customerReducer;
