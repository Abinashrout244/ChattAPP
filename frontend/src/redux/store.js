import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import chatSlice from "./chatSlice";

const Store = configureStore({
  reducer: {
    user: userSlice,
    chat: chatSlice,
  },
});

export default Store;
