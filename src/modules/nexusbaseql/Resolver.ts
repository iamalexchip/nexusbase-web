import { IResolver } from "./types";
import { plugins } from '../../config/app';

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
        throw new Error('Action requires a workpace data. No workspace give in NexubaseQl request');
      }

      return workspaceDB;
    }
  }

  event(name: string, response: any) {
    return plugins({
      name,
      response,
      mainDB: this.mainDB,
      workspaceDB: this.useWorkspace ? this.workspaceDB :null
    });
  }
}

export default Resolver;
