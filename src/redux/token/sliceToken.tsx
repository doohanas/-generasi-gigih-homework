// import React from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export const tokenState = createSlice({
  name: "token",
  initialState: {
    currentToken: null,
  },
  reducers: {
    getToken: (state, action: PayloadAction<null>) => {
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
