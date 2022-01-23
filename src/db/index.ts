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

export const workspaceDb = (WorkspaceId: string = 'dev') => {
  const defaultValue: WorkspaceDB = {
    workspace: {
      id: '9VxN5dbt8',
      name: 'Demo workspace',
    },
    collections: [
      {
        id: 'cdcae1641964638665',
        name: 'Untitled Collection',
        description: null,
        properties: [
          {
            id: 'f1',
            type: 'line',
            label: 'Title',
          },
          {
            id: 'f2',
            type: 'line',
            label: 'Description',
          },
        ],
        titleProperty: 'f1',
        defaultView: 'vaptv1641964638778',
        createdAt: 1641964638666,
        updatedAt: 1641964638666,
      },
    ],
    views: [
      {
        id: 'vaptv1641964638665',
        collectionId: 'cdcae1641964638665',
        name: '',
        viewType: 'table',
        properties: ['f1'],
        options: {},
        createdAt: 1641964638665,
        updatedAt: 1641964638665,
      },
      {
        id: 'vaptv1641964638778',
        collectionId: 'cdcae1641964638665',
        name: 'view2',
        viewType: 'table',
        properties: ['f1', 'f2'],
        options: {},
        createdAt: 1641964638665,
        updatedAt: 1641964638665,
      },
    ],
  };
  const adapter = new LocalStorage<WorkspaceDB>(WorkspaceId, { defaultValue });

  return low(adapter);
};
