import React from 'react';
import { Link } from 'react-router-dom';

const DashboardNav = ({ name = 'Unknown', handleClick }) => (
  <div
    className='fixed-top py-2 px-4 d-flex align-items-center justify-content-between bg-white shadow-sm'
    id='dashboard-navbar'
  >
    <Link to='/dashboard'>
      <img
        title='Plant It!'
        alt='Plant It! Logo'
        className='img-fluid'
        src={`${process.env.PUBLIC_URL}/assets/logos/plantit_green.png`}
      />
    </Link>

    <div className='d-flex align-items-center justify-content-between'>
      <button
        type='button'
        className='btn btn-primary text-white rounded-pill me-4'
        onClick={handleClick}
      >
        Log Out
      </button>

      <img
        src={`https://eu.ui-avatars.com/api/?name=${name}&size=128&background=4aae8c&color=fff`}
        alt='user avatar'
        title={name}
        className='fluid img-thumbnail rounded rounded-circle'
      />
    </div>
  </div>
);
export default DashboardNav;
