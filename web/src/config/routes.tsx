import React from 'react';
import HomePage from '../components/pages/HomePage';
import ReadWorkspacePage from '../components/pages/ReadWorkspacePage';
import AddWorkspacePage from '../components/pages/AddWorkspacePage'
import ReadCollectionPage from '../components/pages/ReadCollectionPage';
import AddCollectionPage from '../components/pages/AddCollectionPage';

const routes = {
  home: '/',
  workspaces: {
    read: '/w/:workspaceId',
    edit: '/edit/w/:workspaceId',
    add: '/create-workspace',
  },
  collections: {
    read: '/c/:collectionId/v/:viewId',
    edit: '/c/:collectionId/edit',
    add: '/w/:workspaceId/create-collection',
  },
  records: {
    read: '/w/:workspaceId/c/:collectionId/r/:recordId',
  }
};

export const appRoutes = [
  {
    path: routes.home,
    exact: true,
    web: true,
    desktop: true,
    main: () => <HomePage />,
  },
  // Workspaces
  {
    path: routes.workspaces.read,
    exact: true,
    web: true,
    desktop: true,
    main: () => <ReadWorkspacePage />
  },
  {
    path: routes.workspaces.add,
    exact: true,
    web: true,
    desktop: true,
    main: () => <AddWorkspacePage />
  },
  // Collections
  {
    path: routes.collections.read,
    exact: true,
    web: true,
    desktop: true,
    main: () => <ReadCollectionPage />
  },
  {
    path: routes.collections.add,
    exact: true,
    web: true,
    desktop: true,
    main: () => <AddCollectionPage />
  },
  // Records
];

export default routes;
