import { idPrefix, WorkspaceDbInstance } from '../../interfaces/db';
import { generateId } from '../../utils/misc';

export default class BaseModel {
  db: WorkspaceDbInstance;
  idPrefix: idPrefix;

  constructor(db: WorkspaceDbInstance, idPrefix: idPrefix) {
    this.db = db;
    this.idPrefix = idPrefix;
  }

  generateId() {
    return generateId(this.idPrefix);
  }

  timestamp() {
    return Date.now();
  }
}
