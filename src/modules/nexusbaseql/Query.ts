import { IResolver } from "./types";

interface IQuery {
  action: any;
  query: any;
  db: any;
  hook: any;
}

class Query {
  actionName: string;
  resolver: any;
  args: any;

  constructor(config: IQuery) {
    const resolver = config.action.resolver;
    const resolverConfig: IResolver = {
      db: config.db,
      hook: config.hook,
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
