import * as shortid from 'shortid';
import Resolver from './Resolver';

class PluginResolver extends Resolver {
  static actions():any {
    return {
      pluginAction: {},
    }
  }

  pluginAction(args: any) {
    let error = this.event('action.plugins.before', args);
    if (error) return { error };

    const result = this.plugin(args.plugin, args.data);

    error = this.event('action.plugins.after', result);
    return error ? { error } : result;
  }
}

export default PluginResolver;
