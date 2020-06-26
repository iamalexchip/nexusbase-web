import { IResolver, IResolverResult } from "../../nexusbaseql/types";
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

    const { workspaceId, name, description = '' } = args;
    // todo: workspace exists
    
    const collectionId: string = this.uniqueId(this.db.get('collections'));
    const viewResolver = new ViewResolver(this.config);
    const view = viewResolver.createView({
      collectionId,
      fields: ['f1'],
      options: {
        groupBy: null
      }
    }).data;
    
    const timestamp = this.timestamp();
    const collectionData = {
      id: collectionId,
      workspaceId,
      name,
      description,
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

    this.db.get('collections').push(collectionData).write();

    const collection = this.db.get('collections').find({ id: collectionId }).value();
    const data =  {
      ...collection,
      views: [view]
    };

    error = this.event('add.after', { data });
    return error ? { error } : { data };
  }

  getCollections(args: any): IResolverResult {
    let error = this.event('browse.before', args);
    if (error) return { error };

    const { workspaceId } = args;
    const data = this.db.get('collections').filter({ workspaceId }).value();

    error = this.event('browse.after', { data});
    return error ? { error } : { data };
  }
  
  getCollection(args: any): IResolverResult {
    let error = this.event('read.before', args);
    if (error) return { error };

    const collections = this.db.get('collections');
    const collection = collections.find({ id: args.id }).value();
    const views = this.db.get('views').filter({ collectionId: collection.id }).value();
    const relationFields = collection.fields.filter((field: any) => field.type === 'relation');
    let related = [];
    
    if (relationFields.length > 0) {
      const relatedCollectionIds = relationFields.map((field: any) => field.options.collectionId);
      
      const relatedCollections = collections.filter((relatedCollection: any) => {
        return relatedCollectionIds.includes(relatedCollection.id);
      });

      related = relatedCollections.value();
    }
    
    const data: any = {
      item: {
        ...collection,
        views
      },
      related
    };

    error = this.event('read.after', { data });
    return error ? { error } : { data };
  }
}

export default CollectionResolver;
