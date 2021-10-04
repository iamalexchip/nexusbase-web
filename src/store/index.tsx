import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { collectionsReducer } from './slices/collections';
import { workspacesReducer } from './slices/workspaces';
import { viewsReducer } from './slices/views';

export const store = configureStore({
  reducer: {
    workspaces: workspacesReducer,
    collections: collectionsReducer,
    views: viewsReducer,
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
