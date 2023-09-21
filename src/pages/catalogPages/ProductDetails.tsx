import React, { useEffect, useState } from "react";
import { IProduct } from "../../models";
import axios, { AxiosError } from "axios";
import { Loader } from "../../components/service/Loader";
import { ErrorMessage } from "../../components/service/ErrorMessage";
import { BasePage } from "../basePage/BasePage";
import { useParams } from "react-router-dom";
import './ProductDetails.css'
import { ViewedProducts } from "./ViewedProducts";
import { TabComp } from "./productDetailsComponents/TabComp";
import { PhotoComp } from "./productDetailsComponents/PhotoComp";
import { CharComp } from "./productDetailsComponents/CharComp";
import { addToCart } from "../../store/Cart.Slice";
import { useAppDispatch } from "../../store/hooks";
import { getProductItem } from "../../api/api";

export function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(0);
  const dispatch = useAppDispatch()


  async function fetchProductDetails(productId: string) {
    try {
      setError("");
      setLoading(true);
      const productItem = await getProductItem(productId);
      setProduct(productItem); 
      setLoading(false);

      const viewedProducts = localStorage.getItem("viewedProducts") || "";
      const updatedViewedProducts = viewedProducts + productId + ",";

      if (!viewedProducts.includes(productId)) {
        localStorage.setItem("viewedProducts", updatedViewedProducts);
      }

    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id]);

  if (loading) {return <Loader />;}
  if (!product) {return <ErrorMessage error="Не удалось загрузить информацию о товаре" />;} 

  return (
    <BasePage>
      <div className="productDetails">
        {error && (
          <ErrorMessage error="Не удалось загрузить информацию о товаре" />
        )}
        <div className="product-container">
          <div className="productDetails-title">
            <h2>{product.title}</h2>
          </div>
          <div className="productDetails-mainBlock">
            <div className="productDetails-imgCont">
              <PhotoComp product={product}/>
            </div>
            <div className="productDetails-infoblock">
              <div className="productDetails-upperRow">
                <div className="productDetails-cat">
                  <p>{product.category}</p>
                </div>
              </div>
              <div className="productDetails-midRow">
                <CharComp product={product}/>
              </div>
              <div className="productDetails-lowerRow">
                <div className="productDetails-price">
                  <p>&#127820;&nbsp;{product.price}</p>
                </div>
                <div className="productDetails-addToCart">
                  <div className="productDetails-number">
                    <button className="number-minus" type="button" onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}>-</button>
                    <input className="productDetails-quantity" type="number" min="0" max="99" required step="1" placeholder="Кол-во" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}></input>
                    <button className="number-plus" type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                  <button className="productDetails-buyBtn" onClick={() => dispatch(addToCart(product._id))}></button>
                </div>
              </div>
            </div>
          </div>
          <div className="productDetails-additionalBlock">
            <TabComp product={product} />
            <div className="productDetails-viewedProducts">
              <ViewedProducts />
            </div>
          </div>
        </div>
      </div>
    </BasePage>
  );
}