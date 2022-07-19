import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const percentSlice = createSlice({
  name: "percent",
  initialState,
  reducers: {
    setPercent(state, action) {
      state.value = action.payload;
    },
    decrementPercent(state, action) {
      state.value = action.payload - 1;
    },
    resetPercent(state, action) {
      state.value = 0;
    },
  },
});

const { actions, reducer } = percentSlice;
export const { setPercent, decrementPercent, resetPercent } = actions;

export default reducer;
