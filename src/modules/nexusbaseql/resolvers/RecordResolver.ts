import { IResolver, IResolverResult } from "../types";
import Resolver from './Resolver';

class RecordResolver extends Resolver {
  constructor(config: IResolver) {
    super(config);
    this.alias = 'view';
  }

  static actions():any {
    return {
      createRecord: {},
      getRecords: {}
    }
  }

  createRecord(args: any): IResolverResult {
    let error = this.event('add.before', args);
    if (error) return { error };

    const workspaceDB = this.workspaceDB();
    let viewId: string = this.uniqueId(workspaceDB.get('wiews'));
    const timestamp = this.timestamp();
    const viewData = {
      id: viewId,
      name: args.name || '',
      collection: args.collection,
      fields: args.fields,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    workspaceDB.get('views').push(viewData).write();

    const view = workspaceDB.get('views').find({ id: viewId }).value();
    let result: IResolverResult = { data: view };

    error = this.event('add.after', result);
    return error ? { error } : result;
  }

  getRecords(args: any): IResolverResult {
    let error = this.event('browse.before', args);
    if (error) return { error };

    const records = this.workspaceDB().get('records').value();
    const result: IResolverResult = { data: records };

    error = this.event('browse.after', result);
    return error ? { error } : result;
  }
}

export default RecordResolver;
