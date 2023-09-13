import React, { useEffect, useState } from "react";
import { IProduct } from "../../models";
import axios, { AxiosError } from "axios";
import { Loader } from "../../components/service/Loader";
import { ErrorMessage } from "../../components/service/ErrorMessage";
import { BasePage } from "../basePage/BasePage";
import { useParams } from "react-router-dom";
import './ProductDetails.css'

export function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchProductDetails(productId: string) {
    try {
      setError("");
      setLoading(true);
      const response = await axios.get<IProduct>(
        `http://localhost:5000/products/${productId}`
      );
      setProduct(response.data);
      setLoading(false);
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

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return <ErrorMessage error="Не удалось загрузить информацию о товаре" />;
  }

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
              <img className="productDetails-img" src={product.image} alt={product.title} />
            </div>
            <div className="productDetails-infoblock">
              <div className="productDetails-cat">
                <p>{product.category}</p>
              </div>
              <div className="productDetails-price">
                <p>{product.price}</p>
                <input type="number" step="1" placeholder="Кол-во"></input>
              </div>
            </div>
          </div>
          <div className="productDetails-additionalBlock">
            <div className="productDetails-description">
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </BasePage>
  );
}