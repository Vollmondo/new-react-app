import React, { useEffect, useState } from "react";
import { BasePage } from "../basePage/BasePage";
import { getFavoriteProducts  } from "../../api/api";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { Product } from "../catalogPages/products/Product";
import { Link } from "react-router-dom";
import { receivedFavProducts } from "../../store/FavProducts.Slice";
import { Loader } from "../../components/service/Loader";
import { ErrorMessage } from "../../components/service/ErrorMessage";

export function FavPage(){
    const dispatch = useAppDispatch();
    const [loading, setLoading]= useState(false);
    const [error, setError] = useState('');
    const storedUserJSON = localStorage.getItem("userJSON");

    useEffect(() => {
        if (storedUserJSON) {
            const user = JSON.parse(storedUserJSON);
            const id = user._id;  

            getFavoriteProducts(id).then((products) => {
                dispatch(receivedFavProducts(products))
            });
        }
    }, []);

    const products = useAppSelector ((state) => state.favProducts.favProducts)

    return (
        <BasePage>
            <h1>Избранное</h1>
            {loading && <Loader />}
            {error && <ErrorMessage error="Не удалось загрузить товары"/>}
            {Object.keys(products).length === 0 ? (
                <p>Вы еще ничего не добавили в Избранное</p>
            ) : (
                <div className="products-container">
                    {Object.values(products).map((product) => (
                    <Link to={`/cat/${product._id}`} key={product._id}>
                        <Product product={product} />
                    </Link>
                    ))}
                </div>
            )}
            
        </BasePage>
    );
}