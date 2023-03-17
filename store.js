import { configureStore } from '@reduxjs/toolkit';
import authSlice from './redux/authSlice';
const store = configureStore({
  reducer: {
    user: authSlice,
  },
});
export default store;
