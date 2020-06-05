import { IResolver, IResolverResult } from "../types";
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

  createCollection(args: any): IResolverResult {
    let error = this.event('add.before', args);
    if (error) return { error };
    
    const workspaceDB = this.workspaceDB();
    let collectionId: string = this.uniqueId(workspaceDB.get('collections'));
    
    const viewResolver = new ViewResolver(this.config());
    const view = viewResolver.createView({
      collection: collectionId,
      type: 'table',
      fields: ['f1']
    }).data;
    
    const timestamp = this.timestamp();
    const collectionData = {
      id: collectionId,
      name: args.name,
      description: args.description || '',
      fields: [
        {
          id: 'f1',
          type: 'line',
          label: 'Title'
        }
      ],
      titleField: 'f1',
      defaultView: view.id,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    workspaceDB.get('collections').push(collectionData).write();

    const collection = workspaceDB.get('collections').find({ id: collectionId }).value();
    const result: IResolverResult = {
      data: {
        ...collection,
        views: [view]
      }
    };

    error = this.event('add.after', result);
    return error ? { error } : result;
  }

  getCollections(args: any): IResolverResult {
    let error = this.event('browse.before', args);
    if (error) return { error };

    const collections = this.workspaceDB().get('collections').value();
    const result: IResolverResult = { data: collections };

    error = this.event('browse.after', result);
    return error ? { error } : result;
  }
  
  getCollection(args: any): IResolverResult {
    let error = this.event('read.before', args);
    if (error) return { error };

    const collection = this.workspaceDB().get('collections').find({ id: args.id }).value();
    const views = this.workspaceDB()
      .get('views')
      .filter({ collection: collection.id })
      .value();
    
    const result: IResolverResult = {
      data: {
        ...collection,
        views
      }
    };

    error = this.event('read.after', result);
    return error ? { error } : result;
  }
}

export default CollectionResolver;
