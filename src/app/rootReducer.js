import { combineReducers } from "@reduxjs/toolkit";
import propertiesReducer from "../features/properties/propertiesSlice";
import chatReducer from "../features/chat/chatSlice";

const rootReducer = combineReducers({
  properties: propertiesReducer,
  chat: chatReducer,
});

export default rootReducer;
