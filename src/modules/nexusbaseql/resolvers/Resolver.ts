import * as shortid from 'shortid';
import { IResolver } from "../types";

class Resolver {
  mainDB: any;
  workspaceDB: any;
  config: any;
  event: any;
  plugin: any;
  alias: string;

  constructor(config: IResolver) {
    const {
      useWorkspace,
      hook,
      databases: {
        mainDB,
        workspaceDB
      }
    } = config;

    this.config = () => config;
    this.mainDB = () => mainDB;

    this.workspaceDB = () => {
      if (useWorkspace === false) {
        throw new Error('Action requires a workpace data. No workspace give in NexubaseQl request');
      }
      
      return workspaceDB;
    };

    const databases = {
      mainDB: this.mainDB(),
      workspaceDB: useWorkspace ? this.workspaceDB() : null
    };
    
    this.event = (type: string, payload: any) => {
      return hook.event({
        type,
        emitter: `resolvers.${this.alias}`,
        payload,
        databases
      });
    };

    this.plugin = (name: string, payload: any) => {
      return hook.action(name, databases, this.config(), payload);
    };
  }

  uniqueId(array: any) {
    let isUnique = false;
    let id: string;

    while(!isUnique) {
      id = shortid.generate();
      const match = array.find({ id }).value();
      isUnique = match ? false : true;
    }

    return id;
  }
}

export default Resolver;
