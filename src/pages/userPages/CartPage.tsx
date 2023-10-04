import React from "react";
import { BasePage } from "../basePage/BasePage";
import classNames from "classnames";
import styles from "./CartPage.module.css";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { getTotalPrice, removeFromCart, updateQuantity, checkoutCart, getMemoizedNumItems, updateBalance } from "../../store/Cart.Slice";
import { ErrorMessage } from "../../components/service/ErrorMessage";
import { IUser } from "../../models";

export function CartPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const items = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector(getTotalPrice);
  const checkoutState = useAppSelector((state) => state.cart.checkoutState);
  const errorMessage = useAppSelector(state => state.cart.errorMessage)
  const NumItems = useAppSelector(getMemoizedNumItems)
  const user = useAppSelector((state) => state.user.user);

  function onQuantityChanged(e: React.FocusEvent<HTMLInputElement>, id: string){
    const quantity = Number(e.target.value) || 0;
    dispatch(updateQuantity({id, quantity}))
  }

  function onCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (user && user._id && user?.credit && user?.credit >= Number(totalPrice)) {
      const balance = user.credit - Number(totalPrice);
      const formData = new FormData();
      formData.set('_id', user._id);
      formData.set('credit', balance.toString());
      const userData: IUser = {
        _id: formData.get('_id') as string,
        credit: formData.get('credit') ? Number(formData.get('credit')) : undefined,
      };
      if (user && user._id) {
        dispatch(updateBalance(user._id, { ...userData, _id: user._id }));
      }
      dispatch(checkoutCart());
    } else {
      console.log('На счету недостаточно средств');
    }
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
            <th>Наименование товара</th>
            <th>Цена за 1 ед.</th>
            <th>Кол-во</th>
            <th>Общая стоимость</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
        {Object.entries(items).map(([id, quantity]) => (
          <tr>
            <td>{products[id].title}</td>
            <td>&#127820;&nbsp;{products[id].price}</td>
            <td>
              <input type="number" className={styles.input} defaultValue={quantity} onBlur={(e) => {onQuantityChanged(e, id)}}/>
            </td>
            <td>&#127820;&nbsp;{products[id].price * quantity}</td>
            <td>
              <button aria-label={`Remove ${products[id].title} Cart`} onClick={() => dispatch(removeFromCart(id))}
              >X</button>
            </td>
          </tr>
        ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>ИТОГО</td>
            <td className={styles.total}>{NumItems} ед. товара</td>
            <td className={styles.total}>на сумму &#127820;&nbsp;{totalPrice}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <form id="usersCart" onSubmit={onCheckout}>
        {checkoutState === "ERROR" && errorMessage ? (<ErrorMessage error={errorMessage}/>) : null}
        <button className={styles.button} type="submit">
          Оформить заказ
        </button>
      </form>                
            </div>
        </BasePage>
    )
}