import { configureStore } from "@reduxjs/toolkit";
import cupReducer from "./cupReducer";
import percentReducer from "./percentReducer";

const store = configureStore({
  reducer: {
    cup: cupReducer,
    capacity: percentReducer,
  },
});

export default store;
