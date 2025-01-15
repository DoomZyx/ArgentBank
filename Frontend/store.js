import { configureStore } from "@reduxjs/toolkit"; ;
import authReducer from "./src/Store/Features/Login/AuthCheck/AuthSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
