import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    draftLogin: (state, action) => {
      state.userData = action.payload;
    },
    login: (state, action) => {
      (state.status = true), (state.userData = action.payload);
    },
    logout: (state) => {
      (state.status = false), (state.userData = null);
    },
  },
});

export const { draftLogin, login, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
