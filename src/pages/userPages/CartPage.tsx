import React from "react";
import { BasePage } from "../basePage/BasePage";
import "./CartPage.css";
import { useAppSelector } from "../../store/hooks";

export function CartPage() {
    const userJSON = localStorage.getItem('userJSON');
    const products = useAppSelector((state) => state.products.products);
    const items = useAppSelector((state) => state.cart.items)

    return(
        <BasePage>
            <div>
                <h2>Корзина</h2>
                <table className='table'>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
        {Object.entries(items).map(([id, quantity]) => (
          <tr>
            <td>{products[id].title}</td>
            <td>
              <input type="text" className='input' defaultValue={quantity} />
            </td>
            <td>${products[id].price}</td>
            <td>
              <button aria-label={`Remove ${products[id].title} Cart`}>
                X
              </button>
            </td>
          </tr>
        ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
            <td className='total'>${0.0}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <form>
        <button className='button' type="submit">
          Checkout
        </button>
      </form>
                <p>Количество выбранных товаров: </p>
                
            </div>
        </BasePage>
    )
}