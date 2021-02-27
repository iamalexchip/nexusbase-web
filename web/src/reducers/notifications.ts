import INotificationsState, {
  INotificationAction,
  INotificationsActionTypes as types
} from '../types/store/notifications';

export const initialState: INotificationsState = {
  dialogs: []
};
  
export default (
  state = initialState, action: INotificationAction
): INotificationsState => {
  switch (action.type) {
    case types.ADD_DIALOG: {
      let { dialogs } = state;
      dialogs.push(action.payload);

      return { ...state, dialogs };
    }

    // do nothing
    default: {
      return state;
    }
  }
};