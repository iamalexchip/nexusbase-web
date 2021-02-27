import React, { FC } from 'react';
import { IUpdatedAtField } from '../../../types/database';
import { IFieldComponent } from '../../../types/components';

interface CIUpdatedAtField extends IFieldComponent {
  field: IUpdatedAtField;
}

const UpdatedAtField: FC<CIUpdatedAtField> = ({
  field,
  record,
  edit,
  style,
  onFocus,
  onBlur
}) => {
  const timestamp = new Date(record.updatedAt);
  const data = timestamp.toDateString();

  if (!edit) {
    return <div>{data}</div>;
  }

  return (
    <input
      type="text"
      value={data}
      style={style}
      disabled
      onChange={() => {}}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}

export default UpdatedAtField;
