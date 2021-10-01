import { WorkspaceDbInstance } from '../../interfaces/db';
import { View, ViewTypes } from '../../interfaces/store/views';
import BaseModel from './BaseModel';

export default class ViewModel extends BaseModel {
  constructor(db: WorkspaceDbInstance) {
    super(db, 'v');
  }

  create({
    collectionId,
    name = '',
    type = 'list',
    attributes,
  }: {
    collectionId: string;
    name?: string;
    type?: ViewTypes;
    attributes: string[];
  }) {
    const id = this.generateId();
    const timestamp = Date.now();
    const viewData: View = {
      id,
      collectionId,
      name,
      type,
      attributes,
      options: {},
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.db.get('views').push(viewData).write();

    return this.db.get('views').find({ id }).value();
  }

  get(collectionId: string) {
    return this.db.get('views').filter({ collectionId }).value();
  }

  find(id: string) {
    return this.db.get('views').find({ id });
  }

  updateView(id: string, data: View) {
    const viewRef = this.find(id);
    const view = viewRef.value();

    if (!view) {
      throw new Error(`View not found: ${id}`);
    }

    viewRef.assign({ ...view, updatedAt: Date.now() }).write();
    return this.find(view.id).value();
  }
}
