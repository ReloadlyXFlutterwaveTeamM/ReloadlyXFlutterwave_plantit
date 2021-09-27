import React, { useReducer } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home } from 'Components';
import { contexts, initialStates, reducers } from 'Store';

import AuthRoutes from './auth';
import DashboardRoutes from './dashboard';

const { authReducer } = reducers;
const { authInitialState } = initialStates;
const { AuthContext } = contexts;

const Routes = () => {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  return (
    <AuthContext.Provider value={{ state: authState, dispatch: authDispatch }}>
      <Switch>
        <Route path='/auth'>
          <AuthRoutes />
        </Route>

        <Route path='/dashboard'>
          <DashboardRoutes />
        </Route>

        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </AuthContext.Provider>
  );
};

export default Routes;
