import React, { useEffect, useState } from "react";
import { IProduct } from "../../models";
import axios, { AxiosError } from "axios";
import { Loader } from "../../components/service/Loader";
import { ErrorMessage } from "../../components/service/ErrorMessage";
import { BasePage } from "../basePage/BasePage";
import { useParams } from "react-router-dom";
import './ProductDetails.css'
import { ViewedProducts } from "./ViewedProducts";

export function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [activeTab, setActiveTab] = useState('ProdDescription');


  async function fetchProductDetails(productId: string) {
    try {
      setError("");
      setLoading(true);
      const response = await axios.get<IProduct>(
        `http://localhost:5000/products/${productId}`
      );
      setProduct(response.data);
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

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return <ErrorMessage error="Не удалось загрузить информацию о товаре" />;
  }

  const openTab = (event: any, tabId: React.SetStateAction<string>) => {
    setActiveTab(tabId);
  };
  
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
              <div className="productDetails-additionalImgs">
                <div className="testimg">ДОП ФОТО</div>                
                <div className="testimg">ДОП ФОТО</div>
                <div className="testimg">ДОП ФОТО</div>
                <div className="testimg">ДОП ФОТО</div>
                <div className="testimg">ДОП ФОТО</div>
                <div className="testimg">ДОП ФОТО</div>
                <div className="testimg">ДОП ФОТО</div>

              </div>
            </div>
            <div className="productDetails-infoblock">
              <div className="productDetails-upperRow">
                <div className="productDetails-cat">
                  <p>{product.category}</p>
                </div>
              </div>
              <div className="productDetails-midRow">
                <div className="productDetails-chars">ХАРАКТЕРИСТИКИ ТОВАРА</div>
              </div>
              <div className="productDetails-lowerRow">
                <div className="productDetails-price">
                  <p>{product.price} &#127820;</p>
                </div>
                <div className="productDetails-addToCart">
                  <div className="productDetails-number">
                    <button className="number-minus" type="button" onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}>-</button>
                    <input className="productDetails-quantity" type="number" min="0" max="99" required step="1" placeholder="Кол-во" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}></input>
                    <button className="number-plus" type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                  <button className="productDetails-buyBtn"></button>
                </div>
              </div>
            </div>
          </div>
          <div className="productDetails-additionalBlock">
          <div className="productDetails-tab">
            <button className={`tablinks ${activeTab === 'ProdDescription' ? 'active' : ''}`} onClick={(e) => openTab(e, 'ProdDescription')}>Подробное описание</button>
            <button className={`tablinks ${activeTab === 'ProdChars' ? 'active' : ''}`} onClick={(e) => openTab(e, 'ProdChars')}>Характеристики</button>
            <button className={`tablinks ${activeTab === 'ProdRefs' ? 'active' : ''}`} onClick={(e) => openTab(e, 'ProdRefs')}>Отзывы</button>
          </div>
          {activeTab === 'ProdDescription' && (
            <div className="productDetails-description active" id="ProdDescription">
              <p className="productDetails-tabcontent">{product.description}</p>
            </div>
          )}
          {activeTab === 'ProdChars' && (
            <div className="productDetails-ProdChars active" id="ProdChars">
              <p className="productDetails-tabcontent">{product.description}</p>
            </div>
          )}
          {activeTab === 'ProdRefs' && (
            <div className="productDetails-refs active" id="ProdRefs">
              <p className="productDetails-tabcontent">{product.description}</p>
            </div>
          )}
            
            <div className="productDetails-viewedProducts">
              <ViewedProducts />
            </div>
          </div>
        </div>
      </div>
    </BasePage>
  );
}