import * as fs from 'fs';
import * as path from "path";
import { readdirSync } from 'fs';
import { storagePath } from '../config/app';

interface IpluginData {
  
}

class PluginService {
  pluginData: IpluginData;

  constructor() {
    this.pluginData = { app: { version: '1.0'} };
  }

  getDirectories(source:string) {
    return readdirSync(source, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => `${source}/${dirent.name}`);
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
    let pluginPaths = this.getDirectories(path.join(storagePath, 'plugins'));
    pluginPaths = pluginPaths.filter((pluginPath: string) => fs.existsSync(`${pluginPath}/dist`));
    const pluginModules = pluginPaths.map((pluginPath: string) => require(`${pluginPath}/dist`));
    const PluginClasses = pluginModules.map((PluginModule: any) => {
      const hasDefault = PluginModule.hasOwnProperty('default');
      const PluginClass = hasDefault ?  PluginModule.default : PluginModule;
      
      return this.isClass(PluginClass) ? new PluginClass(this.pluginData) : null;
    });

    return PluginClasses.filter((PluginClass: any) => PluginClass);
  }

  hook(data: any) {
    const plugins = this.getPlugins();
    
    for (const plugin of plugins) {
      const error = plugin.hook(data);

      if (error) {
        return error;
      }
    }
  }
}

export default PluginService;
