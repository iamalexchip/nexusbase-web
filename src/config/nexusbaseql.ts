import * as path from "path";
import { INexusBaseConfig } from '../modules/nexusbaseql/types';
import WorkspaceResolver from '../resolvers/WorkspaceResolver';
import CollectionResolver from '../resolvers/CollectionResolver';

const config: INexusBaseConfig = {
  path: path.join(__dirname, '..', '..', 'storage'),// todo: change path based on env
  resolvers: [
    WorkspaceResolver,
    CollectionResolver
  ]
};

export default config;
