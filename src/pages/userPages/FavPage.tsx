import React, { useEffect, useState } from "react";
import { BasePage } from "../basePage/BasePage";
import { getFavoriteProducts } from "../../api/api";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { ProductRow } from "../catalogPages/products/ProductRow";
import { loadFavProducts } from "../../store/FavProducts.Slice";
import { Loader } from "../../components/service/Loader";
import { ErrorMessage } from "../../components/service/ErrorMessage";

export function FavPage() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      const id = user.user?._id;

      if (id) {
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
      } else {
        setError("ID пользователя отсутствует");
      }
    }
  }, [dispatch, user]);

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
                <ProductRow key={product._id} product={product} />
            </div>
            ))}
        </div>
      )}
    </BasePage>
  );
}