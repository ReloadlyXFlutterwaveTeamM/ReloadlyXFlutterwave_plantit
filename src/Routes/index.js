import React, { useReducer } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home } from 'Components';
import { contexts, initialStates, reducers } from 'Store';

import AuthRoutes from './auth';
import DashboardRoutes from './dashboard';

const { alertInitialState, authInitialState } = initialStates;
const { AlertContext, AuthContext } = contexts;
const { authReducer, alertReducer } = reducers;

const Routes = () => {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);
  const [alertState, alertDispatch] = useReducer(alertReducer, alertInitialState);

  return (
    <AlertContext.Provider value={{ state: alertState, dispatch: alertDispatch }}>
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
    </AlertContext.Provider>
  );
};

export default Routes;
