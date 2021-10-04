export type ViewOptions = {
  groupBy?: null;
};

export type ViewTypes = 'list' | 'table';

export type View = {
  id: string;
  collectionId: string;
  name: string;
  type: ViewTypes;
  attributes: string[];
  options: ViewOptions;
  createdAt: number;
  updatedAt: number;
};

export type ViewsData = {
  views: View[] | null;
  view: View | null;
  newId: string | null;
};
