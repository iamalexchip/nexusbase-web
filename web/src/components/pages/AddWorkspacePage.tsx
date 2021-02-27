import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RootStore from '../../types/store/root';
import { createWorkspace } from '../../actions/workspaces';
import { Link, useHistory } from 'react-router-dom';
import routes from '../../config/routes';
import url from '../../utils/url';

const AddWorkspacePage: FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { isCreating, workspace } = useSelector((state: RootStore) => state.workspaces);
  const history = useHistory();

  useEffect(() => {
    if (workspace) {
      history.push(url(routes.workspaces.read, { workspaceId: workspace.id }));
    }
  }, [history, workspace]);
  
  const submitWorkspace = () => {
    if (name === '') {
      setErrorMessage('Enter a workspace name');
      return;
    }

    dispatch(createWorkspace({ name }));
  };

  const onNameChange = (e:any) => {
    setName(e.target.value);
    setErrorMessage('');
  }

  return (
    <div>
      <h1>Create workspace</h1>
      <div className="header-link"><Link to="/">Back</Link></div>
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
        onClick={submitWorkspace}
      >Create workspace</button>
    </div>
  )
};

export default AddWorkspacePage;
