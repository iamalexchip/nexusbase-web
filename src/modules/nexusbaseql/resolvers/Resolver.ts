import { IResolver } from "../types";

class Resolver {
  useWorkspace: boolean;
  mainDB: any;
  workspaceDB: any;
  eventHandler: any;

  constructor(config: IResolver) {
    const { useWorkspace, event, databases: { mainDB, workspaceDB} } = config;
    this.useWorkspace = useWorkspace;
    this.eventHandler = event;

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

  event(type: string, payload: any) {
    return this.eventHandler.event({
      type,
      payload,
      meta: {
        mainDB: this.mainDB,
        workspaceDB: this.useWorkspace ? this.workspaceDB :null
      },
    });
  }
}

export default Resolver;
