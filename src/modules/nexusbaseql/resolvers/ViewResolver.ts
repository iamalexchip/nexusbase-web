import { IResolver, IResolverResult } from "../types";
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

  createView(args: any): IResolverResult {
    let error = this.event('add.before', args);
    if (error) return { error };

    const { collectionId, name = '', type = 'list', fields } = args;

    let id: string = this.uniqueId(this.db.get('wiews'));
    const timestamp = this.timestamp();
    const viewData = {
      id,
      collectionId,
      name,
      type,
      fields,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    this.db.get('views').push(viewData).write();

    const view = this.db.get('views').find({ id }).value();
    let result: IResolverResult = { data: view };

    error = this.event('add.after', result);
    return error ? { error } : result;
  }
}

export default ViewResolver;
