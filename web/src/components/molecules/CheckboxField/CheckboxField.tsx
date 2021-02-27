import React, { FC } from 'react';
import { ICheckboxField } from '../../../types/database';
import { IFieldComponent } from '../../../types/components';
import { FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';

interface CICheckboxField extends IFieldComponent {
  field: ICheckboxField;
}

const CheckboxField: FC<CICheckboxField> = ({
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
    return (
      <>
        {data ?
        <FaRegCheckSquare />
        :
        <FaRegSquare />
        }
      </>
    )
  }
  
  const onChange = (e: any) => {
    update(e.target.checked);
  }

  return (
    <input
      type="checkbox"
      checked={data ? true : false}
      style={style}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}

export default CheckboxField;
