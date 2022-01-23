import React, { FC } from 'react';
import { Formik } from 'formik';
import TextInput from '../inputs/TextInput';
import SingleSelect from '../inputs/SingleSelect';
import { SelectOption } from '../../interfaces';
import { Property } from '../../interfaces/store/collections';
import { propertiesDescriptions } from '../../constants/properties';

const EditPropertyForm: FC<{
  initialValues: Property;
  onSubmit: (values: Property) => void;
  isLoading: boolean;
}> = ({ initialValues, onSubmit, isLoading }) => {
  const propertyOptions: SelectOption[] = propertiesDescriptions.map(
    (description) => ({ value: description.name, label: description.label })
  );

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ submitForm }) => {
        return (
          <div>
            <TextInput name="label" />
            <SingleSelect name="type" options={propertyOptions} />
            <button type="submit" disabled={isLoading} onClick={submitForm}>
              Submit
            </button>
          </div>
        );
      }}
    </Formik>
  );
};

export default EditPropertyForm;
