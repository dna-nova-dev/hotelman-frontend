// src/features/tab/tabSlice.js
import { createSlice } from '@reduxjs/toolkit';

const tabSlice = createSlice({
  name: 'tab',
  initialState: 'Hospedados', // Tab inicial
  reducers: {
    setActiveTab: (state, action) => action.payload,
  },
});

export const { setActiveTab } = tabSlice.actions;

export default tabSlice.reducer;