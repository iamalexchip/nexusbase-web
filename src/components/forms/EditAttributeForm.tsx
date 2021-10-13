import React, { FC } from 'react';
import { Formik } from 'formik';
import TextInput from '../inputs/TextInput';

export type iFormData = {
  label: string;
};

const EditAttributeForm: FC<{
  initialValues: iFormData;
  onSubmit: (values: iFormData) => void;
  isLoading: boolean;
}> = ({ initialValues, onSubmit, isLoading }) => (
  <Formik initialValues={initialValues} onSubmit={onSubmit}>
    {({ submitForm }) => {
      return (
        <div>
          <TextInput name="label" />
          <button type="submit" disabled={isLoading} onClick={submitForm}>
            Submit
          </button>
        </div>
      );
    }}
  </Formik>
);

export default EditAttributeForm;
