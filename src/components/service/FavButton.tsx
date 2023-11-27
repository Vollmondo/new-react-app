import React, { useState } from "react";
import { IProduct } from "../../models";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addFavorite, removeFavorite } from "../../store/FavProducts.Slice";
import { RootState } from "../../store/store";
import { removeFavProduct, saveFavProduct } from "../../api/api";

export function FavButton({ favProduct, userId }: { favProduct: IProduct; userId: string }) {
  const { favProducts } = useAppSelector((state: RootState) => state.favProducts);
  const dispatch = useAppDispatch();
  const worker = new Worker(new URL("../../workers/logger.worker.js", import.meta.url));

  const [isFavorites, setIsFavorites] = useState<boolean>(() => {
    const isFavoriteProduct = Object.keys(favProducts).some((key: string) => favProducts[key]._id === favProduct._id);
    return !!isFavoriteProduct;
  });

  const handleFavorites = async () => {
    if (isFavorites) {
      try {
        await removeFavProduct(userId, favProduct._id);
        worker.postMessage({ type: 'removeFav', data: { action: 'removeFav', message:`Товар ${favProduct._id} удален из избранного`, userId} });
        dispatch(removeFavorite(favProduct._id));
        setIsFavorites(false);
      } catch (error) {
        console.error("Ошибка при удалении товара из избранного:", error);
      }
    } else {
      try {
        await saveFavProduct(userId, favProduct);
        worker.postMessage({ type: 'addFav', data: { action: 'addFav', message:`Товар ${favProduct._id} добавлен в избранное`, userId} });
        dispatch(addFavorite(favProduct));
        setIsFavorites((prevState) => !prevState);
      } catch (error) {
        console.error("Ошибка при сохранении товара в избранное:", error);
      }
    }
  };

  return (
    <button 
      className={`product-el-fav ${isFavorites ? "product-el-fav-active" : ""}`} 
      onClick={handleFavorites}>
    </button>
  );
}