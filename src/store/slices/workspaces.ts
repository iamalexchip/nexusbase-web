import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../index';
import { OnThunkError, SliceState } from '../../interfaces/store';
import { Workspace, WorkspacesState } from '../../interfaces/store/workspaces';
import { appDb, workspaceDb } from '../../db';
import { apiUrl } from '../../utils/misc';

const initialState: SliceState<WorkspacesState> = {
  loading: false,
  data: {
    workspaces: null,
    workspace: null,
  },
};

export const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload;
    },
    setWorkspaces(state, { payload }: PayloadAction<Workspace[]>) {
      state.data.workspaces = payload;
    },
    setWorkspace(state, { payload }: PayloadAction<Workspace>) {
      state.data.workspace = payload;
    },
  },
});

const { setLoading, setWorkspaces, setWorkspace } = workspacesSlice.actions;
export const { reducer: workspacesReducer } = workspacesSlice;

export const getWorkspaces = (onError: OnThunkError): AppThunk => async (
  dispatch
) => {
  dispatch(setLoading(true));

  try {
    const db = appDb();
    const workspaces = db.get('workspaces').value();
    dispatch(setWorkspaces(workspaces));
  } catch (err) {
    onError(err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getWorkspace = (onError: OnThunkError): AppThunk => async (
  dispatch
) => {
  dispatch(setLoading(true));

  try {
    const db = workspaceDb(apiUrl());
    const workspace = db.get('workspace').value();
    dispatch(setWorkspace(workspace));
  } catch (err) {
    onError(err);
  } finally {
    dispatch(setLoading(false));
  }
};
