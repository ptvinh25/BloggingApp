import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) =>
      action.payload
        ? {
            ...action.payload,
          }
        : {},
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
