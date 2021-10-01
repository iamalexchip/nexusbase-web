import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MyWorkspaces } from './routes/MyWorkspaces';

const App: FC = () => (
  <Router>
    <Switch>
      <Route path={'/'} exact={true} component={MyWorkspaces} />
    </Switch>
  </Router>
);

export default App;
