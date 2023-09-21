import React from "react";
import { IProduct } from "../../../models";
import './Product.css';

interface ProductProps {
    product: IProduct
}

export function Product({product}: ProductProps){

    return(
        <div className="product-el">
            <div className="product-el-link">
                <p className="product-el-category">{product.category}</p>
                <img className="product-el-img" src={product.image} alt="Фото товара" loading="lazy"/>
                <p className="product-el-title">{product.title}</p>
                <p className="product-el-price">&#127820;&nbsp;{product.price}</p>
            </div>           
            <button className="product-el-addToCart" >Добавить в корзину</button>
        </div>
    )
}