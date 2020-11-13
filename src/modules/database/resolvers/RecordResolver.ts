import { IResolver, IResolverResult } from "../../nexusbaseql/types";
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
      updateRecord: {},
      deleteRecord: {}
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

    if (!record) {
      let msg = `Error creating record`;
      const error = this.event('add.after', { error: msg }) || msg;
      return { error };
    }

    const data = record;

    error = this.event('add.after', { data });
    return error ? { error } : { data };
  }

  getRecords(args: any): IResolverResult {
    let error = this.event('browse.before', args);
    if (error) return { error };

    const { collectionId, sorts } = args;
    let records = this.db.get('records');
    let related;
    
    if (collectionId && collectionId !== '') {
      records = records.filter({ collectionId });
    }

    if (args.related) {
      related = this.db.get('records').value()
    }

    const data: any = {
      items: records.value(),
      related,
    }

    error = this.event('browse.after', { data });
    return error ? { error } : { data };
  }

  getRecord(args: any): IResolverResult {
    let error = this.event('read.before', args);
    if (error) return { error };

    const record = this.db.get('records').find({ id: args.id }).value();

    if (!record) {
      let msg = `Record not found: ${args.id}`;
      const error = this.event('read.after', { error: msg }) || msg;
      return { error };
    }

    const collection = this.db.get('collections').find({ id: record.collectionId }).value();

    if (!collection) {
      let msg = `Collection not found: ${record.collectionId}`;
      const error = this.event('read.after', { error: msg }) || msg;
      return { error };
    }

    const data = {
      ...record,
      collection
    };

    error = this.event('read.after', { data });
    return error ? { error } : { data };
  }

  updateRecord(args: any): IResolverResult {
    let error = this.event('edit.before', args);
    if (error) return { error };

    const { collectionId } = args;
    const collection = this.db.get('collections').find({ id: collectionId }).value();
    
    if (!collection) {
      let msg = `Collection not found: ${args.collectionId}`;
      const error = this.event('edit.after', { error: msg }) || msg;
      return { error };
    }

    const record = this.db.get('records').find({ id: args.id });
    const oldRecord = record.value();

    if (!oldRecord) {
      let msg = `Record not found: ${args.id}`;
      const error = this.event('edit.after', { error: msg }) || msg;
      return { error };
    }

    const timestamp = this.timestamp(); 
    const recordData = {
      ...oldRecord,
      fields: args.fields,
      updatedAt: timestamp
    };

    record.assign(recordData).write();

    const data = record;

    error = this.event('edit.after', { data });
    return error ? { error } : { data };
  }

  deleteRecord(args: any): IResolverResult {
    let error = this.event('delete.before', args);
    if (error) return { error };

    const record = this.db.get('records').find({ id: args.id });
    const recordData = record.value();

    if (!recordData) {
      let msg = `Record not found: ${args.id}`;
      const error = this.event('delete.after', { error: msg }) || msg;
      return { error };
    }

    const data = { ...recordData };

    this.db.get('records').remove({ id: args.id }).write();
    
    error = this.event('delete.after', { data });
    return error ? { error } : { data };
  }
}

export default RecordResolver;
