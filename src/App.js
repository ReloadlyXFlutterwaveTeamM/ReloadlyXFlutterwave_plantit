import React, { useReducer } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { contexts, initialStates, reducers } from 'Store';
import Routes from 'Routes';

const { alertInitialState, authInitialState } = initialStates;
const { AlertContext, AuthContext } = contexts;
const { alertReducer, authReducer } = reducers;

const App = () => {
  const [alertState, alertDispatch] = useReducer(alertReducer, alertInitialState);
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  return (
    <Router>
      <AlertContext.Provider value={{ state: alertState, dispatch: alertDispatch }}>
        <AuthContext.Provider value={{ state: authState, dispatch: authDispatch }}>
          <Routes />
        </AuthContext.Provider>
      </AlertContext.Provider>
    </Router>
  );
};

export default App;
