import { FC, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { getCollection } from '../../store/slices/collections';
import { getViews, setSelectedId } from '../../store/slices/views';
import BreadCrumbs from '../Breadcrumbs';
import ViewFactory from '../factories/ViewFactory';
import ViewNav from '../views/ViewNav';

const ViewCollection: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const {
    collection,
    views,
    viewId,
    collectionsSynced,
    viewsSynced,
  } = useAppSelector(({ collections, views }) => ({
    collection: collections.data.collection,
    collectionsSynced: collections.data.isSynced,
    views: views.data.views,
    viewId: views.data.selectedId,
    viewsSynced: views.data.isSynced,
  }));

  const fetchCollection = useCallback(() => {
    dispatch(getCollection(id, () => {}));
  }, [dispatch, id]);

  const fetchViews = useCallback(() => {
    dispatch(getViews(id, () => {}));
  }, [dispatch, id]);

  useEffect(() => {
    fetchCollection();
    fetchViews();
  }, [fetchCollection, fetchViews]);

  useEffect(() => {
    if (!viewId && views) {
      dispatch(setSelectedId(views[0].id));
    }
  }, [dispatch, views, viewId]);

  useEffect(() => {
    if (!collectionsSynced) fetchCollection();
    if (!viewsSynced) fetchViews();
  }, [collectionsSynced, fetchCollection, fetchViews, viewsSynced]);

  if (!collection) {
    return <div>Loading....</div>;
  }

  const selectedView = views?.find((view) => view.id === viewId);

  return (
    <div>
      <BreadCrumbs data={[{ text: collection.name }]} />
      <h2>{collection.name}</h2>
      <ViewNav />
      {selectedView ? <ViewFactory view={selectedView} /> : <p>loading view</p>}
    </div>
  );
};

export default ViewCollection;
