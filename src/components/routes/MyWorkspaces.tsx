import { fetchWorkspaces } from '../../store/slices/workspaces';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import React, { FC, useEffect } from 'react';

export const MyWorkspaces: FC = () => {
  const dispatch = useAppDispatch();
  const workspaces = useAppSelector(
    (store) => store.workspaces.data.workspaces
  );
  console.log({ workspaces });
  useEffect(() => {
    dispatch(fetchWorkspaces(() => {}));
  }, [dispatch]);
  return (
    <div className="flex flex-col items-center">
      <h2>Workspaces</h2>
      {workspaces ? (
        <div>
          {workspaces.map((workspace) => (
            <li>{workspace.name}</li>
          ))}
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
};
