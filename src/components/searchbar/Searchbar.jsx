import css from './Searchbar.module.css';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';

export function Searchbar({ onSubmit }) {
    return (
        <header className={css.searchbar}>
            <form className={css.searchForm} onSubmit={onSubmit}>
                <button type="submit" className={css.searchFormButton}>
                    <SearchIcon width="22" height="22" />
                    {/* <span className="SearchForm-button-label">Search</span> */}
                </button>

                <input
                    name="search"
                    className={css.searchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
}
