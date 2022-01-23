import { useField } from 'formik';
import { FC } from 'react';
import Select, { Options, SingleValue } from 'react-select';
import { SelectOption } from '../../interfaces';

type Props = {
  name: string;
  options: Options<SelectOption>;
  defaultValue?: string | undefined;
  isLoading?: boolean;
  onChange?: (nextValue: string) => void;
};

const SingleSelect: FC<Props> = ({
  isLoading = false,
  name,
  options,
  onChange = () => {},
}) => {
  const [field, , { setValue }] = useField(name);
  const selectedOption = options.find(({ value }) => value === field.value);
  const onDropdownChange = (newOption: SingleValue<SelectOption>) => {
    if (!newOption) return;
    setValue(newOption.value);
    onChange(newOption.value);
  };

  return (
    <Select
      isLoading={isLoading}
      value={selectedOption}
      options={options}
      onChange={onDropdownChange}
    />
  );
};

export default SingleSelect;
