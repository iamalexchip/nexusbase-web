export type PropertyName =
  | 'line'
  | 'checkbox'
  | 'date'
  | 'createdAt'
  | 'updatedAt'
  | 'relation';

export type Property = {
  id: string;
  type: PropertyName;
  label: string;
  options?: any;
};

export type Collection = {
  id: string;
  name: string;
  description: string | null;
  properties: Property[];
  titleProperty: string;
  defaultView: string;
  createdAt: number;
  updatedAt: number;
};

export type CollectionsData = {
  collections: Collection[] | null;
  collection: Collection | null;
  newId: string | null;
  isSynced: boolean;
  editProperty: { colId: string; propId: string } | null;
};
