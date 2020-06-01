import { Idatabases } from "./types";

class Resolver {
  databases: Idatabases;

  constructor(databases: Idatabases) {
    this.databases = databases;
  }

  mainDB() {
    return this.databases.mainDB;
  }

  workspaceDB() {
    // todo: throw error if workspace id was not given
    return this.databases.workspaceDB;
  }
}

export default Resolver;
