import { useField } from 'formik';
import React, { FC } from 'react';
import Select, { Options } from 'react-select';
import { SelectOption } from '../../interfaces';

type Props = {
  isLoading: boolean;
  name: string;
  options: Options<SelectOption>;
  defaultValue: string | undefined;
  onChange: (id: string) => void;
};

const SingleSelect: FC<Props> = ({
  isLoading,
  name,
  options,
  defaultValue,
  onChange,
}) => {
  const [, , { setValue }] = useField(name);
  const selectedOption = options.find(({ value }) => value === defaultValue);

  return (
    <Select
      isLoading={isLoading}
      value={selectedOption}
      options={options}
      onChange={(newOption) => newOption && setValue(newOption.value)}
    />
  );
};

export default SingleSelect;
