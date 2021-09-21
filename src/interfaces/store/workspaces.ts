export type Workspace = {
  id: string;
  name: string;
};

export type WorkspacesLoading = {
  workspaces: Workspace;
  workspace: Workspace | null;
};

export type WorkspacesData = {
  workspaces: Workspace[] | null;
  workspace: Workspace | null;
};
