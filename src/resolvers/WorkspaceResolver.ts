
class WorkspaceResolver {
  mainDB: any;

  constructor(databases: any) {
    this.mainDB = databases.mainDB;
  }

  static actions():any {
    return {
      getWorkspaces: {},
    }
  }

  getWorkspaces() {
    return this.mainDB.get('workspaces').value();
  }
}

export default WorkspaceResolver;
