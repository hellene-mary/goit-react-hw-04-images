import css from './Button.module.css';

export function Button({ onClick }) {
    return (
        <div className={css.buttonContainer}>
            <button type="button" className={css.button} onClick={onClick}>
                Load more
            </button>
        </div>
    );
}
