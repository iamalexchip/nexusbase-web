export interface INexusBaseConfig {
  path: string;
  hookResolver: object;
  resolvers: any[];
}

export interface IResolverDbs {
  mainDB: any;
  workspaceDB?: any;
}

export interface IResolver {
  databases: IResolverDbs;
  useWorkspace: boolean;
  hookResolver: any;
}
