import { Formik } from 'formik';
import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { getCollection } from '../../store/slices/collections';
import routes from '../../utils/routes';
import BreadCrumbs from '../Breadcrumbs';
import TextInput from '../inputs/TextInput';

type FormData = {
  name: string;
};

const CollectionForm: FC<{
  initialValues: FormData;
  onSubmit: (values: FormData) => void;
}> = ({ initialValues, onSubmit }) => (
  <Formik initialValues={initialValues} onSubmit={onSubmit}>
    {({ isSubmitting }) => (
      <div>
        <TextInput name="name" />
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </div>
    )}
  </Formik>
);

const EditCollection: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { collection } = useAppSelector(({ collections }) => ({
    collection: collections.data.collection,
  }));

  useEffect(() => {
    dispatch(getCollection(id, () => {}));
  }, [dispatch, id]);

  if (!collection) {
    return <div>Loading....</div>;
  }

  const handleSubmit = (values: FormData) => {
    console.log(values);
  };

  return (
    <div>
      <BreadCrumbs
        data={[
          {
            text: collection.name,
            url: routes.collections.read(collection.id),
          },
          { text: 'edit' },
        ]}
      />
      <h3>Edit collection</h3>
      <hr />
      Delete
      <hr />
      <CollectionForm
        initialValues={{ name: collection.name }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditCollection;
