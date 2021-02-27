import React, { FC } from 'react';

interface CITextInput {
  style?: any;
  onFocus?: any;
  onBlur?: any;
  onChange?: any;
  defaultValue?: string;
  value?: string;
}

const TextInput: FC<CITextInput> = ({
  style,
  onFocus,
  onBlur,
  onChange,
  value,
  defaultValue
}) => {
  return (
    <input
      type="text"
      value={value}
      style={style}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}

export default TextInput;
