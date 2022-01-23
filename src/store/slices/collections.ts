import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../index';
import { LoadingState, OnThunkError, SliceState } from '../../interfaces/store';
import {
  Property,
  Collection,
  CollectionsData,
} from '../../interfaces/store/collections';
import { workspaceDb } from '../../db';
import CollectionModel from '../../db/models/CollectionModel';
import { IupdateCollectionDetails } from '../../interfaces/models';
import { setSynced as setViewsSynced } from './views';

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
    isSynced: true,
    editProperty: null,
  },
};

export const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    setCollections(state, { payload }: PayloadAction<Collection[]>) {
      state.data.collections = payload;
      state.data.isSynced = true;
    },
    setCollection(state, { payload }: PayloadAction<Collection | null>) {
      state.data.collection = payload;
      state.data.newId = null;
      state.data.isSynced = true;
    },
    setNewId(state, { payload }: PayloadAction<string | null>) {
      state.data.newId = payload;
    },
    setSynced(state, { payload }: PayloadAction<boolean>) {
      state.data.isSynced = payload;
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
    setEditProperty(
      state,
      { payload }: PayloadAction<{ colId: string; propId: string } | null>
    ) {
      state.data.editProperty = payload;
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
  setSynced,
  setFecthingOne,
  setFetchingList,
  setEditProperty,
  setUpdating,
} = collectionsSlice.actions;
export { setEditProperty };
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

export const addPropertyToCollection = (
  id: string,
  onError: OnThunkError
): AppThunk => async (dispatch) => {
  dispatch(setUpdating(true));

  try {
    const db = workspaceDb();
    const collectionModel = new CollectionModel(db);
    collectionModel.addProperty(id);
    dispatch(setSynced(false));
    dispatch(setViewsSynced(false));
  } catch (err) {
    onError(err);
  } finally {
    dispatch(setUpdating(false));
  }
};

export const updateCollectionProperty = (
  collectionId: string,
  propertyId: string,
  data: Property,
  onError: OnThunkError
): AppThunk => async (dispatch) => {
  dispatch(setUpdating(true));

  try {
    const db = workspaceDb();
    const collectionModel = new CollectionModel(db);
    collectionModel.updateProperty(collectionId, propertyId, data);
    dispatch(setEditProperty(null));
    dispatch(setSynced(false));
    dispatch(setViewsSynced(false));
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
