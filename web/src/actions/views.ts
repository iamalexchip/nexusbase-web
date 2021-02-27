import { Dispatch } from 'redux';
import {
  IViewActionTypes as types,
  CreateViewStart,
  CreateViewSuccess,
  GetViewsStart,
  GetViewsSuccess,
  GetViewStart,
  GetViewSuccess,
  ClearViews,
  ClearView,
  UpdateViewStart,
  UpdateViewSuccess,
} from '../types/store/views';
import IRootStore from '../types/store/root';
import { IViewModel } from '../types/database';

const { ipcRenderer } = window.require("electron");

export const createView = (view: {
  name: string,
  workspaceId: string
}) => {
  return (dispatch: Dispatch, getState: () => IRootStore) => {
    const createViewStart: CreateViewStart = {
      type: types.CREATE_VIEW_START
    };

    dispatch(createViewStart);
    
    const response = ipcRenderer.sendSync('nbql', {
      view: {
        action: 'createView',
        args: view
      }
    });
    
    if (response?.errors?.view) {
      console.log({ viewError: response.errors.view });
      return;
    }

    const createViewSuccess: CreateViewSuccess = {
      type: types.CREATE_VIEW_SUCCESS,
      payload: {
        view: response.data.view
      }
    };
    
    dispatch(createViewSuccess);
  }
}

export const getViews = (collectionId: string) => {
  return (dispatch: Dispatch, getState: () => IRootStore) => {
    const getViewsStart: GetViewsStart = {
      type: types.GET_VIEWS_START
    };
    
    dispatch(getViewsStart);

    const response = ipcRenderer.sendSync('nbql', {
      views: {
        action: 'getViews',
        args: {
          collectionId
        }
      }
    });
    const getViewsSuccess: GetViewsSuccess = {
      type: types.GET_VIEWS_SUCCESS,
      payload: {
        views: response.data.views 
      }
    };
    
    dispatch(getViewsSuccess);
  }
}

export const getView = (id: string) => {
  return (dispatch: Dispatch, getState: () => IRootStore) => {
    const getViewStart: GetViewStart = {
      type: types.GET_VIEW_START
    };
    
    dispatch(getViewStart);
    
    const response = ipcRenderer.sendSync('nbql', {
      view: {
        action: 'getView',
        args: { id }
      }
    });
    
    if (response?.errors?.view) {
      console.log({ viewError: response.errors.view });
      return;
    }

    const getViewSuccess: GetViewSuccess = {
      type: types.GET_VIEW_SUCCESS,
      payload: {
        view: response.data.view
      }
    };
    
    dispatch(getViewSuccess);
  }
}

export const updateView = (view: IViewModel) => {
  return (dispatch: Dispatch, getState: () => IRootStore) => {
    const updateViewStart: UpdateViewStart = {
      type: types.UPDATE_VIEW_START
    };

    dispatch(updateViewStart);
    
    const response = ipcRenderer.sendSync('nbql', {
      view: {
        action: 'updateView',
        args: view
      }
    });
    
    if (response?.errors?.view) {
      console.log({ viewError: response.errors.view });
      return;
    }

    const updateViewSuccess: UpdateViewSuccess = {
      type: types.UPDATE_VIEW_SUCCESS,
      payload: {
        view: response.data.view
      }
    };
    
    dispatch(updateViewSuccess);
  }
}

export const clearViews = () => {
  return (dispatch: Dispatch) => {
    const actionClearViews: ClearViews = {
      type: types.CLEAR_VIEWS,
    };
    
    dispatch(actionClearViews);
  }
}

export const clearView = () => {
  return (dispatch: Dispatch) => {
    const actionClearView: ClearView = {
      type: types.CLEAR_VIEW,
    };
    
    dispatch(actionClearView);
  }
}
