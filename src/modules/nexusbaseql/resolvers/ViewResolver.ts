import { IResolver, IResolverResult } from "../types";
import Resolver from './Resolver';

class ViewResolver extends Resolver {
  constructor(config: IResolver) {
    super(config);
    this.alias = 'view';
  }

  static actions():any {
    return {
      createView: {},
      getViews: {},
      getView: {},
      updateView: {}
    }
  }

  createView(args: any): IResolverResult {
    let error = this.event('add.before', args);
    if (error) return { error };

    const { collectionId, name = '', type = 'list', fields, options } = args;

    let id: string = this.uniqueId(this.db.get('wiews'));
    const timestamp = this.timestamp();
    const viewData = {
      id,
      collectionId,
      name,
      type,
      fields,
      options,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    this.db.get('views').push(viewData).write();

    const view = this.db.get('views').find({ id }).value();
    let result: IResolverResult = { data: view };

    error = this.event('add.after', result);
    return error ? { error } : result;
  }

  getViews(args: any): IResolverResult {
    let error = this.event('browse.before', args);
    if (error) return { error };

    const { collectionId } = args;
    const data = this.db.get('views').filter({ collectionId }).value();

    error = this.event('browse.after', { data});
    return error ? { error } : { data };
  }

  getView(args: any): IResolverResult {
    let error = this.event('read.before', args);
    if (error) return { error };

    const { id } = args;
    const data = this.findView(id).value();

    error = this.event('read.after', { data });
    return error ? { error } : { data };
  }

  updateView(args: any): IResolverResult {
    let error = this.event('read.before', args);
    if (error) return { error };

    const { id } = args;
    this.findView(id).assign(args).write();
    const data = this.findView(id).value();

    error = this.event('read.after', { data });
    return error ? { error } : { data };
  }

  findView(id: string) {
    return this.db.get('views').find({ id });
  }
}

export default ViewResolver;
