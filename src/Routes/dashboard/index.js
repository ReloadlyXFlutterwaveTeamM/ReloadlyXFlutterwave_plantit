import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import { Dashboard } from 'Components';

const { Locations, Redeem, Dashboard: Home } = Dashboard;

const DashboardRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/locations`}>
        <Locations />
      </Route>

      <Route path={`${path}/redeem`}>
        <Redeem />
      </Route>

      <Route path={`${path}/`}>
        <Home />
      </Route>
    </Switch>
  );
};

export default DashboardRoutes;
