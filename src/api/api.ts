import { IProduct } from "../models";

export async function getProducts(): Promise<IProduct[]> {
    const response = await fetch("http://localhost:5000/products/");
    const products = response.json();
    return products;
  }

  export async function getProductItem(productId: string): Promise<IProduct> {
    const response = await fetch(`http://localhost:5000/products/${productId}`);
    const productItem = response.json();
    return productItem;
  }
  
  export type CartItems = { [productID: string]: number };
  export type CheckoutResponse = { success: boolean; error?: string };
  
  export async function checkout(items: CartItems): Promise<CheckoutResponse> {
    const modifier = Object.keys(items).length > 0 ? "success" : "error";
    const url = `/checkout-${modifier}.json`;
    await sleep(500);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(items),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error);
    }
    return data as CheckoutResponse;
  }

  const sleep = (time: number) =>
  new Promise((res) => setTimeout(res, time));