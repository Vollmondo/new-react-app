import React, { useEffect, useState } from "react";
import { BasePage } from "../basePage/BasePage";
import { getCustomersOrders, getProductItem } from "../../api/api";
import { ICartItem, IOrder, IProduct } from "../../models";
import { useAppSelector } from "../../store/hooks";
import "./OrdersPage.css";

export function OrdersPage() {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const user = useAppSelector((state) => state.user?.user);
    const [productItems, setProductItems] = useState<IProduct[]>([]);


    useEffect(() => {
      if (user) {
        const id = user._id;
        if (id) {
          getCustomersOrders(id)
            .then((response) => {
              setOrders(response);
            })
            .catch((error) => {
              console.error("Failed to fetch orders:", error);
            });
        }
      }
    }, [user]);
    
    useEffect(() => {
      const fetchProductItems = async () => {
        const items = await Promise.all(
          orders.flatMap((order) =>
            order.items.map((item) => getProductItem(item.id))
          )
        );
        setProductItems(items);
      };
    
      fetchProductItems();
    }, [orders]);
          
      const formatDateTime = (dateTimeString: string | number | Date) => {
        const dateTime = new Date(dateTimeString);
        const formattedDate = dateTime.toLocaleDateString("ru-RU");
        const formattedTime = dateTime.toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        });
        return `${formattedDate} ${formattedTime}`;
      };

      return (
        <BasePage>
          <h1>Ваши заказы</h1>
          <table className="orders-table">
            <thead>
              <tr>
                <th className="colID">ID заказа</th>
                <th className="colGoods">Состав заказа</th>
                <th className="colDate">Дата заказа</th>
                <th className="colStatus">Статус</th>
                <th className="colSum">Общая стоимость</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="orders-table-row">
                    <td>{order._id}</td>
                    <td>
                        <table className="orders-table-items">
                            <thead>
                                <tr>
                                    <th className="colTitle">Наименование</th>
                                    <th className="colQuant">Кол-во</th>
                                    <th className="colQuant">Цена</th>
                                </tr>
                            </thead>
                            <tbody>
                              {Array.isArray(order.items) &&
                                order.items.map((item: ICartItem) => {
                                  const productItem = productItems.find((product) => product._id === item.id);
                                  return (
                                    <tr key={item.id}>
                                      <td>{productItem?.title}</td>
                                      <td>{item.quantity}</td>
                                      <td>{item.price}</td>
                                    </tr>
                                  );
                                })
                              }
                            </tbody>
                        </table>
                    </td>
                    <td>{formatDateTime(order.timestamp)}</td>
                    <td>{order.status}</td>
                    <td>{order.totalprice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </BasePage>
      );
    }