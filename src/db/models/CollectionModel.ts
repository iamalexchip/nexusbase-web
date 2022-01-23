import { WorkspaceDbInstance } from '../../interfaces/db';
import { IupdateCollectionDetails } from '../../interfaces/models';
import { Property, Collection } from '../../interfaces/store/collections';
import BaseModel from './BaseModel';
import ViewModel from './ViewModel';

export default class CollectionModel extends BaseModel {
  constructor(db: WorkspaceDbInstance) {
    super(db, 'c');
  }

  relatedCollections(collection: Collection) {
    let related: Collection[] = [];
    const relationProperties = collection.properties.filter(
      (property) => property.type === 'relation'
    );

    if (relationProperties.length > 0) {
      const relatedCollectionIds = relationProperties.map(
        (property) => property.options.collectionId
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
      properties: ['f1'],
    });

    const timestamp = Date.now();
    const collectionData: Collection = {
      id: collectionId,
      name: 'Untitled Collection',
      description: null,
      properties: [
        {
          id: 'f1',
          type: 'line',
          label: 'Title',
        },
      ],
      titleProperty: 'f1',
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

  find(id: string, includeRelated: boolean = false) {
    const collection = this.db.get('collections').find({ id }).value();

    return {
      ...collection,
      related: includeRelated ? this.relatedCollections(collection) : null,
    };
  }

  updateDetails(collectionId: string, data: IupdateCollectionDetails) {
    const collectionRef = this.db.get('collections').find({ id: collectionId });
    const collection = this.find(collectionId, true);

    collection.name = data.name || collection.name;
    collection.description = data.description || collection.description;

    collectionRef.assign(collection).write();
    collection.updatedAt = Date.now();

    return collectionRef.value();
  }

  addProperty(collectionId: string) {
    const collectionRef = this.db.get('collections').find({ id: collectionId });
    let collection = collectionRef.value();

    if (!collection) {
      throw new Error(`Collection not found: ${collectionId}`);
    }

    const propertyIds = collection.properties.map((property) =>
      Number(property.id.substr(1))
    );
    const propertyId = `a${Math.max(...propertyIds) + 1}`;

    collection.properties.push({
      id: propertyId,
      type: 'line',
      label: `Prop ${propertyId.substr(1)}`,
    });
    collection.updatedAt = Date.now();
    collectionRef.assign(collection);

    // add new property to views with a type of table
    this.db
      .get('views')
      .filter({ collectionId: collection.id, viewType: 'table' })
      .forEach((view) => {
        view.properties.push(propertyId);
      })
      .value();

    this.db.write();

    return collectionRef.value();
  }

  updateProperty(collectionId: string, propertyId: string, data: Property) {
    const collectionRef = this.db.get('collections').find({ id: collectionId });
    let collection = collectionRef.value();

    if (!collection) {
      throw new Error(`Collection not found: ${collectionId}`);
    }

    const property = collection.properties.find(
      (property) => property.id === propertyId
    );

    if (!property) {
      throw new Error(
        `Collection [${collectionId}] prop not found [${propertyId}]`
      );
    }

    const propertyIndex = collection.properties.findIndex(
      (prop) => prop.id === property.id
    );
    const updatedProperty = { ...property, ...data, id: property.id };
    console.log(updatedProperty);
    collection.properties[propertyIndex] = updatedProperty;
    collection.updatedAt = Date.now();

    collectionRef.assign(collection).write();

    return collectionRef.value();
  }

  delete(collectionId: string) {
    this.find(collectionId);
    this.db.get('collections').remove({ id: collectionId }).write();
    this.db.get('views').remove({ collectionId }).write();
    return true;
  }
}
