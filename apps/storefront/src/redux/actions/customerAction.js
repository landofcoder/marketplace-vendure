export const UPDATE_ACTIVE_CUSTOMER = "UPDATE_ACTIVE_CUSTOMER";
export const DELETE_CART_CUSTOMER = "DELETE_CART_CUSTOMER";

import { SIGN_OUT } from "@bavaan/graphql/customer/account.graphql";
import { GET_ACTIVE_CUSTOMER } from "@bavaan/graphql/documents.graphql";
import { client } from "../../config/graphql";

export const updateCustomerByAPI = (router) => {
  return async (dispatch) => {
    try {
      const updateActiveCustomer = await client.query({
        query: GET_ACTIVE_CUSTOMER,
        fetchPolicy: "network-only",
      });
      const customer = updateActiveCustomer.data.activeCustomer;
      
      if (customer != null) {
        dispatch({
          type: UPDATE_ACTIVE_CUSTOMER,
          payload: updateActiveCustomer.data.activeCustomer,
        });
      } else {
        dispatch({
          type: DELETE_CART_CUSTOMER,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};
export const logOutCustomer = (router) => {
  return async (dispatch) => {
    try {
      const updateActiveCustomer = await client.mutate({
        mutation: SIGN_OUT,
      });
      const customer = updateActiveCustomer.data.logout;
      dispatch({
        type: DELETE_CART_CUSTOMER,
      });
      router.push("/customer/login");
    } catch (e) {
      console.log(e);
    }
  };
};
