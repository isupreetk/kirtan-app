import React from 'react';
import "./SearchBar.scss";
import CloseButton from "../../assets/images/close-line-icon.png";

const SearchBar = () => {
    return (
        <div className="searchbar">
          <form className="searchbar__form">
            <input
              name="searchInput"
              className="searchbar__input"
              placeholder="Search by Shabad, Sevadar or Samagam"
            ></input>
            <img
              src={CloseButton}
              alt="clear search"
              className="searchbar__close-button"
            ></img>
          </form>
        </div>
      );
}

export default SearchBar;
