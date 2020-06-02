import * as path from "path";
import { readdirSync } from 'fs';
import { storagePath } from '../config/app';

class PluginService {
  getDirectories(source:string) {
    return readdirSync(source, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
  }

  getPlugins() {
    const plugins = [];
    const pluginsPath = path.join(storagePath, 'plugins');
    const pluginFolders = this.getDirectories(pluginsPath);
    
    for (const pluginFolder of pluginFolders) {
      const pluginModule = path.join(pluginsPath, pluginFolder);
      const PluginClass = require(pluginModule);
      const plugin = new PluginClass({ version: '1.0'});
      
      plugins.push(plugin);
    }

    return plugins;
  }

  hooks(data: any) {
    const plugins = this.getPlugins();
    
    for (const plugin of plugins) {
      plugin.hooks(data);
    }
  }
}

export default PluginService;
