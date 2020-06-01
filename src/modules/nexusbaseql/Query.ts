
interface IQuery {
  action: any;
  query: any;
  databases: any;
  isWorkspace: boolean
}

class Query {
  actionName: string;
  resolver: any;
  args: any;
  isWorkspace: boolean

  constructor(config:IQuery) {
    const resolver = config.action.resolver;
    this.resolver = new resolver(config.databases);
    this.actionName = config.query.action;
    this.args = config.query.args;
    this.isWorkspace = config.isWorkspace;
  }

  resolve() {
    return this.resolver[this.actionName](this.args);
  }
}

export default Query;
