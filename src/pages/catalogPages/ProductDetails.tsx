import React, { useEffect, useState } from "react";
import { IProduct } from "../../models";
import axios, { AxiosError } from "axios";
import { Loader } from "../../components/service/Loader";
import { ErrorMessage } from "../../components/service/ErrorMessage";
import { BasePage } from "../basePage/BasePage";
import { useParams } from "react-router-dom";

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
          <div className="productDetails-img">
            <img className="profile-photo" src={product.image} alt={product.title} />
          </div>
          <div className="productDetails-img">{product.category}</div>
          <div className="productDetails-img">{product.title}</div>
          <div className="productDetails-img">{product.price}</div>
          <div className="productDetails-img">{product.description}</div>
        </div>
      </div>
    </BasePage>
  );
}