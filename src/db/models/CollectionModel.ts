import { WorkspaceDbInstance } from '../../interfaces/db';
import { Attribute, Collection } from '../../interfaces/store/collections';
import BaseModel from './BaseModel';
import ViewModel from './ViewModel';

export default class CollectionModel extends BaseModel {
  constructor(db: WorkspaceDbInstance) {
    super(db, 'c');
  }

  relatedCollections(collection: Collection) {
    let related: Collection[] = [];
    const relationAttributes = collection.attributes.filter(
      (attribute) => attribute.type === 'relation'
    );

    if (relationAttributes.length > 0) {
      const relatedCollectionIds = relationAttributes.map(
        (attribute) => attribute.options.collectionId
      );

      const relatedCollections = this.db
        .get('collections')
        .filter((relatedCollection) => {
          return relatedCollectionIds.includes(relatedCollection.id);
        });

      related = relatedCollections.value();
    }

    return related;
  }

  create() {
    const collectionId = this.generateId();
    const viewModel = new ViewModel(this.db);
    const view = viewModel.create({
      collectionId,
      attributes: ['f1'],
    });

    const timestamp = Date.now();
    const collectionData: Collection = {
      id: collectionId,
      name: 'Untitled Collection',
      description: null,
      attributes: [
        {
          id: 'f1',
          type: 'line',
          label: 'Title',
        },
      ],
      titleAttribute: 'f1',
      defaultView: view.id,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.db.get('collections').push(collectionData).write();

    const collection = this.db
      .get('collections')
      .find({ id: collectionId })
      .value();

    return {
      ...collection,
      views: [view],
    };
  }

  get() {
    return this.db.get('collections').value();
  }

  find(id: string) {
    const collection = this.db.get('collections').find({ id }).value();
    return {
      ...collection,
      related: this.relatedCollections(collection),
    };
  }

  addAttribute(collectionId: string) {
    const collectionRef = this.db.get('collections').find({ id: collectionId });
    let collection = collectionRef.value();

    if (!collection) {
      throw new Error(`Collection not found: ${collectionId}`);
    }

    collection.attributes.push({
      id: 'f1',
      type: 'line',
      label: 'Title',
    });
    collection.updatedAt = Date.now();

    collectionRef.assign(collection).write();

    return collectionRef.value();
  }

  updateAttribute(collectionId: string, attributeId: string, data: Attribute) {
    const collectionRef = this.db.get('collections').find({ id: collectionId });
    let collection = collectionRef.value();

    if (!collection) {
      throw new Error(`Collection not found: ${collectionId}`);
    }

    const attribute = collection.attributes.find(
      (attribute) => attribute.id === attributeId
    );

    if (!attribute) {
      throw new Error(
        `Collection [${collectionId}] prop not found [${attributeId}]`
      );
    }

    const attributeIndex = collection.attributes.findIndex(
      (prop) => prop.id === attribute.id
    );
    const updatedAttribute = { ...attribute, ...data, id: attribute.id };
    collection.attributes[attributeIndex] = updatedAttribute;
    collection.updatedAt = Date.now();

    collectionRef.assign(collection).write();

    return collectionRef.value();
  }
}
