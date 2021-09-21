export type ViewOptions = {
  groupBy?: null;
};

export type ViewTypes = 'list';

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
