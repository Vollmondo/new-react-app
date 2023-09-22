import React, { useContext, useEffect, useState } from "react";
import './ProductsPage.css';
import { Product } from "./products/Product";
import { IProduct, ISliderData } from "../../models";
import { ErrorMessage } from "../../components/service/ErrorMessage";
import { Loader } from "../../components/service/Loader";
import { ModalWindowContext } from "../../context/ModalWindowContext";
import { BasePage } from "../basePage/BasePage";
import { Slider } from "../../components/service/Slider";
import { Link } from "react-router-dom";
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
                        <Product product={product} />
                    ))}
                    </div>
                </div>
            </BasePage>
        </>
       
    )
}
    
