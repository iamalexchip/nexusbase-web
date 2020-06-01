import Query from './Query';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as path from "path";
import { Idatabases } from './types';

interface Iconfig {
  resolvers: any[];
  storageFolder: string;
}

interface Iresolve {
  workspace: string;
  queries: any[];
}

interface IgetDatabases {
  storageFolder: string;
  workspace: string;
}

class NexusbaseQl {
  resolvers: any[];
  storageFolder: string;

  constructor(config:Iconfig) {
    this.resolvers = config.resolvers;
    this.storageFolder = config.storageFolder;
  }

  resolve({ workspace, queries }: Iresolve) {
    const result: any = {};
    const data: any = {};
    const errors: any = {};
    const actions = this.getActions();
    const isWorkspace = workspace ? true : false;
    const mainDB = this.getMainDB();
    const workspaceDB = isWorkspace ? this.getWorkspaceDB(mainDB, workspace) : null;
    const databases: Idatabases = { mainDB, workspaceDB };

    for (const key in queries) {
      const query = queries[key];
      const action = actions[query.action];
      
      if (!action) {
        errors[key] = `Unknown action type: ${query.action}`;
        continue;
      }

      const nexusbaseQuery = new Query({ databases, action, query, isWorkspace });
      const queryResult = nexusbaseQuery.resolve();
      
      if (queryResult.hasOwnProperty('data')) {
        data[key] = queryResult.data;
      }

      if (queryResult.hasOwnProperty('errors')) {
        errors[key] = queryResult.errors;
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
    const actions: any = [];

    for (const resolver of this.resolvers) {
      for (const name in resolver.actions()) {
        actions[name] = {
          resolver
        }
      }
    }

    return actions;
  }

  getMainDB() {
    let workspaceDB;
    const mainDBPath = path.join(this.storageFolder, 'db.json');
    const mainDB = low(new FileSync(mainDBPath));
    mainDB.defaults({
      workspaces: []
    }).write();

    return mainDB;
  }

  getWorkspaceDB(mainDB: any, workspace: string) {
    const workspaceData = mainDB.get('workspaces').find({ id: workspace }).value();
    console.log({workspaceData})
    if (false/*workspace*/) {
      const workspaceDBPath = path.join(
        this.storageFolder,
        'workspaces',
        workspace,
        'db.json'
      );
      const workspaceDB = low(new FileSync(workspaceDBPath));
      workspaceDB.defaults({
        workspace: {}
      }).write();
    
      return workspaceDB;
    }
  }
}

export default NexusbaseQl;
