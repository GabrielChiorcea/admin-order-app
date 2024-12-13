import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Modal = (props) => {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    console.error('Modal root element not found');
    return null;
  }

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
