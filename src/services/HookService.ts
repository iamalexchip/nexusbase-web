import * as path from "path";
import { readdirSync } from 'fs';
import { storagePath } from '../config/app';

const getDirectories = (source:string) =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

 const hookService = (data: any) => {
  const hooksPath = path.join(storagePath, 'hooks');
  const hookFolders = getDirectories(hooksPath);
  
  for (const hookFolder of hookFolders) {
    const hookPath = path.join(hooksPath, hookFolder);
    const hook = require(hookPath);
    
    hook(data);
  }
}

export default hookService;