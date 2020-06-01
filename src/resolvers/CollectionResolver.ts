import * as shortid from 'shortid';
import Resolver from '../modules/nexusbaseql/Resolver';

class CollectionResolver extends Resolver {
  static actions():any {
    return {
      getCollections: {},
    }
  }

  getCollections() {
    const data = this.workspaceDB().get('collections').value();
    const response = { data };
    this.event('action.collections.browse', response);
    return response;
  }
}

export default CollectionResolver;
