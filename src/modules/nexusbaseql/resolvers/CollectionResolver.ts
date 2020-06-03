import * as shortid from 'shortid';
import { IResolver } from "../types";
import Resolver from './Resolver';

class CollectionResolver extends Resolver {
  constructor(config: IResolver) {
    super(config);
    this.alias = 'collection';
  }

  static actions():any {
    return {
      getCollections: {},
    }
  }

  getCollections(args: any) {
    let error = this.event('browse.before', args);
    if (error) return { error };

    const data = this.workspaceDB().get('collections').value();
    const result = { data };

    error = this.event('browse.after', result);
    return error ? { error } : result;
  }
}

export default CollectionResolver;
