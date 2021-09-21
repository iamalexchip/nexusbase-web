import { AttributeSpecs } from '../interfaces/attributes';

export const line: AttributeSpecs = {
  icon: 'text',
  label: 'Line',
  dataType: 'string',
};

export const checkbox: AttributeSpecs = {
  icon: 'checkmark-square',
  label: 'Checkbox',
  dataType: 'boolean',
};
export const date: AttributeSpecs = {
  icon: 'clock',
  label: 'Date',
  dataType: 'date',
};
export const createdAt: AttributeSpecs = {
  icon: 'clock',
  label: 'Create time',
  dataType: 'date',
};
export const updatedAt: AttributeSpecs = {
  icon: 'clock',
  label: 'Last modified time',
  dataType: 'date',
};
