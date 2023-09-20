import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Product } from "./products/Product";
import { IProduct } from "../../models";

export function ViewedProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const viewedProducts = localStorage.getItem("viewedProducts");
  let productIds: (string | undefined)[] = []
  if (viewedProducts && viewedProducts.length > 0) {
    productIds = viewedProducts.split(",").filter(Boolean);
  }

  useEffect(() => {
    async function fetchViewedProducts() {
      

      if (productIds.length > 0) {
        try {
          const response = await axios.get<IProduct[]>(
            `http://localhost:5000/products/?ids=${productIds.join(",")}`
          );
          const filteredProducts = response.data.filter((product) =>
            productIds.includes(product._id)
          );
          setProducts(filteredProducts);
        } catch (error) {
          console.error(error);
        }
      }
    }

    fetchViewedProducts();
  }, []);

  return (
    <div>
        <h2>Ранее вы интересовались:</h2>
        <div className="productDetails-viewedProducts">
            {products.map((product) => (
                <Link to={`/cat/${product._id}`} key={product._id} className="viewedProductsLink">
                    <Product product={product} />
                </Link>
            ))}
        </div>
    </div>
  );
}