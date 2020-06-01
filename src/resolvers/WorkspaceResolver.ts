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
    const response = { data };
    this.event('action.workspaces.add', response);
    return response
  }

  getWorkspaces() {
    const data = this.mainDB().get('workspaces').value();
    const response = { data };
    this.event('action.workspaces.browse', response);
    return response;
  }
  
  getWorkspace(args: any) {
    const data = this.mainDB().get('workspaces').find({ id: args.id }).value();
    const response = { data };
    this.event('action.workspaces.read', response);
    return response;
  }
}

export default WorkspaceResolver;
