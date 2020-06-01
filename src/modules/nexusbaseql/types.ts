export interface INexusBaseConfig {
  resolvers: any[];
  path: string;
}

export interface IResolverDbs {
  mainDB: any;
  workspaceDB?: any;
}

export interface IResolver {
  databases: IResolverDbs;
  useWorkspace: boolean
}
