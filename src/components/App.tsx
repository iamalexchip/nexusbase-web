import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { isNativeApp } from '../utils/misc';
import Home from './routes/Home';
import ViewCollection from './routes/ViewCollection';
import Workspaces from './routes/Workspaces';

const App: FC = () => (
  <Router>
    <Switch>
      <Route path={'/'} exact={true} component={Home} />
      {isNativeApp() && (
        <Route path={'/workspaces'} exact={true} component={Workspaces} />
      )}
      <Route path={'/c/:id'} exact={true} component={ViewCollection} />
    </Switch>
  </Router>
);

export default App;
