import { combineReducers } from 'redux';
import notifications from '../reducers/notifications';
import workspaces from '../reducers/workspaces';
import collections from '../reducers/collections';
import views from '../reducers/views';
import records from '../reducers/records';

export default combineReducers({
  notifications,
  workspaces,
  collections,
  views,
  records,
});
