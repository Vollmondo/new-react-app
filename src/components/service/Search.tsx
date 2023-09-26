import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { SearchProductItem } from "../../api/api";
import { IProduct } from "../../models";

export function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [redirectToResults, setRedirectToResults] = useState(false);
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const productItems: IProduct[] = await SearchProductItem(searchValue);
      setSearchResults(productItems);
      setRedirectToResults(true);
    } catch (error) {
      setError("Ошибка при получении товара");
    }
  };

  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchValue(e.target.value);
  };

  if (redirectToResults) {
    return <Navigate to={`/search?query=${searchValue}`} state={{ results: searchResults }} />;
  }

  return (
    <>
      <form className="header-search" onSubmit={handleSearch}>
        <input className="header-search-input" value={searchValue} onChange={handleChange} placeholder="Название товара"/>
        <button className="header-search-btn header-img search" type="submit"></button>
      </form>
    </>
  );
}