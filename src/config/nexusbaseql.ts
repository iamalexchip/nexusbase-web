import { INexusBaseConfig } from '../modules/nexusbaseql/types';
import WorkspaceResolver from '../resolvers/WorkspaceResolver';
import CollectionResolver from '../resolvers/CollectionResolver';

const config: INexusBaseConfig = {
  resolvers: [
    WorkspaceResolver,
    CollectionResolver
  ]
};

export default config;
