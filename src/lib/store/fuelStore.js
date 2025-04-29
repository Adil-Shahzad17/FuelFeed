import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./authSlice";
import UserSlice from "./userSlice";

const FuelStore = configureStore({
  reducer: {
    auth: AuthSlice,
    user: UserSlice,
  },
});

export default FuelStore;
