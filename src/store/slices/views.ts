import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../index';
import { LoadingState, OnThunkError, SliceState } from '../../interfaces/store';
import { View, ViewsData } from '../../interfaces/store/views';
import { workspaceDb } from '../../db';
import ViewModel from '../../db/models/ViewModel';
import { IupdateView } from '../../interfaces/models';

const initialState: SliceState<LoadingState, ViewsData> = {
  loading: {
    isCreating: false,
    isFecthingOne: false,
    isFetchingList: false,
    isUpdating: false,
    isDeleting: false,
  },
  data: {
    views: null,
    view: null,
    newId: null,
  },
};

export const viewsSlice = createSlice({
  name: 'views',
  initialState,
  reducers: {
    setViews(state, { payload }: PayloadAction<View[]>) {
      state.data.views = payload;
    },
    setView(state, { payload }: PayloadAction<View | null>) {
      state.data.view = payload;
      state.data.newId = null;
    },
    setNewId(state, { payload }: PayloadAction<string | null>) {
      state.data.newId = payload;
    },
    setCreating(state, { payload }: PayloadAction<boolean>) {
      state.loading.isCreating = payload;
    },
    setFecthingOne(state, { payload }: PayloadAction<boolean>) {
      state.loading.isFecthingOne = payload;
    },
    setFetchingList(state, { payload }: PayloadAction<boolean>) {
      state.loading.isFetchingList = payload;
    },
    setUpdating(state, { payload }: PayloadAction<boolean>) {
      state.loading.isUpdating = payload;
    },
    setDeleting(state, { payload }: PayloadAction<boolean>) {
      state.loading.isDeleting = payload;
    },
  },
});

const {
  setViews,
  setCreating,
  setNewId,
  setFetchingList,
  setUpdating,
} = viewsSlice.actions;
export const { reducer: viewsReducer } = viewsSlice;

export const createView = (
  collectionId: string,
  onError: OnThunkError
): AppThunk => async (dispatch) => {
  dispatch(setCreating(true));

  try {
    const db = workspaceDb();
    const viewModel = new ViewModel(db);
    const { id } = viewModel.create({ collectionId });
    dispatch(setNewId(id));
  } catch (err) {
    onError(err);
  } finally {
    dispatch(setCreating(false));
  }
};

export const getViews = (
  collectionId: string,
  onError: OnThunkError
): AppThunk => async (dispatch) => {
  dispatch(setFetchingList(true));

  try {
    const db = workspaceDb();
    const viewModel = new ViewModel(db);
    const views = viewModel.get(collectionId);
    dispatch(setViews(views));
  } catch (err) {
    onError(err);
  } finally {
    dispatch(setFetchingList(false));
  }
};

export const updateViewDetails = (
  id: string,
  data: IupdateView,
  onError: OnThunkError
): AppThunk => async (dispatch) => {
  dispatch(setUpdating(true));

  try {
    const db = workspaceDb();
    const viewModel = new ViewModel(db);
    viewModel.update(id, data);
  } catch (err) {
    onError(err);
  } finally {
    dispatch(setUpdating(false));
  }
};

/*
export const getView = (id: string, onError: OnThunkError): AppThunk => async (
  dispatch
) => {
  dispatch(setFecthingOne(true));

  try {
    const db = workspaceDb();
    const viewModel = new ViewModel(db);
    const view = viewModel.find(id);
    dispatch(setView(view));
  } catch (err) {
    onError(err);
  } finally {
    dispatch(setFecthingOne(false));
  }
};


export const deleteView = (
  id: string,
  onError: OnThunkError
): AppThunk => async (dispatch) => {
  dispatch(setUpdating(true));

  try {
    const db = workspaceDb();
    const viewModel = new ViewModel(db);
    viewModel.delete(id);
    dispatch(setView(null));
  } catch (err) {
    onError(err);
  } finally {
    dispatch(setUpdating(false));
  }
};
*/
