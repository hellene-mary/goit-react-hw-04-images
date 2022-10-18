import css from './Searchbar.modale.css';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';

export function Searchbar({ onSubmit }) {
    return (
        <header className="Searchbar">
            <form className="SearchForm" onSubmit={onSubmit}>
                <button type="submit" className="SearchFormButton">
                    <SearchIcon width="22" height="22" />
                    {/* <span className="SearchForm-button-label">Search</span> */}
                </button>

                <input
                    name="search"
                    className="SearchFormInput"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
}
