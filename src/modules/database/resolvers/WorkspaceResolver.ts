import { IResolver, IResolverResult } from "../../nexusbaseql/types";
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

    const workspaceId: string = this.uniqueId(this.db.get('workspaces'));
    const timestamp = this.timestamp();
    const workspaceData = {
      id: workspaceId,
      name: args.name,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    this.db.get('workspaces').push(workspaceData).write();

    const data = this.db.get('workspaces').find({ id: workspaceId }).value();

    error = this.event('add.after', { data});
    return error ? { error } : { data };
  }

  getWorkspaces(args: any): IResolverResult {
    let error = this.event('browse.before', args);
    if (error) return { error };

    const data = this.db.get('workspaces').value();

    error = this.event('browse.after', { data });
    return error ? { error } : { data };
  }
  
  getWorkspace(args: any): IResolverResult {
    let error = this.event('read.before', args);
    if (error) return { error };

    const data = this.db.get('workspaces').find({ id: args.id }).value();
    
    error = this.event('read.after', { data });
    return error ? { error } : { data };
  }
}

export default WorkspaceResolver;
