import { IResolver } from "../types";

class Resolver {
  mainDB: any;
  workspaceDB: any;
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
      return hook.action(name, databases, payload);
    };
  }
}

export default Resolver;
