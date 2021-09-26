import React from 'react';
import _ from 'lodash';

const Articles = ({ articles }) => (
  <div className='mt-4 d-none d-md-flex flex-column'>
    <div className='fw-bold mb-2'>Learn about Climate Change</div>

    <div className='d-flex flex-row flex-nowrap overflow-auto'>
      {articles.map((article) => {
        const { title, description, url } = article;
        return (
          <div className='card text-dark bg-white mb-3 mx-2' style={{ minWidth: '18rem' }}>
            <div className='card-body'>
              <h5 className='card-title'>{title}</h5>
              <p className='card-text'>{_.truncate(description, { length: 100 })}</p>
            </div>

            <div className='card-footer d-grid gap-2 mt-3 bg-white border-0'>
              <a
                href={url}
                target='_blank'
                rel='noreferrer'
                className='col-6 btn btn-sm btn-info btn-link text-white text-decoration-none'
              >
                Learn more
              </a>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default Articles;
