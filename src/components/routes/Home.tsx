import React, { FC, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import {
  createCollection,
  getCollections,
} from '../../store/slices/collections';
import { getWorkspace } from '../../store/slices/workspaces';
import routes from '../../utils/routes';
import BreadCrumbs from '../Breadcrumbs';

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { workspace, collections, newId, isCreating } = useAppSelector(
    ({ workspaces, collections }) => ({
      workspace: workspaces.data.workspace,
      collections: collections.data.collections,
      newId: collections.data.newId,
      isCreating: collections.loading.isCreating,
    })
  );

  useEffect(() => {
    dispatch(getWorkspace(() => {}));
    dispatch(getCollections(() => {}));
  }, [dispatch]);

  useEffect(() => {
    if (newId) {
      history.push(routes.collections.read(newId));
    }
  }, [history, newId]);

  const handleCreateCollection = () => {
    dispatch(createCollection(() => alert('error creating collection')));
  };

  if (!workspace || !collections) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <BreadCrumbs />
      <h2>{workspace.name}</h2>
      <hr />
      <button onClick={handleCreateCollection}>
        Create collection {isCreating ? '(loading)' : ''}
      </button>
      <hr />
      <ul>
        {collections.map((collection) => (
          <li key={collection.id}>
            <Link to={routes.collections.read(collection.id)}>
              - {collection.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
