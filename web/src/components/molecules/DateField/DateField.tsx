import React, { FC } from 'react';
import { IDateField } from '../../../types/database';
import { IFieldComponent } from '../../../types/components';

interface CIDateField extends IFieldComponent {
  field: IDateField;
}

const DateField: FC<CIDateField> = ({
  field,
  record,
  edit,
  style,
  onFocus,
  onBlur,
  update
}) => {
  const data = record.fields[field.id];
  
  if (!edit) {
    return <div>{data}</div>;
  }
  
  const onChange = (e: any) => {
    update(e.target.value);
  }
  
  return (
    <input
      type="date"
      value={data || ''}
      style={style}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}

export default DateField;
