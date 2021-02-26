import { updateCartByAPI } from "./cartActions";
import { updateCustomerByAPI } from "./customerAction";

export const solveUpdateDirectData = () => {
  return (dispatch) => {
    dispatch(updateCustomerByAPI());
    dispatch(updateCartByAPI());
  };
};
