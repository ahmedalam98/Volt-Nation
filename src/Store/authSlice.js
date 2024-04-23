import { createSlice } from "@reduxjs/toolkit";

/* This is a dummy slice to demonstrate how to use local storage with redux toolkit.*/
const authSlice = createSlice({
  name: "auth",
  initialState: false,
  reducers: {
    togglelogged(state) {
      localStorage.setItem("in", !state);
      return !state;
    },
    setState(state, action) {
      state = action.payload;
      return state;
    },
  },
});
export const { togglelogged, setState } = authSlice.actions;

export default authSlice.reducer;
