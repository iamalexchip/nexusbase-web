import IWorkspacesState, {
  IWorkspacesAction,
  IWorkspaceActionTypes as types
} from '../types/store/workspaces';

export const initialState: IWorkspacesState = {
  isFetchingOne: false,
  isFetchingList: false,
  isCreating: false,
  workspaces: [],
  workspace: null,
};
  
export default (
  state = initialState, action: IWorkspacesAction
): IWorkspacesState => {
  switch (action.type) {
    case types.CREATE_WORKSPACE_START: {
      return {
        ...state,
        isCreating: true
      };
    }
    case types.CREATE_WORKSPACE_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isCreating: false
      };
    }

    case types.GET_WORKSPACES_START: {
      return {
        ...state,
        isFetchingList: true
      };
    }
    case types.GET_WORKSPACES_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isFetchingList: false
      };
    }

    case types.GET_WORKSPACE_START: {
      return {
        ...state,
        isFetchingOne: true
      };
    }
    case types.GET_WORKSPACE_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isFetchingOne: false
      };
    }

    case types.CLEAR_WORKSPACES: {
      return {
        ...state,
        workspaces: []
      };
    }

    case types.CLEAR_WORKSPACE: {
      return {
        ...state,
        workspace: null
      };
    }

    // do nothing
    default: {
      return state;
    }
  }
};