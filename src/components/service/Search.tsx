import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSearchProductItemQuery } from "../../api/api";

export function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [redirectToResults, setRedirectToResults] = useState(false);

  const { data: searchResults, isLoading, isError } = useSearchProductItemQuery(searchValue);

  const handleSearch = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setRedirectToResults(true);
  };

  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchValue(e.target.value);
  };

  if (redirectToResults) {
    return (
      <Navigate
        to={`/search?query=${searchValue}`}
        state={{ results: searchResults }}
      />
    );
  }

  return (
    <>
      <form className="header-search" onSubmit={handleSearch}>
        <input
          className="header-search-input"
          value={searchValue}
          onChange={handleChange}
          placeholder="Название товара"
        />
        <button className="header-search-btn header-img search" type="submit"></button>
      </form>
    </>
  );
}