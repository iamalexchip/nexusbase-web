import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { getCollection } from '../../store/slices/collections';
import { getViews } from '../../store/slices/views';
import routes from '../../utils/routes';
import BreadCrumbs from '../Breadcrumbs';
import ViewFactory from '../factories/ViewFactory';
import ViewSwitcher from '../ViewSwitcher';

const ViewCollection: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { collection, views } = useAppSelector(({ collections, views }) => ({
    collection: collections.data.collection,
    views: views.data.views,
  }));
  const [viewId, setViewId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getCollection(id, () => {}));
    dispatch(getViews(id, () => {}));
  }, [dispatch, id]);

  useEffect(() => {
    if (!viewId && views) {
      setViewId(views[0].id);
    }
  }, [viewId, views]);

  if (!collection) {
    return <div>Loading....</div>;
  }

  const selectedView = views?.find((view) => view.id === viewId);

  return (
    <div>
      <BreadCrumbs data={[{ text: collection.name }]} />
      <h2>{collection.name}</h2>
      <hr />
      <Link to={routes.collections.edit(collection.id)}>Edit</Link>
      {viewId ? (
        <ViewSwitcher defaultValue={viewId} onChange={(id) => setViewId(id)} />
      ) : (
        <p>loading views</p>
      )}
      <hr />
      {selectedView ? <ViewFactory view={selectedView} /> : <p>loading view</p>}
    </div>
  );
};

export default ViewCollection;
