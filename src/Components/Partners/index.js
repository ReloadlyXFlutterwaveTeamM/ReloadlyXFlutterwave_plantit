import React from 'react';

/**
 * @name Partners
 *
 * @param {Object} props
 * @param {Object} props.partners
 * @param {string} props.partners.title - the partners name
 * @param {string} props.partners.alt - the logo images alt
 * @param {string} props.partners.src - the logo's image src
 * @param {string} props.partners.url - the url to the partner site
 */
const Partners = ({ partners }) => (
  <div className='mt-4 d-none d-md-flex flex-column'>
    <div className='fw-bold mb-2'>Climate Partners</div>

    <div className='d-flex'>
      {partners.map((partner) => {
        const { title, alt, src } = partner;
        return (
          <div
            key={title}
            style={{ height: '10rem', width: '10rem' }}
            className='m-1 shadow-sm d-flex flex-column align-items-center justify-content-center border border-1 rounded-3'
          >
            <img
              alt={alt}
              title={title}
              className='rounded-3'
              style={{ height: '50%' }}
              src={`${process.env.PUBLIC_URL}/assets/logos/${src}`}
            />

            <div className='small text-center text-muted mt-2'>{title}</div>
          </div>
        );
      })}

      <div
        style={{ height: '10rem', width: '10rem' }}
        className='m-1 d-flex flex-column align-items-center justify-content-center'
      >
        <div className='text-center small'>Want to be a partner?</div>
        <div className='text-center small'>We’ll be glad to have you!</div>

        <a
          href='mailto:lutbrianivan@gmail.com?subject=Intent For a Partnership'
          target='_blank'
          rel='noreferrer'
          className='text-center text-info fw-bold mt-3 text-decoration-none'
        >
          Join Us
        </a>
      </div>
    </div>
  </div>
);

export default Partners;
