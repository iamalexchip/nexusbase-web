import * as shortid from 'shortid';
import Resolver from '../modules/nexusbaseql/Resolver';

class WorkspaceResolver extends Resolver {
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
    const mainDB = this.mainDB();
    
    while(!isUnique) {
      workspaceId = shortid.generate();
      const match = mainDB.get('workspaces').find({ id: workspaceId }).value();
      isUnique = match ? false : true;
    }

    mainDB
      .get('workspaces')
      .push({
        id: workspaceId,
        name: args.name
      })
      .write();

    const data = mainDB.get('workspaces').find({ id: workspaceId }).value();

    return { data };
  }

  getWorkspaces() {
    const data = this.mainDB().get('workspaces').value();
    return { data };
  }

  getWorkspace(args: any) {
    const data = this.mainDB().get('workspaces').find({ id: args.id }).value(); 
    return { data };
  }
}

export default WorkspaceResolver;
