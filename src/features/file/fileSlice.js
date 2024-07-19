// fileSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contrato: null,
  ine: null,
};

const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setContrato(state, action) {
      state.contrato = {
        name: action.payload.name,
        size: action.payload.size,
        type: action.payload.type,
        // Agrega más campos relevantes según sea necesario
      };
    },
    setINE(state, action) {
      state.ine = {
        name: action.payload.name,
        size: action.payload.size,
        type: action.payload.type,
        // Agrega más campos relevantes según sea necesario
      };
    },
    clearFiles(state) {
      state.contrato = null;
      state.ine = null;
    },
  },
});

export const { setContrato, setINE, clearFiles } = fileSlice.actions;
export default fileSlice.reducer;