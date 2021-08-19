import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";

export const tokenState = createSlice({
  name: "token",
  initialState: {
    currentToken: null,
  },
  reducers: {
    getToken: (state, action) => {
      state.currentToken = action.payload;
    },
    emptyToken: (state) => {
      state.currentToken = null;
    },
  },
});

export const selectToken = (state: RootState): null => state.token.currentToken;

export const getTokenAction = tokenState.actions;
export default tokenState.reducer;
