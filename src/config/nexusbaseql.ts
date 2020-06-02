import { INexusBaseConfig } from '../modules/nexusbaseql/types';
import PluginService from '../services/PluginService';
import WorkspaceResolver from '../resolvers/WorkspaceResolver';
import CollectionResolver from '../resolvers/CollectionResolver';
import { storagePath } from './app';

const pluginService = new PluginService;  
const pluginHooks = {
  resolve: (data: any) => pluginService.hook(data)
}

const config: INexusBaseConfig = {
  hookResolver: pluginHooks,
  path: storagePath,
  resolvers: [
    WorkspaceResolver,
    CollectionResolver
  ]
};

export default config;
