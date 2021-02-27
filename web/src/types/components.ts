import { ICollectionField, IRecordModel } from "./database";

export interface IFieldComponent {
  field: ICollectionField;
  record: IRecordModel;
  edit: boolean;
  style: any;
  onFocus: any;
  onBlur: any;
  update: any;
}
