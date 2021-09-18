import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { getWorkspace } from '../../store/slices/workspaces';

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const { workspace } = useAppSelector(({ workspaces }) => ({
    workspace: workspaces.data.workspace,
  }));

  useEffect(() => {
    dispatch(getWorkspace(() => {}));
  }, [dispatch]);

  if (!workspace) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <h2>{workspace.name}</h2>
    </div>
  );
};

export default Home;
