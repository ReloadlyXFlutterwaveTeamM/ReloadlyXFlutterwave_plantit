import React from 'react';
import { Link } from 'react-router-dom';

const Summary = () => (
  <div className='position-relative d-flex flex-column flex-md-row rounded border border-2 border-light p-2'>
    <div className='col-md-6 p-2 d-flex flex-column'>
      <div className='text-muted small fw-light'>Congratulations</div>

      <h5>Level 2 superhero</h5>

      <div className='text-muted small'>
        You have planted <span className='text-primary fw-bold'>350</span> trees in{' '}
        <span className='text-warning'>23</span> locations. Plant more to gain more points.
      </div>

      <Link to='/dashboard/locations' className='text-dark mt-5 text-decoration-none'>
        Check out your tree locations <i className='bi bi-arrow-right-short' />
      </Link>
    </div>

    <div
      className='col-md-6 d-flex flex-column align-items-center justify-content-center rounded rounded-3'
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/redeem_bg.png)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Link
        to='/dashboard/redeem'
        className='btn btn-sm btn-link btn-light text-primary rounded-pill text-decoration-none'
      >
        <i className='bi bi-gift-fill me-2' />
        REDEEM POINTS
      </Link>
    </div>
  </div>
);

export default Summary;
