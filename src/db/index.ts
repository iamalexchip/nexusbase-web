import { AppDB, WorkspaceDB } from '../interfaces/db';
import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';

export const appDb = () => {
  const defaultValue = {
    workspaces: [
      {
        id: '9VxN5dbt8',
        name: 'My Workspace',
      },
    ],
    lastWorkspace: '9VxN5dbt8',
  };
  const adapter = new LocalStorage<AppDB>('nexusbase', { defaultValue });
  return low(adapter);

};

export const workspaceDb = (WorkspaceId: string) => {
  const defaultValue = {
    workspace: {
      id: '9VxN5dbt8',
      name: 'My Workspace',
      kl: 'yrut',
    },
  };
  const adapter = new LocalStorage<WorkspaceDB>(WorkspaceId, { defaultValue });
  return  low(adapter);

};
