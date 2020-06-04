import { IResolver } from "../types";
import Resolver from './Resolver';

class ViewResolver extends Resolver {
  constructor(config: IResolver) {
    super(config);
    this.alias = 'view';
  }

  static actions():any {
    return {
      createView: {}
    }
  }

  createView(args: any) {
    let error = this.event('add.before', args);
    if (error) return { error };

    const workspaceDB = this.workspaceDB();
    let viewId: string = this.uniqueId(workspaceDB.get('wiews'));

    workspaceDB
      .get('views')
      .push({
        id: viewId,
        name: args.name,
        collection: args.collection
      })
      .write();

    const data = workspaceDB.get('views').find({ id: viewId }).value();
    const result = { data };

    error = this.event('add.after', result);
    return error ? { error } : result;
  }
}

export default ViewResolver;
