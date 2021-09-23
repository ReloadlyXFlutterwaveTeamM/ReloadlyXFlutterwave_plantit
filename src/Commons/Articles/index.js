import React from 'react';

const Articles = ({ articles }) => (
  <div className='mt-4 d-none d-md-flex flex-column'>
    <div className='fw-bold mb-2'>Learn about Climate Change</div>

    <div className='d-flex'>
      {articles.map((article) => {
        const { title, description, link } = article;
        return (
          <div className='m-1 p-3 d-flex flex-column shadow-sm border border-1 rounded-3'>
            <div className='fw-bold'>{title}</div>
            <div className='text-muted small'>{description}</div>

            <div className='d-grid gap-2 mt-3'>
              <a
                href={link}
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
