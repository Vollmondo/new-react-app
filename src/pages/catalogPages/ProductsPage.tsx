import React, { useState } from "react";
import "./ProductsPage.css";
import { useGetProductsQuery, useGetCategoriesQuery } from "../../api/api";

import { ErrorMessage } from "../../components/service/ErrorMessage";
import { Loader } from "../../components/service/Loader";
import { BasePage } from "../basePage/BasePage";
import { Sidebar } from "../basePage/sidebar/Sidebar";
import { Product } from "./products/Product";
import { ICategory, IProduct } from "../../models";

export function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: products, isLoading: isLoadingProducts, isError: isErrorProducts } = useGetProductsQuery();
  const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useGetCategoriesQuery();

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  if (isLoadingProducts || isLoadingCategories) {
    return <Loader />;
  }

  if (isErrorProducts || isErrorCategories) {
    return <ErrorMessage error="Не удалось загрузить товары и категории" />;
  }

  return (
    <BasePage>
      <div className="products-page-container">
        <Sidebar onCategorySelect={handleCategorySelect} categories={categories || []} children={[]} />
        <div className="products-page">
          <div className="products-container">
            {products && Object.values(products)
              .filter((product) => {
                if (selectedCategory === "") {
                  return true;
                } else if (product.category === selectedCategory) {
                  return true;
                } else {
                  const selectedCategoryObj = categories?.find((category) => category.title === selectedCategory);
                  if (selectedCategoryObj && selectedCategoryObj.children) {
                    return selectedCategoryObj.children.includes(product.category);
                  }
                }
                return false;
              })
              .map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </div>
      </div>
    </BasePage>
  );
}