import React, {useState} from "react";
import { IProduct } from "../../models";
import './Product.css';

interface ProductProps {
    product: IProduct
}

export function Product({product}: ProductProps){
    const [details, setDetails] = useState(false)

    /* const btnDetailsClassNameStatic = ["product-el-btn"]
    const btnDetailsClassNameDinamic = details ? "show" : "hide";
    const btnDetailsClassName = [btnDetailsClassNameStatic, btnDetailsClassNameDinamic] */

    return(
        <div className="product-el">
            <div className="product-el-link">
                <p className="product-el-category">{product.category}</p>
                <img className="product-el-img" src={product.image} alt="Фото товара" loading="lazy"/>
                <p className="product-el-title">{product.title}</p>
                <p className="product-el-price">{product.price} &#127820;</p>
            </div>           
           {/*  <button
                className={btnDetailsClassName.join(' ')}
                onClick={() => setDetails(prev => !prev)}
            >
                {details ? 'Скрыть': 'Подробнее'}
            </button>
            {details && <div className="product-el-detailsBlock">
                <p className="product-el-details">{product.description}</p>
                <p className="product-el-rate">{product.rating.rate}</p>
            </div>} */}
            <button 
                className="product-el-addToCart"
            >
                Добавить в корзину
            </button>
        </div>
    )
}