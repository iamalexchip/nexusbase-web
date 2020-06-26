import Query from './Query';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as path from "path";
import * as fs from 'fs';
import { IConfig } from './types';

class NexusbaseQl {
  config: IConfig;
  storagePath: string;

  constructor(config: IConfig) {
    this.config = config;
    this.storagePath = path.join(config.path, 'data');
  }

  resolve(queries: any) {
    const result: any = {};
    const data: any = {};
    const errors: any = {};
    const actions = this.getActions();
    const db = this.getDatabase();

    for (const key in queries) {
      const query = queries[key];
      const action = actions[query.action];
      
      if (!action) {
        errors[key] = `Unknown action type: ${query.action}`;
        continue;
      }

      const nexusbaseQuery = new Query({
        db,
        action,
        query,
        hook: this.config.hook
      });
      const queryResult = nexusbaseQuery.resolve();
      
      if (queryResult.hasOwnProperty('data')) {
        data[key] = queryResult.data;
      }

      if (queryResult.hasOwnProperty('error')) {
        errors[key] = queryResult.error;
      }
    }

    if (Object.keys(data).length > 0) {
      result.data = data;
    }

    if (Object.keys(errors).length > 0) {
      result.errors = errors;
    }

    return result;
  }

  getActions() {
    const actions: any = {};
    const resolvers = this.config.resolvers; 

    for (const resolver of resolvers) {
      for (const name in resolver.actions()) {
        if (actions.hasOwnProperty(name)) {
          throw new Error(`Duplicate action name: ${name}`);
        }

        actions[name] = {
          resolver
        }
      }
    }

    return actions;
  }

  getDatabase() {
    const mainDBPath = path.join(this.storagePath, 'db.json');

    if (!fs.existsSync(this.storagePath)){
      fs.mkdirSync(this.storagePath, { recursive: true });
    }

    const mainDB = low(new FileSync(mainDBPath));
    mainDB.defaults({
      workspaces: [],
      collections: [],
      views: [],
      records: []
    }).write();

    mainDB._.mixin({
      model: (array, model) => array.map((item: object) => new model(item)),
      populate: (array, keys, db) => array.map((item: any) => {
        item.populate(keys, db);
        return item;
      })
    });

    return mainDB;
  }
}

export default NexusbaseQl;
