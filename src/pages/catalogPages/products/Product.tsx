import React, { useEffect, useState } from "react";
import { IProduct } from "../../../models";
import './Product.css';
import { Link } from "react-router-dom";
import { FavButton } from "../../../components/service/FavButton";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

interface ProductProps {
  product: IProduct
}

export function Product({ product }: ProductProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    setUserId(user.user?._id || "");
  }, [user.user]);

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