
export interface IWorkspaceModel {
  id: string;
  name: string;
}

export interface IMainDB {
  workspaces: IWorkspaceModel[],
}

export enum IViewTypes {
  list = 'list',
  table = 'table'
}

export enum IFieldTypes {
  line = 'line'
}

export interface IDropDownFieldChoice {
  value: string;
  label: string
}

export interface ICollectionField {
  id: string;
  label: string;
  type: IFieldTypes;
  options: any;
}

export interface ILineField extends ICollectionField {
  options: null;
}

export interface INumberField extends ICollectionField {
  options: null;
}

export interface IEmailField extends ICollectionField {
  options: null;
}

export interface ILongTextField extends ICollectionField {
  options: null;
}

export interface IDateField extends ICollectionField {
  options: null;
}

export interface IDropDownField extends ICollectionField {
  options: {
    choices: IDropDownFieldChoice[]
  };
}

export interface IMultiSelectField extends ICollectionField {
  options: {
    choices: IDropDownFieldChoice[]
  };
}

export interface ICheckboxField extends ICollectionField {
  options: null;
}

export interface IRelationField extends ICollectionField {
  options: {
    collectionId: string;
    fieldId: string;
  };
}

export interface ICreatedAtField extends ICollectionField {
  options: null;
}

export interface IUpdatedAtField extends ICollectionField {
  options: null;
}

export type ICollectionFields = 
  | ILineField
  | IDropDownField;

export interface IViewModel {
  id: string;
  collectionId: string;
  title: string;
  type: IViewTypes;
  fields: string[];
  options: any;
}

export interface ICollectionModel {
  id: string;
  workspaceId: string;
  name: string;
  defaultView: string;
  fields: ICollectionField[];
  titleField: string;
  views: IViewModel[];
}

export interface IRecordModel {
  id: string;
  collectionId: string;
  fields: any;
  createdAt: string;
  updatedAt: string;
}
