import * as _ from 'lodash';

interface IRelationship {
  dbKey?: string;
  localKey?: string;
  foreignKey: string;
  replaceKey?: string;
}

class Model {
  [key: string]: any;

  constructor(data: any) {
    Object.assign(this, data);
  }

  populate(keys: string | string [], db: any) {
    if (typeof keys === 'string') {
      keys = [keys];
    }

    const relationships = this.relationships();
    
    for (const key of keys) {
      const relationship = relationships[key];
      
      if (relationship.type === 'hasMany') {
        this.hasMany({ ...relationship, replaceKey: key }, db);
      }

      if (relationship.type === 'hasOne') {
        this.hasOne({ ...relationship, replaceKey: key }, db);
      }
      
      if (relationship.type === 'refsMany') {
        this.refsMany({ ...relationship, replaceKey: key }, db);
      }

      if (relationship.type === 'refsOne') {
        this.refsOne({ ...relationship, replaceKey: key }, db);
      }
    }
  }

  hasOne(relationship: IRelationship, db: any) {
    const { dbKey, localKey, foreignKey, replaceKey } = relationship;
    const search = { [foreignKey]: this[localKey] };
    
    return this[replaceKey] = db.get(dbKey).find(search).value();
  }
  
  hasMany(relationship: IRelationship, db: any) {
    let { dbKey, localKey = 'id', foreignKey, replaceKey } = relationship;
    dbKey = dbKey || replaceKey;
    const search = { [foreignKey]: this[localKey] };

    return this[replaceKey] = db.get(dbKey).filter(search).value();
  }

  refsMany(relationship: IRelationship, db: any) {
    const { dbKey, localKey, foreignKey, replaceKey } = relationship;
    const search = _.matchesProperty(foreignKey, this[localKey]);

    return this[replaceKey] = db.get(dbKey).filter((item: any) => this[localKey].includes(item[foreignKey])).value();
  }

  refsOne(relationship: IRelationship, db: any) {
    let { dbKey, localKey, foreignKey = 'id', replaceKey } = relationship;
    localKey = localKey || replaceKey;

    const search = _.matchesProperty(foreignKey, this[localKey]);

    return this[replaceKey] = db.get(dbKey).find(search).value();
  }
}

export default Model;
