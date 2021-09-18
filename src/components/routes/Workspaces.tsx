import { getWorkspaces } from '../../store/slices/workspaces';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import React, { FC, useEffect } from 'react';

export const Workspaces: FC = () => {
  const dispatch = useAppDispatch();
  const workspaces = useAppSelector(
    (store) => store.workspaces.data.workspaces
  );

  useEffect(() => {
    dispatch(getWorkspaces(() => {}));
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center">
      <h2>Workspaces</h2>
      {workspaces ? (
        <div>
          {workspaces.map((workspace) => (
            <li key={workspace.id}>{workspace.name}</li>
          ))}
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
};

export default Workspaces;
