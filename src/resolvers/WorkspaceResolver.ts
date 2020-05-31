import * as shortid from 'shortid';
import { Idatabases } from '../modules/nexusbaseql/nexusbaseql';

class WorkspaceResolver {
  mainDB: any;

  constructor(databases: Idatabases) {
    this.mainDB = databases.mainDB;
  }

  static actions():any {
    return {
      createWorkspace: {},
      getWorkspaces: {},
      getWorkspace: {},
    }
  }

  createWorkspace(args: any) {
    let workspaceId: string;
    let isUnique = false;
    
    while(!isUnique) {
      workspaceId = shortid.generate();
      const match = this.mainDB.get('workspaces').find({ id: workspaceId }).value();
      isUnique = match ? false : true;
    }

    this.mainDB
      .get('workspaces')
      .push({
        id: workspaceId,
        name: args.name
      })
      .write();

    return { data: this.mainDB.get('workspaces').find({ id: workspaceId }).value() };
  }

  getWorkspaces() { 
    return { data: this.mainDB.get('workspaces').value() };
  }

  getWorkspace(args: any) { 
    return { data: this.mainDB.get('workspaces').find({ id: args.id }).value() };
  }
}

export default WorkspaceResolver;
