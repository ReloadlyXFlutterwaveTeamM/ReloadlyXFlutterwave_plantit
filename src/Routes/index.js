import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'Components';

const Routes = () => (
  <Switch>
    <Route path='/'>
      <Home />
    </Route>
  </Switch>
);

export default Routes;
