import { IResolver } from "../types";
import Resolver from './Resolver';
import ViewResolver from "./ViewResolver";

class CollectionResolver extends Resolver {
  constructor(config: IResolver) {
    super(config);
    this.alias = 'collection';
  }

  static actions():any {
    return {
      createCollection: {},
      getCollections: {},
      getCollection: {},
    }
  }

  createCollection(args: any) {
    let error = this.event('add.before', args);
    if (error) return { error };

    const workspaceDB = this.workspaceDB();
    let collectionId: string = this.uniqueId(workspaceDB.get('collections'));

    workspaceDB
      .get('collections')
      .push({
        id: collectionId,
        name: args.name
      })
      .write();

    const collection = workspaceDB.get('collections').find({ id: collectionId }).value();
    
    const viewResolver = new ViewResolver(this.config());
    const view = viewResolver.createView({ collection: collectionId })
    const data = { ...collection, view };
    const result = { data };

    error = this.event('add.after', result);
    return error ? { error } : result;
  }

  getCollections(args: any) {
    let error = this.event('browse.before', args);
    if (error) return { error };

    const data = this.workspaceDB().get('collections').value();
    const result = { data };

    error = this.event('browse.after', result);
    return error ? { error } : result;
  }
  
  getCollection(args: any) {
    let error = this.event('read.before', args);
    if (error) return { error };

    const data = this.workspaceDB().get('collections').find({ id: args.id }).value();
    const result = { data };

    error = this.event('read.after', result);
    return error ? { error } : result;
  }
}

export default CollectionResolver;
