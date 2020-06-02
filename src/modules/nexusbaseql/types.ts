export interface INexusBaseConfig {
  hooks: object;
  path: string;
  resolvers: any[];
}

export interface IResolverDbs {
  mainDB: any;
  workspaceDB?: any;
}

export interface IResolver {
  databases: IResolverDbs;
  useWorkspace: boolean;
  hooks: any;
}
