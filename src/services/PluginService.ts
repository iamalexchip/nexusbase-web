import * as path from "path";
import { existsSync, readdirSync } from 'fs';
import { storagePath } from '../config/app';

interface IpluginData {
  
}

class PluginService {
  data: IpluginData;
  pluginsPath: string;

  constructor() {
    this.data = { app: { version: '1.0'} };
    this.pluginsPath = path.join(storagePath, 'plugins');
  }

  getDirectories(source:string) {
    return readdirSync(source, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
  }

  isClass(f: any) {
    try {
      new f();
    } catch (err) {
      return false;
    }
    return true;
  }

  getPlugins() {
    let pluginPaths = this.getDirectories(this.pluginsPath);
    const PluginClasses = pluginPaths.map((pluginPath: string) => {
      return this.getPlugin(pluginPath);
    }); 
    return PluginClasses.filter((PluginClass: any) => PluginClass);
  }

  getPlugin(name: string) {
    const pluginPath = path.join(this.pluginsPath, name, 'dist');
    if (!existsSync(pluginPath)) return null;
    
    const PluginModule = require(pluginPath);
    const hasDefault = PluginModule.hasOwnProperty('default');
    const PluginClass = hasDefault ?  PluginModule.default : PluginModule;
      
    return this.isClass(PluginClass) ? new PluginClass(this.data) : null;
  }

  action(pluginName: string, db: any, resolver: any, payload: any) {
    const plugin = this.getPlugin(pluginName);
    if (!plugin) return { error: `Plugin invalid or not installed: ${pluginName}` };
    if (typeof plugin.action !== 'function') return { error: `Plugin action not found: ${pluginName}` };

    const event = (type: string, payload: any) => this.event({
      type,
      emitter: `plugins.${pluginName}`,
      payload,
      db
    });
    
    return plugin.action({ db, event, resolver, payload });
  }

  event(data: {
    type: string,
    emitter: string,
    payload: string,
    db: any
  }) {
    const plugins = this.getPlugins();

    for (const plugin of plugins) {
      if(typeof plugin.event !== 'function') continue;
      
      const error = plugin.event(data);

      if (error) {
        return error;
      }
    }
  }
}

export default PluginService;
