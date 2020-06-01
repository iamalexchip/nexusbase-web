import WorkspaceResolver from '../resolvers/WorkspaceResolver';
import * as path from "path";

const config = {
  storageFolder: path.join(__dirname, '..', '..', 'storage'),// todo: change storageFolder based on env
  resolvers: [
    WorkspaceResolver
  ]
};

export default config;
