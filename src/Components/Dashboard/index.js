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
    link: 'https://flutterwave.com/us/',
  },
  {
    title: 'Reloadly',
    alt: 'Reloadly Logo',
    src: 'reloadly_logo.png',
    link: 'https://www.reloadly.com/',
  },
];

const { AuthContext } = contexts;

const Dashboard = ({ articles }) => {
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
          <Donate user={user} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
