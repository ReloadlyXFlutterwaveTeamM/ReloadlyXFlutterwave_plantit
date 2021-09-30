import React, { useContext, useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import { Dashboard, Locations, Redeem } from 'Components';
import { getNewsArticles, checkUserStatus, signOutUser } from 'Adapters';
import { contexts, types } from 'Store';
import { Navigation } from 'Commons';

const { AuthContext } = contexts;
const { REMOVE_AUTH, SET_AUTH } = types;

const { DashboardNav } = Navigation;

const DashboardRoutes = () => {
  const { push } = useHistory();
  const { path } = useRouteMatch();
  const { state, dispatch } = useContext(AuthContext);

  const [articles, setArticles] = useState([]);

  const handleLogout = async () => {
    await signOutUser();

    dispatch({ type: REMOVE_AUTH });
    push('/');
  };

  const {
    user: { name },
  } = state || {};

  const handleStatusCheck = (user) => {
    dispatch({ type: SET_AUTH, payload: { user } });
  };

  const handleNoCheck = () => {
    push('/');
  };

  useEffect(() => {
    const checkStatus = async () => {
      try {
        await checkUserStatus(handleStatusCheck, handleNoCheck);
      } catch (error) {
        window.console.error('Error', error.message);
      }
    };

    checkStatus();
  }, []);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await getNewsArticles();
        const { articles: fetchedArticles } = response || {};

        setArticles(fetchedArticles);
      } catch (error) {
        window.console.error(error.message);
      }
    };
    getArticles();
  }, []);

  return (
    <>
      <DashboardNav handleClick={handleLogout} name={name} />

      <div id='dashboard-container'>
        <Switch>
          <Route path={`${path}/locations`}>
            <Locations />
          </Route>

          <Route path={`${path}/redeem`}>
            <Redeem />
          </Route>

          <Route path={`${path}/`}>
            <Dashboard articles={articles} />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default DashboardRoutes;
