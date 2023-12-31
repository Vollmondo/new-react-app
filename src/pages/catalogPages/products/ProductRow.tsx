import React, { useEffect, useState } from "react";
import { IProduct } from "../../../models";
import './ProductRow.css';
import { Link } from "react-router-dom";
import { FavButton } from "../../../components/service/FavButton";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addToCart } from "../../../store/Cart.Slice";

interface ProductProps {
  product: IProduct
}

export function ProductRow({ product }: ProductProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    setUserId(user.user?._id || "");
  }, [user.user]);

  return (
    <div className="productItem-row" key={product._id}>
      <div className="productItem-row-img-container">
        <img className="productItem-row-img" src={product.image} alt="Фото товара" loading="lazy" />
      </div>
      <div className="productItem-row-text-container">
        <Link to={`/cat/${product._id}`} key={product._id}>
            <p className="productItem-row-text row-title">{product.title}</p>
        </Link>
      </div>
      <div className="productItem-row-text-container">
        <p className="productItem-row-text row-price">&#127820;&nbsp;{product.price}</p>
      </div>
      <div className="productItem-row-icon-container">
        {userId && <FavButton favProduct={product} userId={userId} />}
      </div>
      <div className="productItem-row-icon-container">
        <button className="productItem-row-btn" onClick={() => dispatch(addToCart({ id: product._id, quantity: 1 }))}></button>
      </div>
    </div>
  );
}