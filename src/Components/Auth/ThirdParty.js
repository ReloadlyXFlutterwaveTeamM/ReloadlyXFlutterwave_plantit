import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoApple } from 'react-icons/io';
import { FaFacebookF } from 'react-icons/fa';

const ThirdParty = () => (
  <div className='row justify-content-center align-items-center'>
    <div className='col-12 mt-2 d-flex flex-row justify-content-center align-items-center'>
      <div className='col border-top border-2 border-light' />
      <div className='col-6 form-text text-center'>or do it via other accounts</div>
      <div className='col border-top border-2 border-light' />
    </div>

    <div className='col-6 mt-2 d-flex flex-row align-items-center justify-content-center'>
      <span className='border border-2 border-light rounded-3 p-3 mx-2'>
        <FcGoogle size='1.5rem' />
      </span>

      <span className='border border-2 border-light rounded-3 p-3 mx-2'>
        <IoLogoApple size='1.5rem' color='#000' />
      </span>

      <span className='border border-2 border-light rounded-3 p-3 mx-2'>
        <FaFacebookF size='1.5rem' color='#3B5999' />
      </span>
    </div>
  </div>
);

export default ThirdParty;
