import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export function Modal({ onClose, image }) {
  const { url, alt } = image;

  useEffect(() => {
    window.addEventListener('keydown', keydownClick);

    return () => {
      window.removeEventListener('keydown', keydownClick);
    };
  });

  function backdropClick(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  function keydownClick(evt) {
    if (evt.code === 'Escape') {
      onClose();
    }
  }

  return (
    <div className={css.overlay} onClick={backdropClick}>
      <div className={css.modal}>
        <img src={url} alt={alt} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
};
