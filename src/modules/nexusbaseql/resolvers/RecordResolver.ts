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
      getRecords: {},
      getRecord: {},
    }
  }

  createRecord(args: any): IResolverResult {
    let error = this.event('add.before', args);
    if (error) return { error };

    const { collectionId } = args;
    const collection = this.db.get('collections').find({ id: collectionId }).value();
    
    if (!collection) {
      let msg = `Collection not found: ${args.collection}`;
      const error = this.event('add.after', { error: msg }) || msg;
      return { error };
    }

    let recordId: string = this.uniqueId(this.db.get('records'));
    const timestamp = this.timestamp();
    const recordData = {
      id: recordId,
      collectionId,
      fields: {},
      createdAt: timestamp,
      updatedAt: timestamp
    };

    this.db.get('records').push(recordData).write();

    const record = this.db.get('records').find({ id: recordId }).value();
    const data = record;

    error = this.event('add.after', { data });
    return error ? { error } : { data };
  }

  getRecords(args: any): IResolverResult {
    let error = this.event('browse.before', args);
    if (error) return { error };

    const data = this.db.get('records').value();

    error = this.event('browse.after', { data });
    return error ? { error } : { data };
  }

  getRecord(args: any): IResolverResult {
    let error = this.event('read.before', args);
    if (error) return { error };

    const record = this.db.get('records').find({ id: args.id }).value();
    const collection = this.db.get('collections').find({ id: record.collectionId }).value();
    const data = {
      ...record,
      collection
    };

    error = this.event('read.after', { data });
    return error ? { error } : { data };
  }
}

export default RecordResolver;
