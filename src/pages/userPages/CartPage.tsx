import React from "react";
import { BasePage } from "../basePage/BasePage";
import classNames from "classnames";
import styles from "./CartPage.module.css";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { getTotalPrice, removeFromCart, updateQuantity, checkoutCart } from "../../store/Cart.Slice";
import { ErrorMessage } from "../../components/service/ErrorMessage";

export function CartPage() {
  const dispatch = useAppDispatch();
  const userJSON = localStorage.getItem('userJSON');
  const products = useAppSelector((state) => state.products.products);
  const items = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector(getTotalPrice);
  const checkoutState = useAppSelector((state) => state.cart.checkoutState);
  const errorMessage = useAppSelector(state => state.cart.errorMessage)
  
  function onQuantityChanged(e: React.FocusEvent<HTMLInputElement>, id: string){
    const quantity = Number(e.target.value) || 0;
    dispatch(updateQuantity({id, quantity}))
  }

  function onCheckout(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    dispatch(checkoutCart());
  }

  const tableClasses = classNames({
    [styles.table]:true,
    [styles.checkoutError]: checkoutState === "ERROR",
    [styles.checkoutLoading]: checkoutState === "LOADING",
  })
    return(
        <BasePage>
            <div>
                <h2>Корзина</h2>
                <table className={tableClasses}>
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
              <input type="number" className={styles.input} defaultValue={quantity} onBlur={(e) => {onQuantityChanged(e, id)}}/>
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
            <td className={styles.total}>${totalPrice}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <form id="usersCart" onSubmit={onCheckout}>
        {checkoutState === "ERROR" && errorMessage ? (<ErrorMessage error={errorMessage}/>) : null}
        <button className={styles.button} type="submit">
          Checkout
        </button>
      </form>                
            </div>
        </BasePage>
    )
}