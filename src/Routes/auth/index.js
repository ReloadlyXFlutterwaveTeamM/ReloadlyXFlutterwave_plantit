import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import { Auth } from 'Components';

const { SignIn, SignUp } = Auth;

const AuthRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/signin`}>
        <SignIn />
      </Route>

      <Route path={`${path}/signup`}>
        <SignUp />
      </Route>
    </Switch>
  );
};

export default AuthRoutes;
