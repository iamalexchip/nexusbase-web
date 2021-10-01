import React, { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { getCollection } from '../../store/slices/collections';
import routes from '../../utils/routes';
import BreadCrumbs from '../Breadcrumbs';

const ViewCollection: FC = () => {
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
      <BreadCrumbs data={[{ text: collection.name }]} />
      <h2>{collection.name}</h2>
      <hr />
      <Link to={routes.collections.edit(collection.id)}>Edit</Link>
      <hr />
    </div>
  );
};

export default ViewCollection;
