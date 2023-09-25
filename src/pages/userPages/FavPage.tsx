import React, { useEffect, useState } from "react";
import { BasePage } from "../basePage/BasePage";
import { getFavoriteProducts } from "../../api/api";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { Product } from "../catalogPages/products/Product";
import { loadFavProducts } from "../../store/FavProducts.Slice";
import { Loader } from "../../components/service/Loader";
import { ErrorMessage } from "../../components/service/ErrorMessage";

export function FavPage() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const storedUserJSON = localStorage.getItem("userJSON");

  useEffect(() => {
    if (storedUserJSON) {
      const user = JSON.parse(storedUserJSON);
      const id = user._id;

      setLoading(true);
      getFavoriteProducts(id)
        .then((products) => {
          dispatch(loadFavProducts(id));
          setLoading(false);
        })
        .catch((error) => {
          setError("Не удалось загрузить товары");
          setLoading(false);
        });
    }
  }, [dispatch, storedUserJSON]);

  const products = useAppSelector((state) => state.favProducts.favProducts);

  return (
    <BasePage>
      <h1>Избранное</h1>
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {Object.keys(products).length === 0 ? (
        <p>Вы еще ничего не добавили в Избранное</p>
      ) : (
        <div className="products-container">
          {Object.values(products).map((product) => (
            <div key={product._id}>
                <Product key={product._id} product={product} />
            </div>
            ))}
        </div>
      )}
    </BasePage>
  );
}