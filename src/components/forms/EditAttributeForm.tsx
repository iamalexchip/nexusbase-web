import React, { FC } from 'react';
import { Formik } from 'formik';
import TextInput from '../inputs/TextInput';
import { Attribute } from '../../interfaces/store/collections';

const EditAttributeForm: FC<{
  initialValues: Attribute;
  onSubmit: (values: Attribute) => void;
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
