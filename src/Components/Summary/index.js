import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Chart } from 'react-google-charts';

import { contexts } from 'Store';

const { AuthContext } = contexts;

const leveller = (points) => {
  if (points <= 100) return 'Level 1 Starter';
  if (points <= 200) return 'Level 2 Basic';
  if (points <= 300) return 'Level 3 Intermediate';
  if (points <= 400) return 'Level 4 Pro';
  if (points <= 500) return 'Level 5 Superhero';
  return 'Level 1: Starter';
};

const Summary = () => {
  const {
    state: { total_points, redeemable_points, number_of_trees, total_locations },
  } = useContext(AuthContext);

  return (
    <div className='position-relative d-flex flex-column flex-md-row rounded border border-2 border-light p-2'>
      <div className='col-md-6 p-2 pb-4 d-flex flex-column position-relative'>
        <div className='text-muted small fw-light'>Congratulations</div>

        <h5>{leveller(total_points)}</h5>

        <div className='text-muted small'>
          You have planted <span className='text-primary fw-bold'>{number_of_trees}</span> trees in{' '}
          <span className='text-warning'>{total_locations}</span> locations. Plant more to gain more
          points.
        </div>

        <Link
          to='/dashboard/locations'
          className='text-dark mt-5 text-decoration-none position-absolute bottom-0'
        >
          Check out your tree locations <i className='bi bi-arrow-right-short' />
        </Link>
      </div>

      <div
        className='col-md-6 d-flex flex-column align-items-center justify-content-center rounded rounded-3 position-relative'
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/redeem_bg.png)`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Chart
          chartType='PieChart'
          loader={
            <div className='spinner-border text-light' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          }
          data={[
            ['Task', 'Hours per Day'],
            ['Earned', redeemable_points],
            ['', 500],
          ]}
          options={{
            tooltip: { text: 'value' },
            pieHole: 0.6,
            legend: 'none',
            pieStartAngle: 100,
            pieSliceText: 'none',
            colors: ['#fff', '#212135'],
            backgroundColor: 'transparent',
          }}
          rootProps={{ 'data-testid': '3' }}
        />
        <div className='text-center text-white position-absolute top-50 start-50 translate-middle mb-4 pb-4 fw-normal'>
          <span className='fw-bolder'>{redeemable_points}</span>/500
        </div>

        <Link
          to='/dashboard/redeem'
          className='btn btn-sm btn-link btn-light text-primary rounded-pill text-decoration-none my-2'
        >
          <i className='bi bi-gift-fill me-2' />
          REDEEM POINTS
        </Link>
      </div>
    </div>
  );
};

export default Summary;
