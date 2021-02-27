import IViewsState, {
  IViewsAction,
  IViewActionTypes as types
} from '../types/store/views';

export const initialState: IViewsState = {
  isFetchingOne: false,
  isFetchingList: false,
  isCreating: false,
  isUpdating: false,
  views: [],
  view: null,
};
  
export default (
  state = initialState, action: IViewsAction
): IViewsState => {
  switch (action.type) {
    case types.CREATE_VIEW_START: {
      return {
        ...state,
        isCreating: true
      };
    }
    case types.CREATE_VIEW_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isCreating: false
      };
    }

    case types.GET_VIEWS_START: {
      return {
        ...state,
        isFetchingList: true
      };
    }
    case types.GET_VIEWS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isFetchingList: false,
      };
    }

    case types.GET_VIEW_START: {
      return {
        ...state,
        isFetchingOne: true
      };
    }
    case types.GET_VIEW_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isFetchingOne: false
      };
    }

    case types.UPDATE_VIEW_START: {
      return {
        ...state,
        isUpdating: true
      };
    }
    case types.UPDATE_VIEW_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isUpdating: false
      };
    }

    case types.CLEAR_VIEWS: {
      return {
        ...state,
        views: []
      };
    }

    case types.CLEAR_VIEW: {
      return {
        ...state,
        view: null
      };
    }

    // do nothing
    default: {
      return state;
    }
  }
};