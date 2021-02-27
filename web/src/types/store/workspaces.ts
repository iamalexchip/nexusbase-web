import { IWorkspaceModel } from '../database';

export default interface IWorkspacesState {
  isFetchingOne: boolean,
  isFetchingList: boolean,
  isCreating: boolean,
  workspaces: IWorkspaceModel[],
  workspace: null | IWorkspaceModel,
}

export enum IWorkspaceActionTypes {
  CREATE_WORKSPACE_START = 'CREATE_WORKSPACE_START',
  CREATE_WORKSPACE_SUCCESS = 'CREATE_WORKSPACE_SUCCESS',
  GET_WORKSPACES_START = 'GET_WORKSPACES_START',
  GET_WORKSPACES_SUCCESS = 'GET_WORKSPACES_SUCCESS',
  GET_WORKSPACE_START = 'GET_WORKSPACE_START',
  GET_WORKSPACE_SUCCESS = 'GET_WORKSPACE_SUCCESS',
  CLEAR_WORKSPACES = 'CLEAR_WORKSPACES',
  CLEAR_WORKSPACE = 'CLEAR_WORKSPACE',
}

export interface CreateWorkspaceStart {
  type: IWorkspaceActionTypes.CREATE_WORKSPACE_START;
}

export interface CreateWorkspaceSuccess {
  type: IWorkspaceActionTypes.CREATE_WORKSPACE_SUCCESS;
  payload: {
    workspace: IWorkspaceModel;
  }
}

export interface GetWorkspacesStart {
  type: IWorkspaceActionTypes.GET_WORKSPACES_START
}

export interface GetWorkspacesSuccess {
  type: IWorkspaceActionTypes.GET_WORKSPACES_SUCCESS;
  payload: {
    workspaces: IWorkspaceModel[];
  }
}

export interface GetWorkspaceStart {
  type: IWorkspaceActionTypes.GET_WORKSPACE_START
}

export interface GetWorkspaceSuccess {
  type: IWorkspaceActionTypes.GET_WORKSPACE_SUCCESS;
  payload: {
    workspace: IWorkspaceModel;
  }
}

export interface IClearWorkspaces {
  type: IWorkspaceActionTypes.CLEAR_WORKSPACES;
}

export interface IClearWorkspace {
  type: IWorkspaceActionTypes.CLEAR_WORKSPACE;
}

export type IWorkspacesAction =
  | CreateWorkspaceStart
  | CreateWorkspaceSuccess
  | GetWorkspacesStart
  | GetWorkspacesSuccess
  | GetWorkspaceStart
  | GetWorkspaceSuccess
  | IClearWorkspaces
  | IClearWorkspace;
