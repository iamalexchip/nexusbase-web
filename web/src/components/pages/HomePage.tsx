import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RootStore from '../../types/store/root';
import { getWorkspaces, clearWorkspaces } from '../../actions/workspaces';
import { IWorkspaceModel } from '../../types/database';
import { Link } from 'react-router-dom';
import routes from '../../config/routes';
import url from '../../utils/url';

const HomepPage: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkspaces());

    return () => {
      dispatch(clearWorkspaces());
    }
  }, [dispatch]);

  const workspaces = useSelector((state: RootStore) => state.workspaces.workspaces);

  return (
    <div>
      <h1>Workspaces</h1>
      <div className="header-link"><Link to={routes.workspaces.add}>Create</Link></div>
      <ul>
        {workspaces.map((workspace: IWorkspaceModel) =>
          <li key={workspace.id}>
            <Link to={url(routes.workspaces.read, { workspaceId: workspace.id })}>{workspace.name}</Link>
          </li>
        )}
      </ul>
    </div>
  )
};

export default HomepPage;
