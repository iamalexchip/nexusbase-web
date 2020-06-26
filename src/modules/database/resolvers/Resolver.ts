import * as shortid from 'shortid';
import { IResolver } from "../../nexusbaseql/types";

class Resolver {
  db: any;
  config: any;
  event: any;
  plugin: any;
  alias: string;

  constructor(config: IResolver) {
    const {
      hook,
      db
    } = config;

    this.db = db;
    this.config = config;
    
    this.event = (type: string, payload: any) => {
      return hook.event({
        type,
        emitter: `resolvers.${this.alias}`,
        payload,
        db
      });
    };

    this.plugin = (name: string, payload: any) => {
      return hook.action(name, db, config, payload);
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

  timestamp() {
    return new Date().getTime();
  }
}

export default Resolver;
