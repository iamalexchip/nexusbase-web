import * as path from "path";
import runPlugins from '../services/PluginService';

export const storagePath = path.join(__dirname, '..', '..', 'storage');// todo: change path based on env
export const plugins = runPlugins;