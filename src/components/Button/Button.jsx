import css from './Button.module.css';
import PropTypes from 'prop-types';

export function Button({ onClick }) {
  return (
    <div className={css.buttonContainer}>
      <button type="button" className={css.button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
}

Button.prototype = { onClick: PropTypes.func.isRequired };
