import { Formik } from 'formik';
import { FC } from 'react';
import { Options } from 'react-select';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { SelectOption } from '../interfaces';
import { setSelectedId } from '../store/slices/views';
import SingleSelect from './inputs/SingleSelect';

export type iFormData = {
  viewId: string;
};

const ViewSwitcher: FC = () => {
  const dispatch = useAppDispatch();
  const { views } = useAppSelector(({ views }) => ({
    views: views.data.views,
  }));

  const options: Options<SelectOption> = views
    ? views.map((view) => ({ value: view.id, label: view.name || 'untitled' }))
    : [];

  function handleSubmit(values: iFormData) {
    dispatch(setSelectedId(values.viewId));
  }

  return (
    <Formik
      initialValues={{ viewId: options[0].value }}
      onSubmit={handleSubmit}
      change
    >
      {({ submitForm }) => {
        return (
          <SingleSelect
            isLoading={!views}
            name="viewId"
            options={options}
            onChange={submitForm}
          />
        );
      }}
    </Formik>
  );
};

export default ViewSwitcher;
