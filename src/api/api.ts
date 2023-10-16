import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IArticle, ICategory, IOrder, IProduct } from '../models';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => 'products',
    }),
    getCategories: builder.query<ICategory[], void>({
      query: () => 'categories',
    }),
    getOrders: builder.query<IOrder[], void>({
      query: () => 'orders',
    }),

    getFavoriteProducts: builder.query<IProduct[], string>({
      query: (userId) => `userProfile/${userId}/fav`,
    }),
    saveFavProduct: builder.mutation<void, { userId: string, product: IProduct }>({
      query: ({ userId, product }) => ({
        url: `userProfile/${userId}/fav/${product._id}`,
        method: 'POST',
        body: product._id,
      }),
    }),
    removeFavProduct: builder.mutation<void, { userId: string, productId: string }>({
        query: ({ userId, productId }) => ({
          url: `userProfile/${userId}/fav/${productId}`,
          method: 'DELETE',
        }),
      }),
    getCustomersOrders: builder.query<IOrder[], string>({
        query: (userId) => `userProfile/${userId}/orders`,
      }),
    checkout: builder.mutation<CheckoutResponse, IOrder>({
      query: (order) => ({
        url: 'checkout-success.json',
        method: 'POST',
        body: order,
      }),
    }),
    searchProductItem: builder.query<IProduct[], string>({
        query: (productTitle) => ({
          url: 'search',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productTitle }),
        }),
    }),
    fetchNews: builder.query<IArticle[], void>({
        query: () => 'articles',
      }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetOrdersQuery,
  useGetFavoriteProductsQuery,
  useSaveFavProductMutation,
  useRemoveFavProductMutation,
  useGetCustomersOrdersQuery,
  useCheckoutMutation,
  useSearchProductItemQuery,
  useFetchNewsQuery,
} = api;

export type CartItems = { [productID: string]: number };
export type CheckoutResponse = { success: boolean; error?: string };

  export async function getProductItem(productId: string): Promise<IProduct> {
    const response = await fetch(`http://localhost:5000/products/${productId}`);
    if (!response.ok) {
      throw new Error("Ошибка при получении товара");
    }
    const productItem = await response.json();
    return productItem;
  }

  export async function getOrders(): Promise<IOrder[]> {
    const response = await fetch('http://localhost:5000/orders');
    if (!response.ok) {
      throw new Error("Ошибка при получении заказов");
    }
    const orders = await response.json();
    return orders;
  }
  
  export async function checkout(order: IOrder): Promise<CheckoutResponse> {
    const modifier = Object.keys(order.items).length > 0 ? "success" : "error";
    const url = `http://localhost:5000/checkout-${modifier}.json`;
    await sleep(500);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error);
    }
    return data as CheckoutResponse;
  }
  
  const sleep = (time: number) =>
    new Promise((res) => setTimeout(res, time));
  
  export async function getFavoriteProducts(userId: string): Promise<IProduct[]> {
    try {
      const response = await fetch(`http://localhost:5000/userProfile/${userId}/fav`);
      if (!response.ok) {
        throw new Error("Ошибка при получении избранных товаров");
      }
      const favoriteProductIds = await response.json();
  
      const favoriteProducts = await Promise.all(
        favoriteProductIds.map((productId: string) => getProductItem(productId))
      );
  
      return favoriteProducts;
    } catch (error) {
      console.error("Ошибка при получении избранных товаров:", error);
      return [];
    }
  }
  
  export async function fetchFavProducts(userId: string): Promise<IProduct[]> {
    try {
      const response = await fetch(`http://localhost:5000/userProfile/${userId}/fav`);
      if (!response.ok) {
        throw new Error("Ошибка при получении избранных товаров");
      }
      const favoriteProductIds = await response.json();
  
      const favoriteProducts = await Promise.all(
        favoriteProductIds.map((productId: string) => getProductItem(productId))
      );
  
      return favoriteProducts;
    } catch (error) {
      console.error("Ошибка при получении избранных товаров:", error);
      return [];
    }
  }
  
  export async function saveFavProduct(userId: string, product: IProduct) {
    try {
      const response = await fetch(`http://localhost:5000/userProfile/${userId}/fav/${product._id}`, {
        method: "POST",
        body: JSON.stringify(product._id),
      });
      if (!response.ok) {
        throw new Error("Ошибка при сохранении товара в избранное");
      }
    } catch (error) {
      console.error("Ошибка при сохранении товара в избранное:", error);
      throw error;
    }
  }
  
  export async function removeFavProduct(userId: string, productId: string): Promise<void> {
    try {
      const response = await fetch(`http://localhost:5000/userProfile/${userId}/fav/${productId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Ошибка при удалении товара из избранного");
      }
    } catch (error) {
      console.error("Ошибка при удалении товара из избранного:", error);
      throw error;
    }
  }
  
  export async function getCustomersOrders(userId: string): Promise<IOrder[]> {
    try {
      const response = await fetch(`http://localhost:5000/userProfile/${userId}/orders`);
      if (!response.ok) {
        throw new Error("Ошибка при получении избранных товаров");
      }
      const customersOrders = await response.json();
  
      return customersOrders;
    } catch (error) {
      console.error("Ошибка при получении избранных товаров:", error);
      return [];
    }
  }
  