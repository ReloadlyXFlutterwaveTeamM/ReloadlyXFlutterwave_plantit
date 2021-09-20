/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import ThirdParty from './ThirdParty';

const Signup = () => (
  <div className='container-fluid h-100'>
    <div className='row h-100'>
      <div
        className='col-5 bg-primary text-white d-flex flex-column justify-content-center align-items-start'
        style={{ padding: '0 4rem' }}
      >
        <h1>Your first time huh?</h1>
        <h1>Let’s get you started.</h1>
        <div className='mt-2 fw-light'>
          This is to help us stay in touch with you and give you a place on our table.
        </div>
      </div>

      <div className='col-7 d-flex flex-column justify-content-center align-items-center'>
        <div className='row align-items-center justify-content-center w-100'>
          <div className='col-8 col-md-6 d-flex flex-column justify-content-center align-items-center'>
            <h2>Create your account</h2>
            <div>No hidden fees</div>

            <form className='mt-4 w-100'>
              <div className='mb-3'>
                <label className='form-label' htmlFor='fullname'>
                  Full name
                </label>

                <input
                  type='text'
                  id='fullname'
                  name='fullname'
                  className='form-control'
                  placeholder='Enter your name'
                />
              </div>

              <div className='mb-3'>
                <label className='form-label' htmlFor='contact'>
                  E-mail or phone number
                </label>

                <input
                  type='text'
                  name='contact'
                  id='contact'
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
                  name='password'
                  id='password'
                  className='form-control'
                  placeholder='Type your password'
                />
              </div>

              <div className=' form-check mb-3'>
                <input className='form-check-input' type='checkbox' name='terms' id='terms' />
                <label className='form-check-label fs-6 text' htmlFor='terms'>
                  By creating an account means you agree to the{' '}
                  <span className='fw-bold'>Terms and Conditions</span>, and our{' '}
                  <span className='fw-bold'>Privacy Policy.</span>
                </label>
              </div>

              <div className='d-grid gap-2'>
                <button type='button' className='btn btn-primary text-white'>
                  Register
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

export default Signup;
