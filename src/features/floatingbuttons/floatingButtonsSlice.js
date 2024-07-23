import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lastClickedButton: null,
};

const floatingButtonsSlice = createSlice({
  name: 'floatingButtons',
  initialState,
  reducers: {
    setLastClickedButton: (state, action) => {
      state.lastClickedButton = action.payload;
    },
  },
});

export const { setLastClickedButton } = floatingButtonsSlice.actions;
export default floatingButtonsSlice.reducer;