import { LowdbSync } from 'lowdb';
import { Collection } from './store/collections';
import { View } from './store/views';
import { Workspace } from './store/workspaces';

export type AppDB = {
  workspaces: Workspace[];
  lastWorkspace?: string;
  lastCollection?: string;
};

export type WorkspaceDB = {
  workspace: Workspace;
  collections: Collection[];
  views: View[];
};

export type WorkspaceDbInstance = LowdbSync<WorkspaceDB>;

export type idPrefix = 'w' | 'c' | 'v' | 'i';
