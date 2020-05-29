
export const resolveQueries = (queries: any) => {
  const result:any = {};
  const actions = getActions();

  for (const key in queries) {
    const query = queries[key];
    const action = actions[query.action];
    const nexusbaseQuery = new Query(action, query);
    
    result[key] = nexusbaseQuery.resolve();
  }

  return result
}

const getActions = () => {
  const actions:any = [];
  const resolvers = [
    WorkspaceResolver
  ];

  for (const resolver of resolvers) {
    for (const name in resolver.actions()) {
      actions[name] = {
        resolver
      }
    }
  }

  return actions;
}

class Query {
  actionName: any;
  resolver: any;

  constructor(action:any, query:any) {
    const resolver = action.resolver;
    this.actionName = query.action;
    this.resolver = new resolver;
  }

  resolve() {
    return this.resolver[this.actionName]();
  }
}

class WorkspaceResolver {
  static actions():any {
    return {
      getWorkspaces: null,
    }
  }

  getWorkspaces() {
    return "workspaces";
  }
}
