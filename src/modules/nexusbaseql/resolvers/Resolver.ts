import { IResolver } from "../types";

class Resolver {
  mainDB: any;
  workspaceDB: any;
  event: any;
  plugin: any;

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
    
    this.event = (type: string, payload: any) => {
      return hook.event({
        type,
        emitter: `resolver`,
        payload,
        meta: {
          mainDB: this.mainDB(),
          workspaceDB: useWorkspace ? this.workspaceDB() : null
        },
      });
    };

    this.plugin = (type: string, data: any) => hook.action(type, data);
  }
}

export default Resolver;
