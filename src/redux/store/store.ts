import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../slices/authSlice';
import { authApi } from '../api/authApi';
import { appApis } from '../api/appApis';
import cartReducer from '../slices/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,

    [authApi.reducerPath]: authApi.reducer,
    [appApis.reducerPath]: appApis.reducer
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware, appApis.middleware),
});