export type Workspace = {
  id: string;
  name: string;
};

export type WorkspacesState = {
  workspaces: Workspace[] | null;
  workspace: Workspace | null;
};
