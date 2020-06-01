import { IResolver } from "./types";

interface IQuery {
  action: any;
  query: any;
  databases: any;
  useWorkspace: boolean
}

class Query {
  actionName: string;
  resolver: any;
  args: any;
  isWorkspace: boolean

  constructor(config:IQuery) {
    const resolver = config.action.resolver;
    const resolverConfig: IResolver = {
      databases: config.databases,
      useWorkspace: config.useWorkspace
    };
    this.resolver = new resolver(resolverConfig);
    this.actionName = config.query.action;
    this.args = config.query.args;
  }

  resolve() {
    return this.resolver[this.actionName](this.args);
  }
}

export default Query;
