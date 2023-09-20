import React from "react";
import { BasePage } from "../basePage/BasePage";
import "./CartPage.css";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { getTotalPrice, removeFromCart, updateQuantity } from "../../store/Cart.Slice";

export function CartPage() {
  const dispatch = useAppDispatch();
  const userJSON = localStorage.getItem('userJSON');
  const products = useAppSelector((state) => state.products.products);
  const items = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector(getTotalPrice);
  
  function onQuantityChanged(e: React.FocusEvent<HTMLInputElement>, id: string){
    const quantity = Number(e.target.value) || 0;
    dispatch(updateQuantity({id, quantity}))
  }
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
              <input type="number" className='input' defaultValue={quantity} onBlur={(e) => {onQuantityChanged(e, id)}}/>
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
            </div>
        </BasePage>
    )
}