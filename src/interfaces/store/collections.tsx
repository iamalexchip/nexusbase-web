export type AttributeType =
  | 'line'
  | 'checkbox'
  | 'date'
  | 'createdAt'
  | 'updatedAt'
  | 'relation';

export type Attribute = {
  id: string;
  type: AttributeType;
  label: string;
  options?: any;
};

export type Collection = {
  id: string;
  name: string;
  description: string | null;
  attributes: Attribute[];
  titleAttribute: string;
  defaultView: string;
  createdAt: number;
  updatedAt: number;
};

export type CollectionsData = {
  collections: Collection[] | null;
  collection: Collection | null;
  newId: string | null;
  isSynced: boolean;
  editAttribute: { colId: string; attrId: string } | null;
};
