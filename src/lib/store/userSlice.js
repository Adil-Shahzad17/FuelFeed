import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userData: (state, action) => {
      state.userData = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
    },
  },
});

export const { userData, clearUserData } = UserSlice.actions;

export default UserSlice.reducer;
