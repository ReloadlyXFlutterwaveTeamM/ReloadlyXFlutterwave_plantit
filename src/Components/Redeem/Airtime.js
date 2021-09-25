/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

const Airtime = ({ values, setValues, minimum = 0, maximum = 50 }) => (
  <div className='d-flex flex-column  justify-content-center'>
    <h5 className='text-center'>Redeem as Airtime Top</h5>
    <div className='small text-muted'>
      Amount redeemable: NGN<span className='fw-bold'>{minimum}</span> (min), NGN
      <span className='fw-bold'>{maximum}</span> (max)
    </div>

    <div className='my-3'>
      <label className='form-label' htmlFor='airtime_amount'>
        Airtime Amount
      </label>

      <input
        min={minimum}
        max={maximum}
        type='number'
        id='airtime_amount'
        name='airtime_amount'
        className='form-control'
        value={values ? values.airtime_amount : minimum}
        placeholder='Enter the airtime amount'
        onChange={(e) => setValues({ amount: parseInt(e.target.value, 10) })}
      />
    </div>
  </div>
);

export default Airtime;
