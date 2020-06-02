import * as shortid from 'shortid';
import Resolver from './Resolver';

class CollectionResolver extends Resolver {
  static actions():any {
    return {
      getCollections: {},
    }
  }

  getCollections(args: any) {
    let error = this.event('action.collections.browse.before', args);
    
    if (error) {
      return { error };
    }

    const data = this.workspaceDB().get('collections').value();
    const result = { data };
    error = this.event('action.collections.browse.after', result);

    return error ? { error } : result;
  }
}

export default CollectionResolver;
