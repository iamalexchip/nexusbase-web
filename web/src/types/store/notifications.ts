
export interface IDialogAction {
  text: any;
  type: 'close' | 'function' | 'link' | 'plugin';
  icons?: string;
  variant?: any;
}

export interface IDialog {
  content: any;
  actions?: IDialogAction[];
}

export default interface INotificationsState {
  dialogs: IDialog[];
}

export enum INotificationsActionTypes {
  ADD_DIALOG = 'ADD_DIALOG',
  CLOSE_DIALOG = 'CLOSE_DIALOG',
}

export interface AddDialog {
  type: INotificationsActionTypes.ADD_DIALOG;
  payload: IDialog;
}

export interface CloseDialog {
  type: INotificationsActionTypes.CLOSE_DIALOG;
}

export type INotificationAction =
  | AddDialog
  | CloseDialog;
