export interface IConfig {
  path: string;
  event?: object;
  resolvers?: any[];
}

export interface IResolverDbs {
  mainDB: any;
  workspaceDB?: any;
}

export interface IResolver {
  databases: IResolverDbs;
  useWorkspace: boolean;
  event: any;
}
