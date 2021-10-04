import React from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';

import { Auth } from 'Components';

const { SignIn, SignUp } = Auth;

const AuthRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <div id='auth-container' className='h-100 position-relative '>
        <Link to='/' className='auth-nav-imgs d-none d-sm-block position-fixed top-0 start-0'>
          <img
            title='Plant iT!'
            alt='Plant iT! Logo'
            className='img-fluid hg-100'
            src={`${process.env.PUBLIC_URL}/assets/logos/plantit_white.png`}
          />
        </Link>

        <Link to='/' className='auth-nav-imgs d-flex d-sm-none position-fixed top-0 start-0'>
          <img
            title='Plant iT!'
            alt='Plant iT! Logo'
            className='img-fluid hg-100'
            src={`${process.env.PUBLIC_URL}/assets/logos/plantit_green.png`}
          />
        </Link>

        <Switch>
          <Route path={`${path}/signin`}>
            <SignIn />
          </Route>

          <Route path={`${path}/signup`}>
            <SignUp />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default AuthRoutes;
