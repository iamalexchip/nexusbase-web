import * as shortid from 'shortid';
import Resolver from './Resolver';

class WorkspaceResolver extends Resolver {
  static actions():any {
    return {
      createWorkspace: {},
      getWorkspaces: {},
      getWorkspace: {},
    }
  }

  createWorkspace(args: any) {
    let error = this.event('action.workspaces.add.before', args);
    
    if (error) {
      return { error };
    }

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
    const result = { data };
    error = this.event('action.workspaces.add.after', result);

    return error ? { error } : result;
  }

  getWorkspaces(args: any) {
    let error = this.event('action.workspaces.browse.before', args);
    
    if (error) {
      return { error };
    }

    const data = this.mainDB().get('workspaces').value();
    const result = { data };
    error = this.event('action.workspaces.browse.after', result);

    return error ? { error } : result;
  }
  
  getWorkspace(args: any) {
    let error = this.event('action.workspaces.read.before', args);
    
    if (error) {
      return { error };
    }

    const data = this.mainDB().get('workspaces').find({ id: args.id }).value();
    const result = { data };
    error = this.event('action.workspaces.read.after', result);

    return error ? { error } : result;
  }
}

export default WorkspaceResolver;
