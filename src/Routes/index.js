import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';

import { Home } from 'Components';
import { contexts, types } from 'Store';

import AuthRoutes from './auth';
import DashboardRoutes from './dashboard';

const { AlertContext } = contexts;
const { SET_ALERT } = types;

const Routes = () => {
  const {
    state: { message, show },
    dispatch: alertDispatch,
  } = useContext(AlertContext);

  const handleClose = () => {
    alertDispatch({ type: SET_ALERT, payload: { show: false } });
  };

  return (
    <>
      <ToastContainer className='p-3' position='top-end' style={{ zIndex: 2000 }}>
        <Toast show={show} delay={6000} autohide onClose={handleClose}>
          <Toast.Header closeButton>
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/32x32.png`}
              className='rounded me-2'
              alt='Plant It!'
            />

            <strong className='me-auto'>Plant It!</strong>
          </Toast.Header>

          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>

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
    </>
  );
};

export default Routes;
