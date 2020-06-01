import * as path from "path";
import { readdirSync } from 'fs';
import { storagePath } from '../config/app';

const getDirectories = (source:string) =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

export default function(data: any) {
  const pluginsPath = path.join(storagePath, 'plugins');
  const pluginFolders = getDirectories(pluginsPath);
  
  for (const pluginFolder of pluginFolders) {
    const pluginPath = path.join(pluginsPath, pluginFolder);
    const plugin = require(pluginPath);
    
    plugin(data);
  }
}