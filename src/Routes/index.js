import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home } from 'Components';

import AuthRoutes from './auth';

const Routes = () => (
  <Switch>
    <Route path='/auth'>
      <AuthRoutes />
    </Route>

    <Route path='/'>
      <Home />
    </Route>
  </Switch>
);

export default Routes;
