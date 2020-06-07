export interface IConfig {
  path: string;
  hook?: object;
  resolvers?: any[];
}

export interface IResolver {
  db: any;
  hook: any;
}

export interface IResolverResult {
  data?: any;
  error?: any;
}
