import "./SearchBar.scss";
import CloseButton from "../../assets/images/close-line-icon.png";
import {forwardRef } from "react";

type SearchBarProps = {
  handleSearch: () => void;
  resetSearch: () => void;
  urlSearchString: string | null;
};

const SearchBar = 
  forwardRef<HTMLInputElement, SearchBarProps>( ({ handleSearch, resetSearch, urlSearchString }, ref) => {

    return (
        <div className="searchbar">
          <form className="searchbar__form">
            <input
              name="searchInput"
              ref={ref} 
              type="text" 
              className="searchbar__input"
              placeholder="Search by Shabad, Sevadar or Samagam"
              defaultValue={urlSearchString !== null ? `${urlSearchString}` : ""}
              onChange={handleSearch}
            ></input>
            <img
              src={CloseButton}
              alt="clear search"
              className="searchbar__close-button"
              onClick={resetSearch}
            ></img>
          </form>
        </div>
      );
}
)

export default SearchBar;
