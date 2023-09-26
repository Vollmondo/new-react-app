import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { BasePage } from "../../pages/basePage/BasePage";
import { ProductRow } from "../../pages/catalogPages/products/ProductRow";
import { useAppSelector } from "../../store/hooks";
import { IProduct } from "../../models";
import { Search } from "./Search";

export function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const searchResults = useAppSelector((state) => location.state?.results || []);
  
  return (
    <BasePage>
      <div className="searchResults-container">
        <h2>Результаты поиска для запроса: {query}</h2>
        {searchResults.length > 0 ? (
          searchResults.map((product: IProduct) => (
            <ProductRow key={product._id} product={product} />
          ))
        ) : (
          <p>По вашему запросу не найдено ни одного товара</p>
        )}
      </div>
    </BasePage>
  );
}