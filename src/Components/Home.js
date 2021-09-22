import React from 'react';
import { Link } from 'react-router-dom';

import { Navigation } from 'Commons';

const { Navbar } = Navigation;

const Home = () => (
  <div className='container-fluid h-100' id='home'>
    <Navbar />
    <div className='row h-100 justify-content-center align-items-center'>
      <div className='col-12 col-sm-5'>
        <div>
          <h1 className='text-primary'>You can help save the planet</h1>

          <div>
            With as low as US$0.5 per month, you can plant 50 trees in any part of the world.
          </div>

          <div>
            <ul>
              <li>Select a region </li>

              <li>Choose the type of tree to plant </li>

              <li>Pay for the tree</li>

              <li>Redeem airtime is you plant enougn trees</li>
            </ul>
          </div>

          <div className='d-grid gap-2 col-8'>
            <Link to='/auth/signup' className='btn btn-primary text-white'>
              Start here
            </Link>
          </div>
        </div>
      </div>

      <div className='col-12 col-sm-7 d-flex flex-column justify-content-center align-items-center'>
        <img
          className='img-fluid'
          title='Gardening Bro'
          alt='Planting Trees'
          src={`${process.env.PUBLIC_URL}/assets/images/gardening_bro.png`}
        />
      </div>
    </div>
  </div>
);

export default Home;
