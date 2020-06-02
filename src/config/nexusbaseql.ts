import { IConfig } from '../modules/nexusbaseql/types';
import PluginService from '../services/PluginService';
import { storagePath } from './app';

const config: IConfig = {
  path: storagePath,
  event: new PluginService
};

export default config;
