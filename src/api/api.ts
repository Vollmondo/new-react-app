import { ICategory, IOrder, IProduct } from "../models";

export async function getProducts(): Promise<IProduct[]> {
  const response = await fetch("http://localhost:5000/products");
  const products = await response.json();
  return products;
}

export async function getCategories(): Promise<ICategory[]> {
  const response = await fetch("http://localhost:5000/categories");
  const products = await response.json();
  return products;
}

export async function getOrders(): Promise<IOrder[]> {
  const response = await fetch("http://localhost:5000/orders");
  const orders = await response.json();
  return orders;
}

export async function getProductItem(productId: string): Promise<IProduct> {
  const response = await fetch(`http://localhost:5000/products/${productId}`);
  if (!response.ok) {
    throw new Error("Ошибка при получении товара");
  }
  const productItem = await response.json();
  return productItem;
}

export type CartItems = { [productID: string]: number };
export type CheckoutResponse = { success: boolean; error?: string };

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

export async function SearchProductItem(productTitle: string): Promise<IProduct[]> {
  const response = await fetch('http://localhost:5000/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productTitle })
  });

  if (!response.ok) {
    throw new Error('Ошибка при получении товара');
  }

  const productItems = await response.json();
  return productItems;
}