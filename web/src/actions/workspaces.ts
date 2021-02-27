import { Dispatch } from 'redux';
import {
  IWorkspaceActionTypes as types,
  CreateWorkspaceStart,
  CreateWorkspaceSuccess,
  GetWorkspacesStart,
  GetWorkspacesSuccess,
  GetWorkspaceStart,
  GetWorkspaceSuccess,
  IClearWorkspaces,
  IClearWorkspace,
} from '../types/store/workspaces';
import RootStore from '../types/store/root';

const { ipcRenderer } = window.require("electron");

export const createWorkspace = (workspace: {
  name: string
}) => {
  return (dispatch: Dispatch, getState: RootStore) => {
    const createWorkspaceStart: CreateWorkspaceStart = {
      type: types.CREATE_WORKSPACE_START
    };
    
    dispatch(createWorkspaceStart);

    const response = ipcRenderer.sendSync('nbql', {
      workspace: {
        action: 'createWorkspace',
        args: workspace
      }
    });
    
    if (response?.errors?.workspace) {
      console.log({ createWorkspaceError: response.errors.workspace });
      return;
    }

    const createWorkspaceSuccess: CreateWorkspaceSuccess = {
      type: types.CREATE_WORKSPACE_SUCCESS,
      payload: {
        workspace: response.data.workspace
      }
    };
    
    dispatch(createWorkspaceSuccess);
  }
}

export const getWorkspaces = () => {
  return (dispatch: Dispatch, getState: RootStore) => {
    const getWorkspacesStart: GetWorkspacesStart = {
      type: types.GET_WORKSPACES_START
    };
    
    dispatch(getWorkspacesStart);
    
    const response = ipcRenderer.sendSync('nbql', {
      workspaces: {
        action: 'getWorkspaces'
      },
      logger: {
        action: 'pluginAction',
        args: {
          plugin: 'logger',
          payload: 'testo'
        }
      }
    });
    const getWorkspacesSuccess: GetWorkspacesSuccess = {
      type: types.GET_WORKSPACES_SUCCESS,
      payload: {
        workspaces: response.data.workspaces
      }
    };
    
    dispatch(getWorkspacesSuccess);
  }
}

export const getWorkspace = (id: string) => {
  return (dispatch: Dispatch, getState: RootStore) => {
    const getWorkspaceStart: GetWorkspaceStart = {
      type: types.GET_WORKSPACE_START
    };
    
    dispatch(getWorkspaceStart);
    
    const response = ipcRenderer.sendSync('nbql', {
      workspace: {
        action: 'getWorkspace',
        args: { id }
      }
    });
    const getWorkspaceSuccess: GetWorkspaceSuccess = {
      type: types.GET_WORKSPACE_SUCCESS,
      payload: {
        workspace: response.data.workspace
      }
    };
    
    dispatch(getWorkspaceSuccess);
  }
}

export const clearWorkspaces = () => {
  return (dispatch: Dispatch) => {
    const actionClearWorkspaces: IClearWorkspaces = {
      type: types.CLEAR_WORKSPACES,
    };
    
    dispatch(actionClearWorkspaces);
  }
}

export const clearWorkspace = () => {
  return (dispatch: Dispatch) => {
    const actionClearWorkspace: IClearWorkspace = {
      type: types.CLEAR_WORKSPACE,
    };
    
    dispatch(actionClearWorkspace);
  }
}
