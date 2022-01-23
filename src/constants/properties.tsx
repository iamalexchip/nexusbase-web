import { PropertyDescription } from '../interfaces/properties';

export const propertiesDescriptions: PropertyDescription[] = [
  {
    name: 'line',
    icon: 'text',
    label: 'Line',
    dataType: 'string',
  },
  {
    name: 'check',
    icon: 'checkmark-square',
    label: 'Checkbox',
    dataType: 'boolean',
  },
  {
    name: 'datetime',
    icon: 'clock',
    label: 'Date',
    dataType: 'date',
  },
  {
    name: 'created',
    icon: 'clock',
    label: 'Create time',
    dataType: 'date',
  },
  {
    name: 'modified',
    icon: 'clock',
    label: 'Last modified time',
    dataType: 'date',
  },
];
