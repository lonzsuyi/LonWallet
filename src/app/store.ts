import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import walletReducer from './slices/walletSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    wallet: walletReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
