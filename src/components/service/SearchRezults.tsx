import React from "react";
import { useLocation } from "react-router-dom";
import { BasePage } from "../../pages/basePage/BasePage";
import { Product } from "../../pages/catalogPages/products/Product";
import { useAppSelector } from "../../store/hooks";
import { IProduct } from "../../models";

export function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const searchResults = useAppSelector((state) => location.state?.results || []);

  return (
    <BasePage>
      <div className="searchResults-container">
        <h2>Результаты поиска для запроса: {query}</h2>
        {searchResults.map((product: IProduct) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </BasePage>
  );
}