import { IResolver } from "./types";

class Resolver {
  useWorkspace: boolean;
  mainDB: any;
  workspaceDB: any;
  event: any;

  constructor(config: IResolver) {
    const { useWorkspace, hooks, databases: { mainDB, workspaceDB} } = config;
    this.useWorkspace = useWorkspace;
    this.event = hooks;

    this.mainDB = () => {
      return mainDB;
    }

    this.workspaceDB = () => {
      if (this.useWorkspace === false) {
        throw new Error('Action requires a workpace data. No workspace give in NexubaseQl request');
      }

      return workspaceDB;
    }
  }

  hook(name: string, response: any) {
    return this.event.hooks({
      name,
      response,
      mainDB: this.mainDB,
      workspaceDB: this.useWorkspace ? this.workspaceDB :null
    });
  }
}

export default Resolver;
