import React, { useEffect, useState } from 'react';
import { RiVisaLine, RiMastercardFill } from 'react-icons/ri';
import { GrAmex } from 'react-icons/gr';

import model from './model';
import { validation, initialValues } from './schema';

const {
  formId,
  fields: { tree_type, planting_area, number_of_trees },
} = model;

const TREE_COST = 2;

const TREE_TYPES = [
  { name: 'Mahogany', value: 'Mahogany' },
  { name: 'Moringa', value: 'Moringa' },
  { name: 'Ube', value: 'Ube' },
  { name: 'Light Bosse', value: 'Light Bosse' },
  { name: 'Yohimbe', value: 'Yohimbe' },
  { name: 'African Corkwood Tree', value: 'African Corkwood Tree' },
];

const PLANTING_AREAS = [
  { name: 'Kaduna', value: 'Kaduna' },
  { name: 'Zaria', value: 'Zaria' },
  { name: 'Yelwa', value: 'Yelwa' },
  { name: 'Gusau', value: 'Gusau' },
  { name: 'Kano', value: 'Kano' },
  { name: 'Bauchi', value: 'Bauchi' },
];

const Donate = () => {
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [details, setDetails] = useState(initialValues);
  const [subTotal, setSubTotal] = useState();

  const onChange = (e) => {
    setDetails((d) => ({ ...d, [e.target.name]: e.target.value }));
  };

  const hasErrors = (key) => key in errors;

  const donate = async () => {
    try {
      window.console.log('signed in');
    } catch (error) {
      setErrors((e) => ({ ...e, onSubmit: error.message }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await validation.validate(details, { abortEarly: false });

      await donate();

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

  useEffect(() => {
    setSubTotal(details[number_of_trees.name] * TREE_COST);
  }, [details[number_of_trees.name]]);

  return (
    <div className='d-flex flex-column justify-content-center align-items-center rounded border border-2 border-light px-5'>
      <h4 className='text-center'>Wanna save the world?</h4>
      <div className='small text-muted text-center'>Donate some trees</div>

      <form
        noValidate
        id={formId}
        onSubmit={handleSubmit}
        validated={validated.toString()}
        className='mt-4 w-100 needs-validation'
      >
        <div className='mb-3'>
          <label className='form-label' htmlFor='contact'>
            {number_of_trees.label}
          </label>

          <input
            type='number'
            id={number_of_trees.name}
            name={number_of_trees.name}
            onChange={onChange}
            min={1}
            value={details[number_of_trees.name]}
            placeholder={number_of_trees.placeholder}
            className={hasErrors(number_of_trees.name) ? 'form-control is-invalid' : 'form-control'}
          />

          <div className='invalid-feedback'>{errors[number_of_trees.name]}</div>
        </div>

        <div className='mb-3'>
          <label className='form-label' htmlFor='contact'>
            {planting_area.label}
          </label>

          <select
            type='text'
            id={planting_area.name}
            name={planting_area.name}
            onChange={onChange}
            value={details[planting_area.name]}
            placeholder={planting_area.placeholder}
            className={hasErrors(planting_area.name) ? 'form-control is-invalid' : 'form-control'}
          >
            <option value=''>{planting_area.placeholder}</option>
            {PLANTING_AREAS.map((area) => {
              const { name, value } = area;
              return (
                <option key={name} value={value}>
                  {name}
                </option>
              );
            })}
          </select>

          <div className='invalid-feedback'>{errors[planting_area.name]}</div>
        </div>

        <div className='mb-3'>
          <label className='form-label' htmlFor='contact'>
            {tree_type.label}
          </label>

          <select
            type='text'
            id={tree_type.name}
            name={tree_type.name}
            onChange={onChange}
            value={details[tree_type.name]}
            placeholder={tree_type.placeholder}
            className={hasErrors(tree_type.name) ? 'form-control is-invalid' : 'form-control'}
          >
            <option value=''>{tree_type.placeholder}</option>
            {TREE_TYPES.map((type) => {
              const { name, value } = type;
              return (
                <option key={name} value={value}>
                  {name}
                </option>
              );
            })}
          </select>

          <div className='invalid-feedback'>{errors[tree_type.name]}</div>
        </div>

        <div className='d-flex align-items-center justify-content-between'>
          <div className='d-flex flex-column'>
            <div className='fw-bold'>Sub Total</div>
            <div className='fw-light small'>{`USD. ${
              subTotal ? subTotal.toFixed(2) : 'XXXX'
            }`}</div>
          </div>
          <button type='submit' disabled={isSubmitting} className='btn btn-primary text-white'>
            Plant now
          </button>
        </div>
      </form>

      <div className='d-flex align-items-center justify-content-between mt-2'>
        <RiVisaLine size='2rem' className='mx-1' />
        <RiMastercardFill size='2rem' className='mx-1' />
        <GrAmex size='2rem' className='mx-1' />
      </div>

      <div className='text-muted text-center small mt-2'>
        All trees donated are accounted for and nurtured by experts
      </div>
    </div>
  );
};

export default Donate;
