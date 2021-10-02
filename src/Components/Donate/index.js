import React, { useEffect, useState, useContext } from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { RiVisaLine, RiMastercardFill } from 'react-icons/ri';
import { GrAmex } from 'react-icons/gr';
import * as bootstrap from 'bootstrap';

import { saveDonation, saveTransaction } from 'Adapters';
import { contexts, types } from 'Store';

import model from './model';
import { validation, initialValues } from './schema';

const {
  formId,
  fields: { tree_type, planting_area, number_of_trees },
} = model;

const TREE_COST = 4;

const TREE_TYPES = [
  { name: 'Mahogany', value: 'Mahogany' },
  { name: 'Moringa', value: 'Moringa' },
  { name: 'Sycamore', value: 'Sycamore' },
  { name: 'Gmelina', value: 'Gmelina' },
  { name: 'Yohimbe', value: 'Yohimbe' },
];

const PLANTING_AREAS = [
  { name: 'Kano', value: 'Kano', coordinates: [8.592, 12.0022] },
  { name: 'Zaria', value: 'Zaria', coordinates: [7.7199, 11.0855] },
  { name: 'Yelwa', value: 'Yelwa', coordinates: [4.7433, 10.837] },
  { name: 'Bauchi', value: 'Bauchi', coordinates: [9.8237, 10.301] },
  { name: 'Jigawa', value: 'Jigawa', coordinates: [9.5616, 12.228] },
  { name: 'Maiduguri', value: 'Maiduguri', coordinates: [13.151, 11.8311] },
];

const { SET_ALERT } = types;
const { AlertContext } = contexts;

const Modal = ({ onClose, handleAgree }) => {
  const onAgree = () => {
    handleAgree();
    onClose();
  };

  const onDisagree = () => {
    onClose();
  };

  return (
    <div tabIndex='-1' id='donate_modal' className='modal'>
      <div className='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
        <div className='modal-content'>
          <div className='modal-body d-flex flex-column align-items-center justify-content-center'>
            <div className='fw-bold text-center'>Allow FlutterWave to process the payment?</div>
            <div className='fw-normal text-center text-muted'>
              You will be navigated away from our site to the flutterwave payment portal.
            </div>
            <div className='mt-2 small text-center text-muted'>Would you like to proceed?</div>
          </div>

          <div className='modal-footer flex-nowrap p-0'>
            <button
              type='button'
              onClick={onAgree}
              className='btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0 border-right'
            >
              <strong>Yes, proceed</strong>
            </button>
            <button
              type='button'
              onClick={onDisagree}
              className='btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0'
            >
              No thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Donate = ({ user, setRefresh }) => {
  const { dispatch: alertDispatch } = useContext(AlertContext);

  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [details, setDetails] = useState(initialValues);
  const [amount, setAmount] = useState();

  const { email: user_email, phone: user_phone, name: user_name, uid } = user;

  const onChange = (e) => {
    setDetails((d) => ({ ...d, [e.target.name]: e.target.value }));
  };

  const hasErrors = (key) => key in errors;

  const showModal = () => {
    const element = document.getElementById('donate_modal');
    const donateModal = new bootstrap.Modal(element, { keyboard: false, backdrop: true });
    donateModal.show();
  };

  const hideModal = () => {
    const element = document.getElementById('donate_modal');
    const donateModal = bootstrap.Modal.getInstance(element);
    donateModal.hide();
    donateModal.dispose();
  };

  const config = {
    public_key: process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: `PLANTIT-${new Date().getTime()}`,
    amount,
    currency: 'USD',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: user_email,
      name: user_name,
      phonenumber: user_phone,
    },
    customizations: {
      title: 'Plant It! Donation',
      description: `Donation for ${details[number_of_trees.name]} trees`,
      logo: 'https://plantit.netlify.app/assets/logos/plantit_green.png',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const paymentCallback = async (response) => {
    try {
      const { transaction_id } = response || {};
      const donation_id = `${uid}${new Date().getTime()}`;

      await saveTransaction({ ...response, user_id: uid });

      await saveDonation({
        ...details,
        user_id: uid,
        donation_id,
        transaction_id,
        [number_of_trees.name]: parseInt(details[number_of_trees.name], 10),
        [planting_area.name]: JSON.parse(details[planting_area.name]),
        points: {
          earned: details[number_of_trees.name] * 2,
          redeemed: false,
        },
        date_of_donation: new Date().toLocaleDateString(),
        date_actualized: '',
      });

      closePaymentModal();

      const { status } = response || {};
      if (status !== 'successful') {
        const message = 'An error has occurred, donation not complete';
        alertDispatch({ type: SET_ALERT, payload: { message, show: true } });
      } else {
        setDetails(initialValues);
        const message = 'Donation payment is complete';
        alertDispatch({ type: SET_ALERT, payload: { message, show: true } });
      }
      setRefresh(Math.random());
    } catch (error) {
      alertDispatch({ type: SET_ALERT, payload: { message: error.message, show: true } });
    }
  };

  const paymentClose = () => {
    setDetails(initialValues);
  };

  const handlePayment = () => {
    handleFlutterPayment({
      callback: paymentCallback,
      onClose: paymentClose,
    });
  };

  const donate = async () => {
    try {
      showModal();
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
    setAmount(details[number_of_trees.name] * TREE_COST);
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
            className={hasErrors(planting_area.name) ? 'form-control is-invalid' : 'form-control'}
          >
            <option value={JSON.stringify({})}>{planting_area.placeholder}</option>
            {PLANTING_AREAS.map((area) => {
              const { name } = area;
              return (
                <option key={name} value={JSON.stringify(area)}>
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
            <div className='fw-light small'>{`USD. ${amount ? amount.toFixed(2) : 'XXXX'}`}</div>
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

      <Modal onClose={hideModal} handleAgree={handlePayment} />
    </div>
  );
};

export default Donate;
