import { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import { useAppSelector } from '../../hooks/storeHooks';
import { isNativeApp } from '../../utils/misc';
import Home from '../routes/Home';
import ViewCollection from '../routes/ViewCollection';
import EditCollection from '../routes/EditCollection';
import Workspaces from '../routes/Workspaces';

const Routes: FC = () => {
  /*/
  const state = useAppSelector((state) => state);
  console.log(state);
  //*/
  return (
    <Router>
      <Switch>
        <Route path={'/'} exact={true} component={Home} />
        {isNativeApp() && (
          <Route path={'/workspaces'} exact={true} component={Workspaces} />
        )}
        <Route path={'/c/:id'} exact={true} component={ViewCollection} />
        <Route path={'/c/:id/edit'} exact={true} component={EditCollection} />
      </Switch>
    </Router>
  );
};

export default Routes;
