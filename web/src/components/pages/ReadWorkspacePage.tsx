import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IRootStore from '../../types/store/root';
import { ICollectionModel } from '../../types/database';
import { getWorkspace, clearWorkspace } from '../../actions/workspaces';
import { getCollections, clearCollections } from '../../actions/collections';
import { Link, useParams } from 'react-router-dom';
import routes from '../../config/routes';
import url from '../../utils/url';

const ReadWorkspacePage: FC = () => {
  const dispatch = useDispatch();
  const { workspaceId } = useParams();
  const [collectionsFetched, setCollectionsFetched] = useState(false);
  const { workspace, collections } = useSelector(({
    workspaces: { workspace },
    collections: { collections }
  }: IRootStore) => ({ workspace, collections }));

  useEffect(() => {
    if (!workspace) {
      dispatch(getWorkspace(workspaceId));
    }
    if (workspace && !collectionsFetched) {
      setCollectionsFetched(true);
      dispatch(getCollections(workspace.id));
    }
  },[dispatch, workspaceId, workspace, collections, collectionsFetched]);

  useEffect(() => {
    return () => {
      dispatch(clearWorkspace());
      dispatch(clearCollections());
    }
  }, [dispatch]);
  
  if (!workspace) {
    return <div>Loading ReadWorkspacePage...</div>
  }

  return (
    <div>
      <div className="header-link"><Link to={routes.home}>Workspaces</Link></div>
      <h1>{workspace.name}</h1>
      <hr />
      <div className="header-link"><Link to={url(routes.collections.add, { workspaceId: workspace.id })}>Create</Link></div>
      <ul>
        {collections.map((collection: ICollectionModel) =>
          <li key={collection.id}>
            <Link to={url(routes.collections.read, { collectionId: collection.id, })}>{collection.name}</Link>
          </li>
        )}
      </ul>
    </div>
  )
};

export default ReadWorkspacePage;
