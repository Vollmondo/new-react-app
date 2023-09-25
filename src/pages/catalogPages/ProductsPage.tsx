import React, { useEffect, useState } from "react";
import './ProductsPage.css';
import { Product } from "./products/Product";
import { ErrorMessage } from "../../components/service/ErrorMessage";
import { Loader } from "../../components/service/Loader";
import { BasePage } from "../basePage/BasePage";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getProducts } from "../../api/api";
import { receivedProducts } from "../../store/Products.Slice";

export function ProductsPage(){
    const [loading, setLoading]= useState(false);
    const [error, setError] = useState('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        getProducts().then((products) => {
        dispatch(receivedProducts(products));
        });
    }, []);

    const products = useAppSelector ((state) => state.products.products)
    
    

    return(
        <>
            <BasePage>
                <div className="products-page">
                    {loading && <Loader />}
                    {error && <ErrorMessage error="Не удалось загрузить товары"/>}
                    <div className="products-container">
                    {Object.values(products).map((product) => (                   
                        <Product key={product._id} product={product} />
                    ))}
                    </div>
                </div>
            </BasePage>
        </>
       
    )
}
    
