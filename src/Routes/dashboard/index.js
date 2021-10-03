import React, { useContext, useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import { Dashboard, Locations, Redeem } from 'Components';
import {
  getNewsArticles,
  checkLoginStatus,
  signOutUser,
  getDonations,
  getAirtimeAccessToken,
  getGiftsCardAccessToken,
} from 'Adapters';
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
    user: { name, id },
    token,
  } = state || {};

  const handleAuthCheck = (auth) => {
    dispatch({ type: SET_AUTH, payload: { ...auth } });
  };

  const handleNoAuth = () => {
    push('/');
  };

  useEffect(() => {
    const checkStatus = async () => {
      try {
        await checkLoginStatus(handleAuthCheck, handleNoAuth);
      } catch (error) {
        window.console.error('Error', error.message);
      }
    };

    checkStatus();
  }, []);

  useEffect(() => {
    const getTokens = async () => {
      try {
        const { access_token: airtime_access_token } = await getAirtimeAccessToken(token);
        const { access_token: gift_card_access_token } = await getGiftsCardAccessToken(token);

        dispatch({
          type: SET_AUTH,
          payload: { airtime_access_token, gift_card_access_token },
        });
      } catch (error) {
        window.console.log('Tokens', error.message);
      }
    };
    if (token) {
      getTokens();
    }
  }, [token]);

  useEffect(() => {
    const getUserDonations = async (user_id) => {
      try {
        const response = await getDonations(user_id);
        const { donations: fetchedDonations } = response || {};

        const total_locations = [
          ...new Set(fetchedDonations.map(({ planting_area }) => planting_area.name)),
        ].length;

        const total_number_of_trees = fetchedDonations
          .map((donation) => donation.number_of_trees)
          .reduce((prev, curr) => prev + curr, 0);

        const total_points = fetchedDonations
          .map(({ points }) => points.earned)
          .reduce((prev, curr) => prev + curr, 0);

        const redeemable_points = fetchedDonations
          .map(({ points }) => !points.redeemed && points.earned)
          .reduce((prev, curr) => prev + curr, 0);

        const locations = fetchedDonations
          .map(({ date_actualized, number_of_trees, planting_area }) => ({
            date_actualized,
            number_of_trees,
            ...planting_area,
          }))
          .filter(({ date_actualized }) => date_actualized !== '');

        console.log('locations', locations);

        dispatch({
          type: SET_AUTH,
          payload: {
            total_points,
            redeemable_points,
            number_of_trees: total_number_of_trees,
            total_locations,
            locations,
          },
        });

        // setDonations(fetchedDonations);
      } catch (error) {
        window.console.error('Error', error.message);
      }
    };

    if (id) {
      getUserDonations(id);
    }
  }, [id, refresh]);

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
