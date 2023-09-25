import React, { useEffect, useState } from "react";
import { IProduct } from "../../../models";
import './Product.css';
import { Link } from "react-router-dom";
import { FavButton } from "../../../components/service/FavButton";

interface ProductProps {
  product: IProduct
}

export function Product({ product }: ProductProps) {
  const storedUserJSON = localStorage.getItem("userJSON");
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    if (storedUserJSON) {
      const user = JSON.parse(storedUserJSON);
      setUserId(user._id);
    }
  }, [storedUserJSON]);

  return (
    <div className="product-el" key={product._id}>
      <div className="product-el-addBlock">
        {userId && <FavButton favProduct={product} userId={userId} />}
        <p className="product-el-category">{product.category}</p>
      </div>
      <Link to={`/cat/${product._id}`} key={product._id}>
        <div className="product-el-link">
          <img className="product-el-img" src={product.image} alt="Фото товара" loading="lazy" />
          <p className="product-el-title">{product.title}</p>
          <p className="product-el-price">&#127820;&nbsp;{product.price}</p>
        </div>
      </Link>
      <button className="product-el-addToCart">Добавить в корзину</button>
    </div>
  );
}