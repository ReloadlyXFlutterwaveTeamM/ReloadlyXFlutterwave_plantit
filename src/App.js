import React, { useReducer } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { contexts, initialStates, reducers } from 'Store';
import Routes from 'Routes';

const { alertInitialState } = initialStates;
const { AlertContext } = contexts;
const { alertReducer } = reducers;

const App = () => {
  const [alertState, alertDispatch] = useReducer(alertReducer, alertInitialState);

  return (
    <Router>
      <AlertContext.Provider value={{ state: alertState, dispatch: alertDispatch }}>
        <Routes />
      </AlertContext.Provider>
    </Router>
  );
};

export default App;
