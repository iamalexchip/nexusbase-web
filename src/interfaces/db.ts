import { Collection } from './store/collections';
import { Workspace } from './store/workspaces';

export type AppDB = {
  workspaces: Workspace[];
  lastWorkspace?: string;
  lastCollection?: string;
};

export type WorkspaceDB = {
  workspace: Workspace;
  collections: Collection[];
};
