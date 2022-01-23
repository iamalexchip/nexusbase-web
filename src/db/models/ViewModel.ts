import { WorkspaceDbInstance } from '../../interfaces/db';
import { IupdateView } from '../../interfaces/models';
import { View, ViewTypes } from '../../interfaces/store/views';
import BaseModel from './BaseModel';

export default class ViewModel extends BaseModel {
  constructor(db: WorkspaceDbInstance) {
    super(db, 'v');
  }

  create({
    collectionId,
    name = '',
    viewType = 'table',
    properties = [],
  }: {
    collectionId: string;
    name?: string;
    viewType?: ViewTypes;
    properties?: string[];
  }) {
    const id = this.generateId();
    const timestamp = Date.now();
    const viewData: View = {
      id,
      collectionId,
      name,
      viewType,
      properties,
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

  update(id: string, data: IupdateView) {
    const viewRef = this.find(id);
    const view = viewRef.value();

    if (!view) {
      throw new Error(`View not found: ${id}`);
    }

    viewRef.assign({ ...view, ...data, updatedAt: Date.now() }).write();
    return this.find(view.id).value();
  }
}
