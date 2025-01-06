import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./src/features/auth/authslice";
import userReducer from "./src/features/user/userSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
