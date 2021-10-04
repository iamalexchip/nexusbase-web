import React, { FC } from 'react';
import Select, { Options } from 'react-select';
import { useAppSelector } from '../hooks/storeHooks';
import { SelectOption } from '../interfaces';

type Props = {
  defaultValue: string;
  onChange: (id: string) => void;
};

const ViewSwitcher: FC<Props> = ({ defaultValue, onChange }) => {
  const { views } = useAppSelector(({ views }) => ({
    views: views.data.views,
  }));

  const options: Options<SelectOption> = views
    ? views.map((view) => ({ value: view.id, label: view.name || 'untitled' }))
    : [];
  const selectedOption = options.find(({ value }) => value === defaultValue);

  return (
    <Select
      isLoading={!views}
      value={selectedOption}
      options={options}
      onChange={(newOption) => newOption && onChange(newOption.value)}
    />
  );
};

export default ViewSwitcher;
