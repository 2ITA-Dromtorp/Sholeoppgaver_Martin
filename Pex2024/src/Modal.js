import React from 'react';
import ReactDOM from 'react-dom';
import './modalStyles.css'; // Import the CSS file for the modal

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
