import React, { useEffect, useState } from "react";
import "./ProductsPage.css";
import { Product } from "./products/Product";
import { ErrorMessage } from "../../components/service/ErrorMessage";
import { Loader } from "../../components/service/Loader";
import { BasePage } from "../basePage/BasePage";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCategories, getProducts } from "../../api/api";
import { receivedProducts } from "../../store/Products.Slice";
import { Sidebar } from "../basePage/sidebar/Sidebar";
import { ICategory } from "../../models";
import { receivedCategories } from "../../store/Categories.Slice";
import { Link } from "react-router-dom";

export function ProductsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  const [selectedCategory, setSelectedCategory] = useState("");
  const products = useAppSelector((state) => state.products.products);

  useEffect(() => {
    setLoading(true);
    Promise.all([getProducts(), getCategories()])
      .then(([products, categories]) => {
        dispatch(receivedProducts(products));
        dispatch(receivedCategories(categories));
        setLoading(false);
      })
      .catch((error) => {
        setError("Не удалось загрузить товары и категории");
        setLoading(false);
      });
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <BasePage>
      <div className="products-page-container">
        <Sidebar onCategorySelect={handleCategorySelect} categories={categories} children={[]} />
        <div className="products-page">
          {loading && <Loader />}
          {error && <ErrorMessage error={error} />}
          <div className="products-container">
            {Object.values(products)
              .filter((product) => selectedCategory === "" || product.category === selectedCategory)
              .map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </div>
      </div>
    </BasePage>
  );
}