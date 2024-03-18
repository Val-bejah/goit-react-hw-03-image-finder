import React, { useEffect } from 'react';

const Modal = ({ imageUrl, alt, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="Overlay" onClick={onClose}>
      <div className="Modal">
        <img src={imageUrl} alt={alt} />
      </div>
    </div>
  );
};

export default Modal;
