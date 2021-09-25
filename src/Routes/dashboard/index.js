import React, { useContext, useEffect } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import { Dashboard, Locations, Redeem } from 'Components';
import { Navigation } from 'Commons';
import { contexts, types } from 'Store';

const { AuthContext } = contexts;
const { REMOVE_AUTH } = types;

const { DashboardNav } = Navigation;

const DashboardRoutes = () => {
  const { path } = useRouteMatch();
  const { push } = useHistory();
  const { state, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: REMOVE_AUTH });
    push('/');
  };

  const { fullname } = state || {};

  useEffect(() => {
    if (!fullname) {
      push('/');
    }
  }, []);

  console.log('State, ', state);

  return (
    <>
      <DashboardNav handleClick={handleLogout} name={fullname} />
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
