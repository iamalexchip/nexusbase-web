import WorkspaceResolver from '../resolvers/WorkspaceResolver';
import * as path from "path";

const config = {
  dbFolder: path.join(__dirname, '..', '..', 'data'),// todo: change dbFolder based on env
  resolvers: [
    WorkspaceResolver
  ]
};

export default config;
