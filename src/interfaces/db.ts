import { Workspace } from './store/workspace';

export type AppDB = {
  workspaces: Workspace[];
  lastWorkspace?: string;
  lastCollection?: string;
};

export type WorkspaceDB = {
  workspace: Workspace;
};
