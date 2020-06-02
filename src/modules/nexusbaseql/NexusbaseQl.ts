import Query from './Query';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as path from "path";
import * as fs from 'fs';
import { IResolverDbs, IConfig } from './types';
import defaultResolvers from './resolvers';

class NexusbaseQl {
  config: IConfig;
  storagePath: string;

  constructor(config: IConfig) {
    this.config = config;
    this.storagePath = path.join(config.path, 'data');
  }

  resolve({ workspace, queries }: {
    workspace: string;
    queries: any[];
  }) {
    const result: any = {};
    const data: any = {};
    const errors: any = {};
    const actions = this.getActions();
    const useWorkspace = workspace ? true : false;
    const mainDB = this.getMainDB();
    const workspaceDB = useWorkspace ? this.getWorkspaceDB(mainDB, workspace) : null;
    const databases: IResolverDbs = { mainDB, workspaceDB };

    for (const key in queries) {
      const query = queries[key];
      const action = actions[query.action];
      
      if (!action) {
        errors[key] = `Unknown action type: ${query.action}`;
        continue;
      }

      const nexusbaseQuery = new Query({
        databases,
        action,
        query,
        useWorkspace,
        hookResolver: this.config.hookResolver
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
    const actions: any = [];
    const customResolvers = this.config.resolvers || []; 
    const resolvers = [ ...defaultResolvers, ...customResolvers ];

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

  getMainDB() {
    const mainDBPath = path.join(this.storagePath, 'db.json');

    if (!fs.existsSync(this.storagePath)){
      fs.mkdirSync(this.storagePath, { recursive: true });
    }

    const mainDB = low(new FileSync(mainDBPath));
    mainDB.defaults({
      workspaces: []
    }).write();

    return mainDB;
  }

  getWorkspaceDB(mainDB: any, workspace: string) {
    const workspaceData = mainDB.get('workspaces').find({ id: workspace }).value();
    
    if (!workspaceData) {
      throw new Error(`Workspace not found. Id: ${workspace}`);
    }
    
    const workspaceFolder = path.join(this.storagePath, 'workspaces', workspace);
    
    if (!fs.existsSync(workspaceFolder)){
      fs.mkdirSync(workspaceFolder, { recursive: true });
    }

    const workspaceDBPath = path.join(workspaceFolder, 'db.json');
    const workspaceDB = low(new FileSync(workspaceDBPath));
    workspaceDB.defaults({
      collections: {}
    }).write();
  
    return workspaceDB;
  }
}

export default NexusbaseQl;
