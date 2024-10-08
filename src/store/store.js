import { configureStore } from '@reduxjs/toolkit';
import tabReducer from '../features/tab/tabSlice';
import { reducer as formReducer } from 'redux-form'
import floatingbuttonsReducer from '../features/floatingbuttons/floatingButtonsSlice';
import paginationReducer from '../features/pagination/paginationSlice';

const store = configureStore({
  reducer: {
    tab: tabReducer,
    form: formReducer, // Agrega el nuevo slice de archivos al reducer
    floatingbuttons: floatingbuttonsReducer,
    pagination: paginationReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorar ciertos valores no serializables
        ignoredActions: ['@@redux-form/CHANGE'],
        ignoredPaths: ['form.*'],
      },
    }),
});

export default store;