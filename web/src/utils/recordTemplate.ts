import { IRecordModel, ICollectionField } from "../types/database";
import fieldsData from '../config/fields';

const stringFields = fieldsData.filter((field) => field.source === 'string');
const arrayFields = fieldsData.filter((field) => field.source === 'array');

/**
 * Is used to make sure that when a record is passed to the form no fields are missing
 */
const recordTemplate = (template: ICollectionField[], data: any): IRecordModel => {
  let record = { ...data };
  
  for (const field of template) {
    if (!data.fields.hasOwnProperty(field.id)) {
      if (stringFields.find((fieldData) => fieldData.name === field.type)) {
        record.fields[field.id] = "";
      }
      
      if (arrayFields.find((fieldData) => fieldData.name === field.type)) {
        record.fields[field.id] = [];
      }
    }
  }

  return record;
}

export default recordTemplate;
