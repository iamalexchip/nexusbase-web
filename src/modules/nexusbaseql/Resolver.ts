import { IResolver } from "./types";

class Resolver {
  useWorkspace: boolean;
  mainDB: any;
  workspaceDB: any;

  constructor(config: IResolver) {
    const { useWorkspace, databases: { mainDB, workspaceDB} } = config;
    this.useWorkspace = useWorkspace;

    this.mainDB = () => {
      return mainDB;
    }

    this.workspaceDB = () => {
      if (this.useWorkspace === false) {
        throw new Error('Action requires a workpace data. No worspace give in NexubaseQl request');
      }

      return workspaceDB;
    }
  }
}

export default Resolver;
