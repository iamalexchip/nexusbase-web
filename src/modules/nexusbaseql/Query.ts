
interface IQuery {
  action: any;
  query: any;
  databases: any;
}

class Query {
  actionName: string;
  resolver: any;

  constructor(config:IQuery) {
    const resolver = config.action.resolver;
    this.resolver = new resolver(config.databases);
    this.actionName = config.query.action;
  }

  resolve() {
    return this.resolver[this.actionName]();
  }
}

export default Query;
