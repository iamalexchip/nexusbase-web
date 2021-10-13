import React, { FC, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import {
  deleteCollection,
  getCollection,
  updateCollectionDetails,
} from '../../store/slices/collections';
import routes from '../../utils/routes';
import BreadCrumbs from '../Breadcrumbs';
import CollectionForm, { iFormData } from '../forms/CollectionForm';

const EditCollection: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [hasDeleted, setHasDeleted] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { collection, isUpdating, isDeleting } = useAppSelector(
    ({ collections }) => ({
      collection: collections.data.collection,
      isUpdating: collections.loading.isUpdating,
      isDeleting: collections.loading.isDeleting,
    })
  );

  useEffect(() => {
    dispatch(getCollection(id, () => {}));
  }, [dispatch, id]);

  useEffect(() => {
    if (hasDeleted && !collection) {
      history.push(routes.home());
      //todo: toast deleted
    }
  }, [history, hasDeleted, collection]);

  if (!collection) {
    return <div>Loading....</div>;
  }

  const handleSubmit = (values: iFormData) => {
    dispatch(updateCollectionDetails(id, values, () => {}));
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete?');
    if (confirmDelete) {
      dispatch(deleteCollection(id, () => {}));
      setHasDeleted(true);
    }
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
      <button type="submit" disabled={isDeleting} onClick={handleDelete}>
        Delete
      </button>
      <hr />
      <CollectionForm
        initialValues={{ name: collection.name }}
        onSubmit={handleSubmit}
        isLoading={isUpdating}
      />
    </div>
  );
};

export default EditCollection;
