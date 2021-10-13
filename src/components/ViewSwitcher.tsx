import React, { FC } from 'react';
import Select, { Options } from 'react-select';
import { useAppSelector } from '../hooks/storeHooks';
import { SelectOption } from '../interfaces';
import SingleSelect from './inputs/SingleSelect';

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
  //const selectedOption = options.find(({ value }) => value === defaultValue);

  return (
    <SingleSelect
      isLoading={!views}
      name="view"
      defaultValue={defaultValue}
      options={options}
      onChange={(newOption) => newOption && onChange(newOption)}
    />
  );
};

export default ViewSwitcher;
