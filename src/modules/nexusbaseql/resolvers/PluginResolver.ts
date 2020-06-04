import { IResolver } from "../types";
import Resolver from './Resolver';

class PluginResolver extends Resolver {
  constructor(config: IResolver) {
    super(config);
    this.alias = 'plugin';
  }

  static actions():any {
    return {
      pluginAction: {},
    }
  }

  pluginAction(args: any) {
    let error = this.event('plugins.before', args);
    if (error) return { error };

    const result = this.plugin(args.plugin, args.payload);

    error = this.event('plugins.after', result);
    return error ? { error } : result;
  }
}

export default PluginResolver;
