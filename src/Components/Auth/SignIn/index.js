import React, { useState } from 'react';

import model from './model';
import { validation, initialValues } from './schema';
import ThirdParty from '../ThirdParty';

const {
  formId,
  fields: { contact, password },
} = model;

const SignIn = () => {
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [details, setDetails] = useState(initialValues);

  const onChange = (e) => {
    setDetails((d) => ({ ...d, [e.target.name]: e.target.value }));
  };

  const hasErrors = (key) => key in errors;

  const signin = async () => {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await validation.validate(details, { abortEarly: false });

      await signin();

      setErrors({});
      setIsSubmitting(false);
      setDetails(initialValues);
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
                  <label className='form-label' htmlFor='contact'>
                    {contact.label}
                  </label>

                  <input
                    type='text'
                    id={contact.name}
                    name={contact.name}
                    onChange={onChange}
                    value={details[contact.name]}
                    placeholder={contact.placeholder}
                    className={hasErrors(contact.name) ? 'form-control is-invalid' : 'form-control'}
                  />

                  <div className='invalid-feedback d-block'>{errors[contact.name]}</div>
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

                <div className='d-grid gap-2'>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='btn btn-primary text-white'
                  >
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
};

export default SignIn;
