/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import ThirdParty from './ThirdParty';

const Signin = () => (
  <div className='container-fluid h-100'>
    <div className='row h-100'>
      <div
        className='col-5 bg-primary text-white d-flex flex-column justify-content-center align-items-start'
        style={{ padding: '0 4rem' }}
      >
        <h1>You’re back!</h1>
        <h1>We’re glad.</h1>
        <div className='mt-2 fw-light'>You have some stuff to do here, right?</div>
      </div>
      <div className='col-7 d-flex flex-column justify-content-center align-items-center'>
        <div className='row align-items-center justify-content-center w-100'>
          <div className='col-8 col-md-6 d-flex flex-column justify-content-center align-items-center'>
            <span role='img' aria-label='waving hand' className='fs-2'>
              👋
            </span>

            <h2>Welcome back!</h2>

            <div>Save the planet from the comfort of your home</div>

            <form className='mt-4 w-100'>
              <div className='mb-3'>
                <label className='form-label' htmlFor='contact'>
                  E-mail or phone number
                </label>

                <input
                  type='text'
                  id='contact'
                  name='contact'
                  className='form-control'
                  placeholder='Type your e-mail or phone number'
                />
              </div>

              <div className='mb-3'>
                <label className='form-label' htmlFor='password'>
                  Password
                </label>

                <input
                  type='password'
                  id='password'
                  name='password'
                  className='form-control'
                  placeholder='Type your password'
                />

                <div className='form-text'>Must be at least 8 characters</div>
              </div>

              <div className='d-grid gap-2'>
                <button type='button' className='btn btn-primary text-white'>
                  Sign in
                </button>
              </div>
            </form>

            <ThirdParty />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Signin;
