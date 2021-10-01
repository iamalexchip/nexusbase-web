const routes = {
  home: () => '/',
  workspaces: {
    read: (id: string) => `/w/:${id}`,
    edit: (id: string) => `/edit/w/${id}`,
    add: () => '/create-workspace',
  },
  collections: {
    read: (collectionId: string, viewId?: string) => {
      let url = `/c/${collectionId}`;
      if (viewId) {
        url += `/v/${viewId}`;
      }

      return url;
    },
    edit: (id: string) => `/c/${id}/edit`,
  },
  items: {
    read: '/c/:collectionId/r/:itemId',
  },
};

export default routes;
