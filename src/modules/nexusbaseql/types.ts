export interface INexusBaseConfig {
  resolvers: any[];
}

export interface IResolverDbs {
  mainDB: any;
  workspaceDB?: any;
}

export interface IResolver {
  databases: IResolverDbs;
  useWorkspace: boolean
}
