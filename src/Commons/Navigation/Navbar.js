import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <div className='row fixed-top p-2 bg-white' id='home-navbar'>
    <div className='col'>
      <div className='row align-items-center justify-content-between'>
        <div className='col-4'>
          <Link to='/'>
            <img
              title='Plant It!'
              alt='Plant It! Logo'
              className='img-fluid'
              src={`${process.env.PUBLIC_URL}/assets/logos/plantit_green.png`}
            />
          </Link>
        </div>

        <div className='col-4 d-none flex-row'>
          <Link className='tab-links col-4' to='/'>
            Home
          </Link>

          <Link className='tab-links col-4' to='/services'>
            Services
          </Link>

          <Link className='tab-links col-4' to='/contact'>
            Contact
          </Link>
        </div>

        <div className='col col-sm-4 d-flex flex-row justify-content-end justify-content-sm-center align-items-center'>
          <Link to='/auth/signin' className='btn btn-primary text-white me-2'>
            Sign in
          </Link>

          <Link to='/auth/signup' className='btn text-primary'>
            Join us
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Navbar;
