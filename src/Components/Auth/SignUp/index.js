import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import model from './model';
import { validation, initialValues } from './schema';
import ThirdParty from '../ThirdParty';

const {
  formId,
  fields: { contact, password, fullname, agree },
} = model;

const SignUp = () => {
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [details, setDetails] = useState(initialValues);

  const onChange = (e) => {
    setDetails((d) => ({ ...d, [e.target.name]: e.target.value }));
  };

  const onCheckChange = (e) => {
    setDetails((d) => ({ ...d, [e.target.name]: !details[agree.name] }));
  };

  const hasErrors = (key) => key in errors;

  const register = async () => {
    try {
      window.console.log('Registered');
    } catch (error) {
      setErrors((e) => ({ ...e, onSubmit: error.message }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await validation.validate(details, { abortEarly: false });

      await register();

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
          className='col-5 bg-primary text-white d-none d-sm-flex flex-column justify-content-center align-items-start position-relative'
          style={{ padding: '0 4rem' }}
        >
          <Link
            to='/'
            className='d-none d-sm-block position-absolute top-0 start-0'
            style={{ height: '5rem' }}
          >
            <img
              title='Plant It!'
              alt='Plant It! Logo'
              className='img-fluid hg-100'
              src={`${process.env.PUBLIC_URL}/assets/logos/plantit_white.png`}
            />
          </Link>

          <h1>Your first time huh?</h1>
          <h1>Let’s get you started.</h1>
          <div className='mt-2 fw-light'>
            This is to help us stay in touch with you and give you a place on our table.
          </div>
        </div>

        <div className='col-12 col-sm-7 d-flex flex-column justify-content-center align-items-center position-relative'>
          <Link
            to='/'
            className='d-flex d-sm-none position-absolute top-0 start-0'
            style={{ height: '5rem' }}
          >
            <img
              title='Plant It!'
              alt='Plant It! Logo'
              className='img-fluid hg-100'
              src={`${process.env.PUBLIC_URL}/assets/logos/plantit_green.png`}
            />
          </Link>

          <div className='row align-items-center justify-content-center w-100'>
            <div className='col-12 col-sm-8 col-md-6 d-flex flex-column justify-content-center align-items-center'>
              <h2>Create your account</h2>
              <div>No hidden fees</div>

              <form
                noValidate
                id={formId}
                onSubmit={handleSubmit}
                validated={validated.toString()}
                className='mt-4 w-100 needs-validation'
              >
                <div className='mb-3'>
                  <label className='form-label' htmlFor='fullname'>
                    {fullname.label}
                  </label>

                  <input
                    type='text'
                    id={fullname.name}
                    name={fullname.name}
                    onChange={onChange}
                    value={details[fullname.name]}
                    placeholder={fullname.placeholder}
                    className={
                      hasErrors(fullname.name) ? 'form-control is-invalid' : 'form-control'
                    }
                  />

                  <div className='invalid-feedback'>{errors[fullname.name]}</div>
                </div>

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

                  <div className='invalid-feedback'>{errors[contact.name]}</div>
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
                </div>

                <div className=' form-check mb-3'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    name={agree.name}
                    id={agree.name}
                    onChange={onCheckChange}
                    checked={details[agree.name]}
                    value={details[agree.name]}
                  />
                  <label className='form-check-label fs-6 text' htmlFor='terms'>
                    By creating an account means you agree to the{' '}
                    <span className='fw-bold'>Terms and Conditions</span>, and our{' '}
                    <span className='fw-bold'>Privacy Policy.</span>
                  </label>

                  <div className='invalid-feedback d-block'>{errors[agree.name]}</div>
                </div>

                <div className='d-grid gap-2'>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='btn btn-primary text-white'
                  >
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
};

export default SignUp;
