import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  token: '',
  isAuthenticated: false,
};
const authSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    authenticatedUser: (state, { payload }) => {
      AsyncStorage.setItem('token', payload);
      state.token = payload;
      state.isAuthenticated = !!state.token;
    },
    logout: (state) => {
      AsyncStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});
export const { authenticatedUser, logout } = authSlice.actions;
export default authSlice.reducer;
