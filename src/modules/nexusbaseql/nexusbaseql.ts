import Query from './Query';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as path from "path";

interface Iconfig {
  resolvers: any[];
  dbFolder: string;
}

interface Idatabases {
  mainDB: any;
  workspaceDB?: any;
}

interface IgetDatabases {
  dbFolder: string;
}

class NexusbaseQl {
  resolvers: any[];
  dbFolder: string;

  constructor(config:Iconfig) {
    this.resolvers = config.resolvers;
    this.dbFolder = config.dbFolder;
  }

  resolve(queries: any) {
    const result:any = {};
    const actions = this.getActions();
    const databases = this.getDatabases({ dbFolder: this.dbFolder });

    for (const key in queries) {
      const query = queries[key];
      const action = actions[query.action];
      const nexusbaseQuery = new Query({ databases , action, query });
      
      result[key] = nexusbaseQuery.resolve();
    }

    return result
  }

  getActions() {
    const actions:any = [];

    for (const resolver of this.resolvers) {
      for (const name in resolver.actions()) {
        actions[name] = {
          resolver
        }
      }
    }

    return actions;
  }

  getDatabases({ dbFolder }:IgetDatabases):Idatabases {
    const mainDBPath = path.join(dbFolder, 'app.json');
    const mainDB = low(new FileSync(mainDBPath));
    mainDB.defaults({ workspaces: [] })
      .write()

    return {
      mainDB
    };
  }
}

export default NexusbaseQl;
