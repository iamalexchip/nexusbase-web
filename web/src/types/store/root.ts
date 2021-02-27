import INotificationsState from './notifications';
import IWorkspacesState from './workspaces';
import ICollectionsState from './collections';
import IRecordsState from './records';
import IViewState from './views';

export default interface IRootStore {
  notifications: INotificationsState;
  workspaces: IWorkspacesState;
  collections: ICollectionsState;
  records: IRecordsState;
  views: IViewState;
}
