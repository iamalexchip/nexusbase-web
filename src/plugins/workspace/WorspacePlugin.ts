
const actionBeforeAdd = 'action.workspaces.add.before';

class WorspacePlugin {
  hook({ name, payload }: any) {
    switch (name) {
      case actionBeforeAdd:
        return this.validateWorkspace(payload);
    }
  }

  validateWorkspace(workspace: any) {
    if (!workspace.hasOwnProperty('name')) {
      return 'workspace name is required';
    }
  }
}

export default WorspacePlugin;
