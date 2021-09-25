/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

const Airtime = ({ values, setValues, products, maximum, minimum }) => (
  <div className='d-flex flex-column  justify-content-center'>
    <h5 className='text-center'>Redeem as Gift Card</h5>
    <div className='small text-muted'>
      You can redeem your points as Gift cards for numerous brands
    </div>

    <div className='mb-3'>
      <label className='form-label' htmlFor='contact'>
        Select Gift Card
      </label>

      <select
        type='text'
        id='product'
        name='product'
        value={JSON.stringify(values ? values.product : {})}
        className='form-control'
        onChange={(e) => setValues({ product: { ...JSON.parse(e.target.value) } })}
      >
        <option value=''>Select a gift card</option>
        {products
          .filter(
            ({ fixedSenderDenominations }) =>
              fixedSenderDenominations >= minimum && fixedSenderDenominations >= maximum,
          )
          .map((product) => {
            const { productName, productId } = product;
            return (
              <option key={productId} value={JSON.stringify(product)}>
                {productName}
              </option>
            );
          })}
      </select>
    </div>
  </div>
);

export default Airtime;
