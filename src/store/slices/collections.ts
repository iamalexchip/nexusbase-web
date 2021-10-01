import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../index';
import { LoadingState, OnThunkError, SliceState } from '../../interfaces/store';
import {
  Collection,
  CollectionsData,
} from '../../interfaces/store/collections';
import { workspaceDb } from '../../db';
import CollectionModel from '../../db/models/CollectionModel';
import { IupdateCollectionDetails } from '../../interfaces/models';

const initialState: SliceState<LoadingState, CollectionsData> = {
  loading: {
    isCreating: false,
    isFecthingOne: false,
    isFetchingList: false,
    isUpdating: false,
    isDeleting: false,
  },
  data: {
    collections: null,
    collection: null,
    newId: null,
  },
};

export const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    setCollections(state, { payload }: PayloadAction<Collection[]>) {
      state.data.collections = payload;
    },
    setCollection(state, { payload }: PayloadAction<Collection | null>) {
      state.data.collection = payload;
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
  setCollections,
  setCollection,
  setCreating,
  setNewId,
  setFecthingOne,
  setFetchingList,
  setUpdating,
} = collectionsSlice.actions;
export const { reducer: collectionsReducer } = collectionsSlice;

export const createCollection = (onError: OnThunkError): AppThunk => async (
  dispatch
) => {
  dispatch(setCreating(true));

  try {
    const db = workspaceDb();
    const collectionModel = new CollectionModel(db);
    const { id } = collectionModel.create();
    dispatch(setNewId(id));
  } catch (err) {
    onError(err);
  } finally {
    dispatch(setCreating(false));
  }
};

export const getCollections = (onError: OnThunkError): AppThunk => async (
  dispatch
) => {
  dispatch(setFetchingList(true));

  try {
    const db = workspaceDb();
    const collectionModel = new CollectionModel(db);
    const collections = collectionModel.get();
    dispatch(setCollections(collections));
  } catch (err) {
    onError(err);
  } finally {
    dispatch(setFetchingList(false));
  }
};

export const getCollection = (
  id: string,
  onError: OnThunkError
): AppThunk => async (dispatch) => {
  dispatch(setFecthingOne(true));

  try {
    const db = workspaceDb();
    const collectionModel = new CollectionModel(db);
    const collection = collectionModel.find(id);
    dispatch(setCollection(collection));
  } catch (err) {
    onError(err);
  } finally {
    dispatch(setFecthingOne(false));
  }
};

export const updateCollectionDetails = (
  id: string,
  data: IupdateCollectionDetails,
  onError: OnThunkError
): AppThunk => async (dispatch) => {
  dispatch(setUpdating(true));

  try {
    const db = workspaceDb();
    const collectionModel = new CollectionModel(db);
    const collection = collectionModel.updateDetails(id, data);
    dispatch(setCollection(collection));
  } catch (err) {
    onError(err);
  } finally {
    dispatch(setUpdating(false));
  }
};

export const deleteCollection = (
  id: string,
  onError: OnThunkError
): AppThunk => async (dispatch) => {
  dispatch(setUpdating(true));

  try {
    const db = workspaceDb();
    const collectionModel = new CollectionModel(db);
    collectionModel.delete(id);
    dispatch(setCollection(null));
  } catch (err) {
    onError(err);
  } finally {
    dispatch(setUpdating(false));
  }
};
