import React, { FC } from 'react';
import { ILineField } from '../../../types/database';
import { IFieldComponent } from '../../../types/components';

interface CILineField extends IFieldComponent {
  field: ILineField;
}

const LineField: FC<CILineField> = ({
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
      type="text"
      value={data || ''}
      style={style}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}

export default LineField;
