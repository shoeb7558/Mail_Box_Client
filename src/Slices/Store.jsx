// store.js
import { configureStore } from '@reduxjs/toolkit';
import authslice from './LoginSlice'

const store = configureStore({
  reducer: {
    auth: authslice,
  },
});


export default store
