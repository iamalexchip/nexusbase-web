import { IConfig } from '../modules/nexusbaseql/types';
import PluginService from '../services/PluginService';
import { storagePath } from './app';

const pluginService = new PluginService;  
const pluginHooks = {
  resolve: (data: any) => pluginService.hook(data)
}

const config: IConfig = {
  path: storagePath,
  hookResolver: pluginHooks,
};

export default config;
