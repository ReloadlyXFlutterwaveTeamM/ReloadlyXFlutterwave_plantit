import React, { useContext, useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import { Dashboard, Locations, Redeem } from 'Components';
import { getNewsArticles, checkUserStatus, signOutUser, getDonations } from 'Adapters';
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
  const [refresh, setRefresh] = useState(0);

  const handleLogout = async () => {
    await signOutUser();

    dispatch({ type: REMOVE_AUTH });
    push('/');
  };

  const {
    user: { name, uid },
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
    const getUserDonations = async (user_id) => {
      try {
        const response = await getDonations(user_id);
        const { donations: fetchedDonations } = response || {};

        const total_locations = [
          ...new Set(fetchedDonations.map(({ planting_area }) => planting_area.name)),
        ].length;

        const number_of_trees = fetchedDonations
          .map((donation) => donation.number_of_trees)
          .reduce((prev, curr) => prev + curr, 0);

        const total_points = fetchedDonations
          .map(({ points }) => points.earned)
          .reduce((prev, curr) => prev + curr, 0);

        const redeemable_points = fetchedDonations
          .map(({ points }) => !points.redeemed && points.earned)
          .reduce((prev, curr) => prev + curr, 0);

        dispatch({
          type: SET_AUTH,
          payload: { total_points, redeemable_points, number_of_trees, total_locations },
        });

        // setDonations(fetchedDonations);
      } catch (error) {
        window.console.error('Error', error.message);
      }
    };

    if (uid) {
      getUserDonations(uid);
    }
  }, [uid, refresh]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await getNewsArticles();
        const { value: fetchedArticles } = response || {};

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
            <Dashboard articles={articles} setRefresh={setRefresh} />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default DashboardRoutes;
