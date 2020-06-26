import PluginResolver from './resolvers/PluginResolver';
import WorkspaceResolver from './resolvers/WorkspaceResolver';
import CollectionResolver from './resolvers/CollectionResolver';
import RecordResolver from './resolvers/RecordResolver';
import ViewResolver from './resolvers/ViewResolver';

export const resolvers = [
  PluginResolver,
  WorkspaceResolver,
  CollectionResolver,
  ViewResolver,
  RecordResolver
];
