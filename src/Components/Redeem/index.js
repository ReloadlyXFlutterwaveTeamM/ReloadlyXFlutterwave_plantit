/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect, useState } from 'react';
import * as bootstrap from 'bootstrap';

import {
  sendAirtimeTopUps,
  getOperatorDetails,
  orderGiftCards,
  getAllGiftCardProducts,
} from 'Adapters';
import { Modal } from 'Commons';
import { contexts, types } from 'Store';

import AirtimeForm from './Airtime';
import DataForm from './Data';
import GiftCard from './GiftCard';

const { AuthContext, AlertContext } = contexts;
const { SET_ALERT } = types;

const AIRTIME_TOPSUPS = 'AIRTIME_TOPSUPS';
const DATA_BUNDLES = 'DATA_BUNDLES';
const GIFT_CARDS = 'GIFT_CARDS';

/**
 * @name Redeem
 */
const Redeem = () => {
  const { state } = useContext(AuthContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);

  const {
    airtime_access_token,
    gift_card_access_token,
    redeemable_points,
    user: { phone: recipient_contact, name: recipient_name, email: recipient_email },
  } = state || {};

  const [selected, setSelected] = useState('');
  const [values, setValues] = useState({});
  const [products, setProducts] = useState([]);
  const [minimum, setMinimum] = useState(100);
  const [maximum, setMaximum] = useState(100);

  const [isRedeemable, setIsRedeemable] = useState(false);

  const recipient_country_code = 'NG';

  const handleSendAirtime = async ({ amount = 100 }) => {
    try {
      if (amount < minimum || amount > maximum) {
        const message = 'Amount selected is outside the stated range';
        alertDispatch({ type: SET_ALERT, payload: { message, show: true } });
      } else {
        const operatorRes = await getOperatorDetails(airtime_access_token, {
          recipient_contact,
          recipient_country_code,
        });

        const { id: operatorId } = operatorRes || {};

        const reference = `PLANTIT-AIRTIME-${new Date().getTime()}`;

        await sendAirtimeTopUps(airtime_access_token, reference, amount, {
          operatorId,
          recipient_contact,
          recipient_country_code,
        });
        const message = 'Airtime top up redemption successful';
        alertDispatch({ type: SET_ALERT, payload: { message, show: true } });
      }
    } catch (error) {
      alertDispatch({ type: SET_ALERT, payload: { message: error.message, show: true } });
    }
  };

  const handleSendData = async () => {};

  const handleSendGiftCard = async ({ product }) => {
    try {
      const reference = `PLANTIT-GIFTCARD-${new Date().getTime()}`;

      await orderGiftCards(gift_card_access_token, reference, product, {
        recipient_name,
        recipient_email,
        recipient_country_code,
      });
      const message = 'Gift card redemption successful';
      alertDispatch({ type: SET_ALERT, payload: { message, show: true } });
    } catch (error) {
      alertDispatch({ type: SET_ALERT, payload: { message: error.message, show: true } });
    }
  };

  const openModal = () => {
    const element = document.getElementById('redeem_modal');
    const redeemModal = new bootstrap.Modal(element, { keyboard: false, backdrop: true });
    redeemModal.show();
  };

  const closeModal = () => {
    const element = document.getElementById('redeem_modal');
    const redeemModal = bootstrap.Modal.getInstance(element);
    redeemModal.hide();
    redeemModal.dispose();
  };

  const handleButtonClick = (modal) => {
    setSelected(modal);
    openModal();
  };

  useEffect(() => {
    const getGiftProducts = async () => {
      try {
        const response = await getAllGiftCardProducts(gift_card_access_token, 'NG');
        const { content: fetchedProducts } = response || {};
        setProducts(fetchedProducts);
      } catch (error) {
        window.console.log('Error', error);
      }
    };

    if (gift_card_access_token) {
      getGiftProducts();
    }
  }, [gift_card_access_token]);

  useEffect(() => {
    const allowableAmount = 5; /** 5 USD allowable minimum amount */
    const redeemableAmount = redeemable_points * 0.5 - allowableAmount;

    const maxAmount =
      redeemableAmount < 0
        ? 0
        : redeemableAmount < allowableAmount
        ? 0
        : redeemableAmount; /** O.5 USD reserved */
    const minAmount = maxAmount <= allowableAmount ? 0 : allowableAmount;

    setMaximum(maxAmount);
    setMinimum(minAmount);

    setIsRedeemable(!(redeemableAmount > 0));
  }, [redeemable_points]);

  const handleSubmit = async () => {
    switch (selected) {
      case AIRTIME_TOPSUPS:
        await handleSendAirtime(values);
        return;
      case DATA_BUNDLES:
        await handleSendData(values);
        return;
      case GIFT_CARDS:
        await handleSendGiftCard(values);
        return;
      default:
        window.console.log('');
    }
  };

  const renderModalContent = () => {
    switch (selected) {
      case AIRTIME_TOPSUPS:
        return (
          <AirtimeForm values={values} setValues={setValues} maximum={maximum} minimum={minimum} />
        );
      case DATA_BUNDLES:
        return <DataForm values={values} setValues={setValues} />;
      case GIFT_CARDS:
        return (
          <GiftCard
            values={values}
            setValues={setValues}
            products={products}
            maximum={maximum}
            minimum={minimum}
          />
        );
      default:
        return <div />;
    }
  };

  return (
    <div className='container'>
      <div className='d-flex flex-column'>
        <h5>Redeem Points</h5>
        <div className='text-muted small'>
          You can redeem your points as airtime top ups, data bundles or gift cards.
        </div>

        <div className='mt-2'>
          You currently have <span className='fw-bold text-primary'>{redeemable_points}</span>{' '}
          points.
        </div>

        <div className='row row-cols-1 row-cols-md-3 g-4 mt-4'>
          <div className='col'>
            <div className='card h-100'>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/airtime_topups.png`}
                className='card-img-top'
                alt='Airtime Top ups'
              />
              <div className='card-body'>
                <div className='card-text small text-muted'>
                  Redeem your points as airtime tops to your mobile money
                </div>

                <div className='d-grid gap-2 mt-3'>
                  <button
                    type='button'
                    disabled={isRedeemable}
                    className='col-6 btn btn-sm btn-primary text-white'
                    onClick={() => handleButtonClick(AIRTIME_TOPSUPS)}
                  >
                    {isRedeemable ? 'Earn more points to redeem' : 'Redeem'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='col'>
            <div className='card h-100'>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/gift_cards.png`}
                className='card-img-top'
                alt='Gift Cards'
              />
              <div className='card-body'>
                <div className='card-text small text-muted'>
                  Redeem your points as gift cards ie xbox, ea, fifa, fornite
                </div>

                <div className='d-grid gap-2 mt-3'>
                  <button
                    type='button'
                    disabled={isRedeemable}
                    onClick={() => handleButtonClick(GIFT_CARDS)}
                    className='col-6 btn btn-sm btn-primary text-white'
                  >
                    {isRedeemable ? 'Earn more points to redeem' : 'Redeem'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='col'>
            <div className='card h-100'>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/data_bundles.png`}
                className='card-img-top'
                alt='Data Bundles'
              />
              <div className='card-body'>
                <div className='card-text small text-muted'>
                  Redeem your points as data bundles to your mobile number
                </div>

                <div className='d-grid gap-2 mt-3'>
                  <button
                    type='button'
                    disabled
                    onClick={() => handleButtonClick(DATA_BUNDLES)}
                    className='col-6 btn btn-sm btn-primary text-white'
                  >
                    Not yet available
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        modal_id='redeem_modal'
        onClose={closeModal}
        onSubmit={handleSubmit}
        confirm_btn_msg='Redeem'
        cancel_btn_msg='Cancel'
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default Redeem;
