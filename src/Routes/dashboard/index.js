import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import { Dashboard, Locations, Redeem } from 'Components';
import { Navigation } from 'Commons';

const { DashboardNav } = Navigation;

const DashboardRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <DashboardNav />
      <div id='dashboard-container'>
        <Switch>
          <Route path={`${path}/locations`}>
            <Locations />
          </Route>

          <Route path={`${path}/redeem`}>
            <Redeem />
          </Route>

          <Route path={`${path}/`}>
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default DashboardRoutes;
