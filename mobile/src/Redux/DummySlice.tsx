import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface DummyState {
  value: number;
}

const initialState: DummyState = {
  value: 0,
};

export const DummySlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    incrementByValue: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const {increment, incrementByValue} = DummySlice.actions;
export default DummySlice.reducer;
