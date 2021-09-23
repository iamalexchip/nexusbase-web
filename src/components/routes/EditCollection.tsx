import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { getCollection } from '../../store/slices/collections';
import routes from '../../utils/routes';
import BreadCrumbs from '../Breadcrumbs';

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
    </div>
  );
};

export default EditCollection;
