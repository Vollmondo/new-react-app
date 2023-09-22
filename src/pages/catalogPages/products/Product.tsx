import React from "react";
import { IProduct } from "../../../models";
import './Product.css';
import { Link } from "react-router-dom";

interface ProductProps {
    product: IProduct
}

export function Product({product}: ProductProps){

    return(
        <div className="product-el">
            <div className="product-el-addBlock">
                <img className='product-el-fav' src='../img/icons8-heart-64.png' alt='Добавить в избранное'/>
                <p className="product-el-category">{product.category}</p>
            </div>
            <Link to={`/cat/${product._id}`} key={product._id}>
                <div className="product-el-link">
                    <img className="product-el-img" src={product.image} alt="Фото товара" loading="lazy"/>
                    <p className="product-el-title">{product.title}</p>
                    <p className="product-el-price">&#127820;&nbsp;{product.price}</p>
                </div>
            </Link>           
            <button className="product-el-addToCart" >Добавить в корзину</button>
        </div>
    )
}