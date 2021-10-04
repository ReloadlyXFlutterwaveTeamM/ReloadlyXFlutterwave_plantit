import React, { useContext } from 'react';

import { contexts } from 'Store';

import Articles from '../Articles';
import Partners from '../Partners';
import Summary from '../Summary';
import Donate from '../Donate';

const partners = [
  {
    title: 'Flutterwave',
    alt: 'Flutterwave Logo',
    src: 'flutterwave_logo.png',
    url: 'https://flutterwave.com/us/',
  },
  {
    title: 'Reloadly',
    alt: 'Reloadly Logo',
    src: 'reloadly_logo.png',
    url: 'https://www.reloadly.com/',
  },
];

const { AuthContext } = contexts;

/**
 * @name Dashboard
 *
 * @param {Object} props
 * @param {Object} props.articles
 * @param {string} props.articles.name - the title of the article
 * @param {string} props.articles.url - the access link/url for the article
 * @param {string} props.articles.description - a description of the articles
 * @param {Function} props.setRefresh - reloads the dashboard after making a donation
 */
const Dashboard = ({ articles, setRefresh }) => {
  const {
    state: { user },
  } = useContext(AuthContext);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-7 col-lg-8'>
          <Summary />

          <Partners partners={partners} />

          <Articles articles={articles} />
        </div>

        <div className='col-md-5 col-lg-4 mt-2 mt-md-0'>
          <Donate user={user} setRefresh={setRefresh} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
