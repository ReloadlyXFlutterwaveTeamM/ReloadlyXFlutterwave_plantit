import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import { Auth } from 'Components';

const { Signin, Signup } = Auth;

const AuthRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/signin`}>
        <Signin />
      </Route>

      <Route path={`${path}/signup`}>
        <Signup />
      </Route>
    </Switch>
  );
};

export default AuthRoutes;
