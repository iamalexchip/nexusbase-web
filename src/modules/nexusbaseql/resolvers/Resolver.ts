import { IResolver } from "../types";

class Resolver {
  useWorkspace: boolean;
  mainDB: any;
  workspaceDB: any;
  hookResolver: any;

  constructor(config: IResolver) {
    const { useWorkspace, hookResolver, databases: { mainDB, workspaceDB} } = config;
    this.useWorkspace = useWorkspace;
    this.hookResolver = hookResolver;

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

  hook(name: string, payload: any) {
    return this.hookResolver.resolve({
      name,
      payload,
      mainDB: this.mainDB,
      workspaceDB: this.useWorkspace ? this.workspaceDB :null
    });
  }
}

export default Resolver;
