import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../redux/token/sliceToken";

export default configureStore({
  reducer: {
    token: tokenReducer,
  },
});
