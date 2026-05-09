import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isAuthChecked: false,
};

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
    },

    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },

    logout: state => {
      state.token = null;
    },
  },
});

export const {
  setCredentials,
  logout,
  setAuthChecked,
} = authSlice.actions;

export default authSlice.reducer;