import { configureStore } from '@reduxjs/toolkit';
import tabReducer from '../features/tab/tabSlice';
import { reducer as formReducer } from 'redux-form'

const store = configureStore({
  reducer: {
    tab: tabReducer,
    form: formReducer, // Agrega el nuevo slice de archivos al reducer
  },
});

export default store;