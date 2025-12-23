import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedRedcuer from "./feedSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedRedcuer,
  },
});

export default appStore;
