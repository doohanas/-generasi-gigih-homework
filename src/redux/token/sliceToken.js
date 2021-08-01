//the Redux logic for the access token feature
import { createSlice } from "@reduxjs/toolkit";

export const tokenState = createSlice({
  name: "token",
  initialState: {
    currentToken: null,
  },
  reducers: {
    getToken: (state, action) => {
      state.currentToken = action.payload;
    },
  },
});

export const selectToken = (state) => state.token.currentToken;

export const getTokenAction = tokenState.actions;
export default tokenState.reducer;
