import React, { FC } from 'react';
import { ILongTextField } from '../../../types/database';
import { IFieldComponent } from '../../../types/components';

interface CILongTextField extends IFieldComponent {
  field: ILongTextField;
}

const LongText: FC<CILongTextField> = ({
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
    <textarea
      value={data}
      style={style}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}

export default LongText;
