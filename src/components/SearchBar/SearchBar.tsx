import React from 'react';
import "./SearchBar.scss";
import CloseButton from "../../assets/images/close-line-icon.png";
import {forwardRef } from "react";


// interface SearchBarProps = {
  // inputRef: HTMLInputElement;
  // setState: (val: string) => void;
  // handleSearch: () => void;
  // resetSearch: () => void;
  // placeholder: string;
// };


const SearchBar = React.forwardRef<HTMLInputElement>((props, ref) => {
  // <HTMLInputElement, SearchBarProps>
  console.log(ref);
// ({ inputRef } : { inputRef : HTMLInputElement }) => {

  // let inputRef = useRef<HTMLInputElement>(null); // moved to HomePage
  
  // const handleSearch = () => {
  //   console.log("inputRef", inputRef.current?.value);
  // }

  // const resetSearch = () => {
  //   // if (inputRef.current) {
  //   //   inputRef.current.value = "";
  //   // }
  //   /* replaced the if statement above with the following line */
  //     inputRef.current!.value = "";
  // }

    return (
        <div className="searchbar">
          <form className="searchbar__form">
            <input
              name="searchInput"
              ref={ref} type="text" 
              className="searchbar__input"
              placeholder="Search by Shabad, Sevadar or Samagam"
              // defaultValue={urlSearchString !== null ? `${urlSearchString}` : ""}
              defaultValue="" // comment this when uncomment above line
              // onChange={handleSearch}
            ></input>
            <img
              src={CloseButton}
              alt="clear search"
              className="searchbar__close-button"
              // onClick={resetSearch}
            ></img>
          </form>
        </div>
      );
}
)

export default SearchBar;
