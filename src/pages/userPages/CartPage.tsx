import React from "react";
import { BasePage } from "../basePage/BasePage";
import "./CartPage.css";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { getTotalPrice, removeFromCart } from "../../store/Cart.Slice";

export function CartPage() {
  const dispatch = useAppDispatch();
  const userJSON = localStorage.getItem('userJSON');
  const products = useAppSelector((state) => state.products.products);
  const items = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector(getTotalPrice);

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
              <button aria-label={`Remove ${products[id].title} Cart`} onClick={() => dispatch(removeFromCart(id))}
              >X</button>
            </td>
          </tr>
        ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
            <td className='total'>${totalPrice}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <form id="usersCart">
        <button className='button' type="submit">
          Checkout
        </button>
      </form>
                <p>Количество выбранных товаров: </p>
                
            </div>
        </BasePage>
    )
}