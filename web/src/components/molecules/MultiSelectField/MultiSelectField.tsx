import React, { FC } from 'react';
import Select from 'react-select';
import { IFieldComponent } from '../../../types/components';
import { IMultiSelectField, IDropDownFieldChoice } from '../../../types/database';
import Label from '../../atoms/Label';

interface CIMultiSelectField extends IFieldComponent {
  field: IMultiSelectField;
}

const MultiSelectField: FC<CIMultiSelectField> = ({
  field,
  record,
  edit,
  style,
  onFocus,
  onBlur,
  update
}) => {
  const data = record.fields[field.id];
  const selected = data || [];
  const initialOptions = field.options.choices.filter((option: IDropDownFieldChoice) => selected.includes(option.value));
  
  const onChange = (selectedOptions: any) => {
    const value = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    update(value);
  }

  if (!edit) {
    return (
      <div style={{ display: 'flex' }}>
        {initialOptions.map((choice, index:number) =>
          <Label key={index}>
            {choice.label}
          </Label>
        )}
      </div>
    )
  }

  return (
    <div style={style}>
      <Select
        isMulti
        value={initialOptions}
        options={field.options.choices}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  )
}

export default MultiSelectField;
