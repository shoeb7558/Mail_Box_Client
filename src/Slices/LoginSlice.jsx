import { createSlice } from '@reduxjs/toolkit';

const storedToken = localStorage.getItem('token');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!storedToken, // Set to true if the token exists in local storage
    token: storedToken || null, // Get token from local storage
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.email = action.payload.email;
      localStorage.setItem('token', action.payload.token); 
      localStorage.setItem('email', action.payload.email);// Save token to local storage
    },
    
  },
});

export const { login} = authSlice.actions;
export default authSlice.reducer;
