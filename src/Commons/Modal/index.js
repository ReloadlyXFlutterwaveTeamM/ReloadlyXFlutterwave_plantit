import React from 'react';

const Modal = ({ children, modal_id, onClose, onSubmit, confirm_btn_msg, cancel_btn_msg }) => {
  const onAgree = () => {
    onSubmit();
    onClose();
  };

  const onDisagree = () => {
    onClose();
  };

  return (
    <div tabIndex='-1' id={modal_id} className='modal'>
      <div className='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
        <div className='modal-content'>
          <div className='modal-body d-flex flex-column align-items-center justify-content-center'>
            {children}
          </div>

          <div className='modal-footer flex-nowrap p-0'>
            <button
              type='button'
              onClick={onAgree}
              className='btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0 border-right'
            >
              <strong>{confirm_btn_msg || 'Yes, proceed'}</strong>
            </button>
            <button
              type='button'
              onClick={onDisagree}
              className='btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0'
            >
              {cancel_btn_msg || 'No thanks'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
