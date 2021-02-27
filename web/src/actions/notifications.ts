import { Dispatch } from 'redux';
import {
    INotificationsActionTypes as types,
    AddDialog,
} from '../types/store/notifications';
import IRootStore from '../types/store/root';

export const addDialog = (dialog: any) => {
  return (dispatch: Dispatch, getState: () => IRootStore) => {
    const addDialogAction: AddDialog = {
      type: types.ADD_DIALOG,
      payload: dialog
    };

    dispatch(addDialogAction);
  }
}
