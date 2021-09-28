import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { contexts, types } from 'Store';
import { signInUser } from 'Adapters';

import model from './model';
import ThirdParty from '../ThirdParty';
import { validation, initialValues } from './schema';

const { AuthContext } = contexts;
const { SET_AUTH } = types;

const {
  formId,
  fields: { email, password },
} = model;

const SignIn = () => {
  const { push } = useHistory();
  const { dispatch } = useContext(AuthContext);

  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [details, setDetails] = useState(initialValues);

  const onChange = (e) => {
    setDetails((d) => ({ ...d, [e.target.name]: e.target.value }));
  };

  const hasErrors = (key) => key in errors;

  const signin = async (values) => {
    try {
      const response = await signInUser(values);
      const { user } = response;
      dispatch({
        type: SET_AUTH,
        payload: { user },
      });

      setErrors({});
      setIsSubmitting(false);
      setDetails(initialValues);
      push('/dashboard');
    } catch (error) {
      setErrors((e) => ({ ...e, onSubmit: error.message }));
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await validation.validate(details, { abortEarly: false });

      await signin(details);
    } catch (error) {
      const { inner } = error || {};

      const validationErrors = inner.reduce(
        (errs, currentValidation) =>
          Object.assign(errs, {
            [currentValidation.path]: currentValidation.errors[0],
          }),
        {},
      );
      setErrors(validationErrors);
      setValidated(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className='container-fluid h-100'>
      <div className='row h-100'>
        <div
          className='col-5 bg-primary text-white d-none d-sm-flex flex-column justify-content-center align-items-start'
          style={{ padding: '0 4rem' }}
        >
          <h1>You’re back!</h1>
          <h1>We’re glad.</h1>
          <div className='mt-2 fw-light'>You have some stuff to do here, right?</div>

          <div>
            <img
              className='img-fluid'
              title='Digital Greenness'
              alt='Digital Greenness'
              src={`${process.env.PUBLIC_URL}/assets/images/smart_green.png`}
            />
          </div>
        </div>

        <div className='col-12 col-sm-7 d-flex flex-column justify-content-center align-items-center'>
          <div className='row align-items-center justify-content-center w-100'>
            <div className='col-12 col-sm-8 col-md-6 d-flex flex-column justify-content-center align-items-center'>
              <span role='img' aria-label='waving hand' className='fs-2'>
                👋
              </span>

              <h2>Welcome back!</h2>

              <div className='text-center'>Save the planet from the comfort of your home</div>

              <form
                noValidate
                id={formId}
                onSubmit={handleSubmit}
                validated={validated.toString()}
                className='mt-4 w-100 needs-validation'
              >
                <div className='mb-3'>
                  <label className='form-label' htmlFor='email'>
                    {email.label}
                  </label>

                  <input
                    type='text'
                    id={email.name}
                    name={email.name}
                    onChange={onChange}
                    value={details[email.name]}
                    placeholder={email.placeholder}
                    className={hasErrors(email.name) ? 'form-control is-invalid' : 'form-control'}
                  />

                  <div className='invalid-feedback'>{errors[email.name]}</div>
                </div>

                <div className='mb-3'>
                  <label className='form-label' htmlFor='password'>
                    {password.label}
                  </label>

                  <input
                    type='password'
                    id={password.name}
                    name={password.name}
                    onChange={onChange}
                    value={details[password.name]}
                    placeholder={password.placeholder}
                    className={
                      hasErrors(password.name) ? 'form-control is-invalid' : 'form-control'
                    }
                  />

                  <div className='invalid-feedback'>{errors[password.name]}</div>

                  {hasErrors(password.name) ? null : (
                    <div className='form-text'>Must be at least 8 characters</div>
                  )}
                </div>

                <div className='d-grid gap-2 mb-3'>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='btn btn-primary text-white'
                  >
                    Sign in
                  </button>
                </div>

                <div className='text-danger text-center small mb3'>{errors.onSubmit}</div>
              </form>

              <ThirdParty />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
