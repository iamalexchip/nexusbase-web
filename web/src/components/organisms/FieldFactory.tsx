import React from 'react';
import Caution from '../atoms/Caution/Caution';
import LineField from '../molecules/LineField';
import DropdownField from '../molecules/DropdownField';
import RelationField from '../molecules/RelationField';
import NumberField from '../molecules/NumberField';
import EmailField from '../molecules/EmailField';
import UrlField from '../molecules/UrlField';
import MultiSelectField from '../molecules/MultiSelectField';
import CreatedAt from '../molecules/CreatedAt'
import UpdatedAt from '../molecules/UpdatedAt'
import Checkbox from '../molecules/CheckboxField'
import LongText from '../molecules/LongText';
import DateField from '../molecules/DateField';

const FieldFactory = (props: any) => {
  switch (props.field.type) {
    case 'line':
      return <LineField { ...props } />;
    case 'dropdown':
      return <DropdownField { ...props } />;
    case 'relation':
      return <RelationField { ...props } />;
    case 'number':
      return <NumberField { ...props } />;
    case 'email':
      return <EmailField { ...props } />;
    case 'url':
      return <UrlField { ...props } />;
    case 'multiSelect':
      return <MultiSelectField { ...props } />;
    case 'createdAt':
      return <CreatedAt { ...props } />;
    case 'updatedAt':
      return <UpdatedAt { ...props } />;
    case 'checkbox':
      return <Checkbox { ...props } />;
    case 'longText':
      return <LongText { ...props } />;
    case 'date':
      return <DateField { ...props } />;
    default:
      return (
        <Caution
          details={`Unknown field type: ${props.field.type}`}
          text={props.edit ? 'Field type error' : ''}
        />
      );
  }
}

export default FieldFactory;
