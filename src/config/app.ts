import * as path from "path";

/* Todo: use env to define path, default should be
 * production: ~/.nexusbase
 * dev: path.join(__dirname, '..', '..', 'storage')
 */
export const storagePath = path.join(__dirname, '..', '..', 'storage');
export const appPath = path.join(__dirname, '..');
export const platforms = {
  server: '1.0',
  web: '1.0'
};
