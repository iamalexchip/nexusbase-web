import React, { FC } from 'react';
import Select from 'react-select';
import { IFieldComponent } from '../../../types/components';
import { IDropDownField, IDropDownFieldChoice } from '../../../types/database';

interface CIDropdownField extends IFieldComponent {
  field: IDropDownField;
}

const DropdownField: FC<CIDropdownField> = ({
  field,
  record,
  edit,
  style,
  onFocus,
  onBlur,
  update
}) => {
  const data = record.fields[field.id];
  const initialOption = field.options.choices.find((option: IDropDownFieldChoice) => option.value === data);
  
  if (!edit) {
    return <div>{initialOption ? initialOption.label : ''}</div>;
  }
  
  const onChange = (selectedOption: any) => {
    update(selectedOption.value);
  };
  
  return (
    <div style={style}>
      <Select
        value={initialOption}
        options={field.options.choices}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  )
}

export default DropdownField;
