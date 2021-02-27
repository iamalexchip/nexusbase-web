import React, { FC, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IRootStore from '../../types/store/root';
import { IViewModel, IViewTypes } from '../../types/database';
import { getWorkspace, clearWorkspace } from '../../actions/workspaces';
import { getCollection, clearCollection } from '../../actions/collections';
import { getRecords, clearRecords, clearRecord } from '../../actions/records';
import { clearView, clearViews, getView } from '../../actions/views';
import routes from '../../config/routes';
import url from '../../utils/url';
import { Link, useParams, Redirect } from 'react-router-dom';
import ListView from '../organisms/ListView';
import BrowseRecordsTemplate from '../templates/BrowseRecordsTemplate';

const ReadCollectionPage: FC = () => {
  const dispatch = useDispatch();
  const { collectionId, viewId } = useParams();
  const [collectionFetched, setCollectionFetched] = useState(false);
  const [recordsFetched, setRecordsFetched] = useState(false);
  const {
    workspace,
    collection,
    records, record,
    isCreating,
    recordsSynced,
    isNew,
    view
  } = useSelector(({
    workspaces: { workspace },
    collections: { collection },
    records: { records, record, isCreating, recordsSynced, isNew },
    views: { views, view }
  }: IRootStore) => ({
    workspace,
    collection,
    records,
    record,
    isCreating,
    recordsSynced,
    isNew,
    view,
  }));

  const viewExists = useCallback(
    () => {
      if (collection) {
        const view = collection.views.find((view: IViewModel) => view.id === viewId);
        return view ? true : false;
      }

      return false;
    },
    [viewId, collection]
  );
  
  useEffect(() => {
    if (!collectionFetched) {
      setCollectionFetched(true);
      dispatch(getCollection(collectionId));
    }

    if (collection && !workspace) {
      dispatch(getWorkspace(collection.workspaceId));
    }

    if (collection && !recordsFetched) {
      setRecordsFetched(true);
      dispatch(getRecords(collection.id));
    }
    if (collection && viewExists() && !view) {
      dispatch(getView(viewId));
    }
  }, [
    dispatch,
    collectionId,
    collectionFetched,
    recordsFetched,
    workspace,
    collection,
    records,
    record,
    isCreating,
    isNew,
    viewId,
    view,
    viewExists
  ]);

  useEffect(() => {
    if (collection && !recordsSynced) {
      dispatch(getRecords(collection.id));
    }
  }, [dispatch, collection, recordsSynced]);

  useEffect(() => {
    return () => {
      dispatch(clearWorkspace());
      dispatch(clearCollection());
      dispatch(clearRecords());
      dispatch(clearRecord());
      dispatch(clearViews());
      dispatch(clearView());
    }
  }, [dispatch]);
  
  if (!workspace || !collection) {
    return <div>Loading ReadCollectionPage....</div>
  }

  if (!viewExists()) {
    return <Redirect to={url(routes.collections.read, {
      collectionId: collection.id,
      viewId: collection.defaultView
    })} />
  }

  const selectedView = () => {
    if (!view) {
      return <div>Loading view....</div>
    }

    switch (view.type) {
      case IViewTypes.list: {
        return <ListView view={view} />
      }
      
      default: {
        return <p style={{ color: 'red' }}>Unknown view type: {view.type}</p>
      }
    }
  }
  
  return (
    <BrowseRecordsTemplate
      breadcrumbs={
        <>        
          <Link to={routes.home}>Workspaces</Link> >&nbsp;
          <Link to={url(routes.workspaces.read, { workspaceId: workspace.id })}>{workspace.name}</Link>
        </>
      }
      header={collection.name}
      view={view}
    >
      {selectedView()}
    </BrowseRecordsTemplate>
  )
};

export default ReadCollectionPage;
