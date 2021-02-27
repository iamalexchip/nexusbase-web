import { IViewModel } from '../database';

export default interface IViewsState {
  isFetchingOne: boolean,
  isFetchingList: boolean,
  isCreating: boolean,
  isUpdating: boolean,
  views: IViewModel[],
  view: null | IViewModel,
}

export enum IViewActionTypes {
  CREATE_VIEW_START = 'CREATE_VIEW_START',
  CREATE_VIEW_SUCCESS = 'CREATE_VIEW_SUCCESS',
  GET_VIEWS_START = 'GET_VIEWS_START',
  GET_VIEWS_SUCCESS = 'GET_VIEWS_SUCCESS',
  GET_VIEW_START = 'GET_VIEW_START',
  GET_VIEW_SUCCESS = 'GET_VIEW_SUCCESS',
  UPDATE_VIEW_START = 'UPDATE_VIEW_START',
  UPDATE_VIEW_SUCCESS = 'UPDATE_VIEW_SUCCESS',
  CLEAR_VIEWS = 'CLEAR_VIEWS',
  CLEAR_VIEW = 'CLEAR_VIEW',
}

export interface CreateViewStart {
  type: IViewActionTypes.CREATE_VIEW_START;
}

export interface CreateViewSuccess {
  type: IViewActionTypes.CREATE_VIEW_SUCCESS;
  payload: {
    view: IViewModel;
  }
}

export interface GetViewsStart {
  type: IViewActionTypes.GET_VIEWS_START
}

export interface GetViewsSuccess {
  type: IViewActionTypes.GET_VIEWS_SUCCESS;
  payload: {
    views: IViewModel[];
  }
}

export interface GetViewStart {
  type: IViewActionTypes.GET_VIEW_START
}

export interface GetViewSuccess {
  type: IViewActionTypes.GET_VIEW_SUCCESS;
  payload: {
    view: IViewModel;
  }
}

export interface UpdateViewStart {
  type: IViewActionTypes.UPDATE_VIEW_START
}

export interface UpdateViewSuccess {
  type: IViewActionTypes.UPDATE_VIEW_SUCCESS;
  payload: {
    view: IViewModel;
  }
}

export interface ClearViews {
  type: IViewActionTypes.CLEAR_VIEWS;
}

export interface ClearView {
  type: IViewActionTypes.CLEAR_VIEW;
}

export type IViewsAction =
  | CreateViewStart
  | CreateViewSuccess
  | GetViewsStart
  | GetViewsSuccess
  | GetViewStart
  | GetViewSuccess
  | UpdateViewStart
  | UpdateViewSuccess
  | ClearViews
  | ClearView;
