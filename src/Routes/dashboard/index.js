import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import { Dashboard } from 'Components';
import { Navigation } from 'Commons';

const { Locations, Redeem, Dashboard: Home } = Dashboard;
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
            <Home />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default DashboardRoutes;
