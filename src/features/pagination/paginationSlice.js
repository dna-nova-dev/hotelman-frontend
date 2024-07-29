import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Inquilinos: {
    Rentas: 1,
    Hospedados: 1,
  },
  Presencia: {
    Rentas: 1,
    Hospedados: 1,
  },
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPaginationPage: (state, action) => {
      const { page, tab, section } = action.payload;
      state[section][tab] = page;
    },
  },
});

export const { setPaginationPage } = paginationSlice.actions;
export default paginationSlice.reducer;