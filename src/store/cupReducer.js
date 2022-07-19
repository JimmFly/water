import { createSlice } from "@reduxjs/toolkit";

const cupSlice = createSlice({
  name: "cup",
  initialState: Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    isFull: false,
  })),
  reducers: {
    fullCup(state, action) {
      for (let i = 0; i < action.payload; i++) {
        state[i].isFull = true;
      }
    },
    emptyCup(state, action) {
      for (let i = 7; i > action.payload - 2; i--) {
        state[i].isFull = false;
      }
    },
    reset(state, action) {
      for (let i = 0; i < 8; i++) {
        state[i].isFull = false;
      }
    },
  },
});

const { actions, reducer } = cupSlice;
export const { fullCup, emptyCup, reset } = actions;

export default reducer;
