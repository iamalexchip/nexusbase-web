import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { workspacesReducer } from './slices/workspaces';

export const store = configureStore({
  reducer: {
    workspaces: workspacesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
