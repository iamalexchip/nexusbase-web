export interface IConfig {
  path: string;
  hook?: object;
  resolvers?: any[];
}

export interface IResolverDbs {
  mainDB: any;
  workspaceDB?: any;
}

export interface IResolver {
  databases: IResolverDbs;
  useWorkspace: boolean;
  hook: any;
}
