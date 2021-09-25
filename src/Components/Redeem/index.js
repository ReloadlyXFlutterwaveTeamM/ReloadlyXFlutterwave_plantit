import React from 'react';

import { sendAirtimeTopUps, getOperatorDetails } from 'Adapters';

const Redeem = () => {
  const handleSendAirtime = async () => {
    try {
      const recipient_contact = '0789566944';
      const recipient_country_code = 'UG';

      const access_token =
        'eyJraWQiOiI1N2JjZjNhNy01YmYwLTQ1M2QtODQ0Mi03ODhlMTA4OWI3MDIiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4OTI5IiwiaXNzIjoiaHR0cHM6Ly9yZWxvYWRseS1zYW5kYm94LmF1dGgwLmNvbS8iLCJodHRwczovL3JlbG9hZGx5LmNvbS9zYW5kYm94Ijp0cnVlLCJodHRwczovL3JlbG9hZGx5LmNvbS9wcmVwYWlkVXNlcklkIjoiODkyOSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF1ZCI6Imh0dHBzOi8vdG9wdXBzLWhzMjU2LXNhbmRib3gucmVsb2FkbHkuY29tIiwibmJmIjoxNjMyNTI3NzQwLCJhenAiOiI4OTI5Iiwic2NvcGUiOiJzZW5kLXRvcHVwcyByZWFkLW9wZXJhdG9ycyByZWFkLXByb21vdGlvbnMgcmVhZC10b3B1cHMtaGlzdG9yeSByZWFkLXByZXBhaWQtYmFsYW5jZSByZWFkLXByZXBhaWQtY29tbWlzc2lvbnMiLCJleHAiOjE2MzI2MTQxNDAsImh0dHBzOi8vcmVsb2FkbHkuY29tL2p0aSI6IjZmMGE4NWI0LWJjZTYtNGExZC05MmVhLWIwYzM1MDhiM2FmMyIsImlhdCI6MTYzMjUyNzc0MCwianRpIjoiYjNkYTMwODEtYTYyZi00MTY2LTgzZDMtODk3MjhlMGJjY2EzIn0.DQ7GE3iZpTfZLnTL6LEUPHxJIhVo6BT_PqWN9fK9Is4';

      const operatorRes = await getOperatorDetails(access_token, {
        recipient_contact,
        recipient_country_code,
      });

      const { id: operatorId } = operatorRes || {};

      const reference = `PLANTIT-${new Date().getTime()}`;

      const response = await sendAirtimeTopUps(access_token, reference, 500, {
        operatorId,
        recipient_contact,
        recipient_country_code,
      });
      console.log('Response', response);
    } catch (error) {
      console.log('Error', error);
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
          You currently have <span className='fw-bold text-primary'>300</span> points.
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
                    className='col-6 btn btn-sm btn-primary text-white'
                    onClick={handleSendAirtime}
                  >
                    Redeem
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
                  <button type='button' className='col-6 btn btn-sm btn-primary text-white'>
                    Redeem
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
                  <button type='button' className='col-6 btn btn-sm btn-primary text-white'>
                    Redeem
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Redeem;
