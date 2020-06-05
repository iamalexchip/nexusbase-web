import { IResolver, IResolverResult } from "../types";
import Resolver from './Resolver';

class WorkspaceResolver extends Resolver {
  constructor(config: IResolver) {
    super(config);
    this.alias = 'workspace';
  }

  static actions(): any {
    return {
      createWorkspace: {},
      getWorkspaces: {},
      getWorkspace: {},
    }
  }

  createWorkspace(args: any): IResolverResult {
    let error = this.event('add.before', args);
    if (error) return { error };

    const mainDB = this.mainDB();
    const workspaceId: string = this.uniqueId(mainDB.get('workspaces'));
    const timestamp = this.timestamp();
    const workspaceData = {
      id: workspaceId,
      name: args.name,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    mainDB.get('workspaces').push(workspaceData).write();

    const data = mainDB.get('workspaces').find({ id: workspaceId }).value();
    const result: IResolverResult = { data };

    error = this.event('add.after', result);
    return error ? { error } : result;
  }

  getWorkspaces(args: any): IResolverResult {
    let error = this.event('browse.before', args);
    if (error) return { error };

    const data = this.mainDB().get('workspaces').value();
    const result: IResolverResult = { data };

    error = this.event('browse.after', result);
    return error ? { error } : result;
  }
  
  getWorkspace(args: any): IResolverResult {
    let error = this.event('read.before', args);
    if (error) return { error };

    const data = this.mainDB().get('workspaces').find({ id: args.id }).value();
    const result: IResolverResult = { data };
    
    error = this.event('read.after', result);
    return error ? { error } : result;
  }
}

export default WorkspaceResolver;
