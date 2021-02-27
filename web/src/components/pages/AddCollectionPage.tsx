import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RootStore from '../../types/store/root';
import { createCollection } from '../../actions/collections';
import { Link, useHistory, useParams } from 'react-router-dom';
import routes from '../../config/routes';
import url from '../../utils/url';
import { getWorkspace, clearWorkspace } from '../../actions/workspaces';
import { clearCollection } from '../../actions/collections';

const AddCollectionPage: FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const { workspaceId } = useParams();
  const { workspace, collection, isCreating } = useSelector(({
    workspaces: { workspace },
    collections: { collection, isCreating }
  }: RootStore) => ({ workspace, collection, isCreating }));

  useEffect(() => {
    if (!workspace) {
      dispatch(getWorkspace(workspaceId));
    }
  }, [dispatch, workspace, workspaceId]);

  useEffect(() => {
    if (workspace && collection) {
      history.push(url(routes.collections.read, {
        workspaceId: workspace.id, 
        collectionId: collection.id 
      }));
    }
  }, [history, workspace, collection]);

  useEffect(() => {
    return () => {
      dispatch(clearWorkspace());
      dispatch(clearCollection());
    }
  }, [dispatch]);
  
  const submitCollection = () => {
    if (name === '') {
      setErrorMessage('Enter a collection name');
      return;
    }

    dispatch(createCollection({ name, workspaceId }));
  };

  const onNameChange = (e:any) => {
    setName(e.target.value);
    setErrorMessage('');
  }

  if (!workspace) {
    return <div>Loading AddCollectionPage....</div>
  }

  return (
    <div>
      <div className="header-link">
        <Link to={routes.home}>Workspaces</Link> >
        <Link to={url(routes.workspaces.read, { workspaceId: workspace.id })}>{workspace.name}</Link>
      </div>
      <h1>Create collection</h1>
      <hr />
      <div>
        <span>Name</span>
        <input
          type="text"
          value={name}
          onChange={onNameChange}
        />
      </div>
      <div style={{ color: 'red' }}>{errorMessage}</div>
      <button
        disabled={isCreating}
        onClick={submitCollection}
      >Create collection</button>
    </div>
  )
};

export default AddCollectionPage;
