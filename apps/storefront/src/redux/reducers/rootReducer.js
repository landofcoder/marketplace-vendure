import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import compareReducer from "./compareReducer";
import customerReducer from "./customerReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  // productData: productReducer,
  customerData: customerReducer ,
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  compareData: compareReducer,
});

export default rootReducer;
