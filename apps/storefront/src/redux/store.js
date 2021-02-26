import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
// import storageSession from 'redux-persist/lib/storage/session'
/* import AsyncStorage from '@react-native-community/async-storage'; */

const persistConfig = {
  key: "primary",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export function initializeStore() {
  return createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
