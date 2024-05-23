import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "../Redux-services/reducers/authReducer";
import { combineReducers } from "@reduxjs/toolkit";
const rootReducer = combineReducers({
  auth: authReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
