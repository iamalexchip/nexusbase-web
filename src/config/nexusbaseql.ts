import { INexusBaseConfig } from '../modules/nexusbaseql/types';
import PluginService from '../services/PluginService';
import WorkspaceResolver from '../resolvers/WorkspaceResolver';
import CollectionResolver from '../resolvers/CollectionResolver';
import { storagePath } from './app';

const config: INexusBaseConfig = {
  hooks: new PluginService,
  path: storagePath,
  resolvers: [
    WorkspaceResolver,
    CollectionResolver
  ]
};

export default config;
