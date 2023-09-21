import React, { useEffect, useState } from "react";
import { BasePage } from "../basePage/BasePage";
import { getFavoriteProducts  } from "../../api/api";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { Product } from "../catalogPages/products/Product";
import { IProduct } from "../../models";
import { Link } from "react-router-dom";
import { receivedFavProducts } from "../../store/FavProducts.Slice";

export function FavPage(){
    const dispatch = useAppDispatch();
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
            <div className="products-container">
            {Object.values(products).map((product) => (
                        <Link to={`/cat/${product._id}`} key={product._id}>
                        <Product product={product} />
                    </Link>))}
            </div>
        </BasePage>
    );
}