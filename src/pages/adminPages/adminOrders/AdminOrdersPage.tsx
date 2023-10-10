import React, { useEffect, useState } from "react";
import { AdminBasePage } from "../adminBasePage/AdminBasePage";
import { ICartItem, IOrder, IProduct } from "../../../models";
import { Loader } from "../../../components/service/Loader";
import { ErrorMessage } from "../../../components/service/ErrorMessage";
import { getOrders, getProductItem } from "../../../api/api";
import "./AdminOrders.css";
import { Edit } from "../../../components/service/Edit";
import { Delete } from "../../../components/service/Delete";

export function AdminOrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [productItems, setProductItems] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([getOrders()])
      .then(([orders]) => {
        setOrders(orders);
        setLoading(false);
      })
      .catch((error) => {
        setError("Не удалось загрузить товары и категории");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchProductItems = async () => {
      if (orders.length > 0) {
        const items = await Promise.all(
          orders.flatMap((order) =>
            order.items.map((item) => getProductItem(item.id))
          )
        );
        setProductItems(items);
      }
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
    <AdminBasePage>
      <h1>Заказы пользователей</h1>
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      <table className="admin-table">
        <thead>
            <tr>
                <th className="admin-table-th">ID заказа</th>
                <th className="admin-table-th">Клиент</th>
                <th className="admin-table-th">Состав заказа</th>
                <th className="admin-table-th">Дата заказа</th>
                <th className="admin-table-th">Статус</th>
                <th className="admin-table-th">Общая стоимость</th>
                <th className="admin-table-th">Действия</th>
            </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="admin-table-row">
                <td className="admin-table-col">{order._id}</td>
                <td className="admin-table-col">{order.customer}</td>
                <td className="admin-table-col">
                    <table className="adminOrders-table-items">
                    <thead>
                        <tr>
                        <th className="admin-table-col colTitle">Наименование</th>
                        <th className="admin-table-col colQuant">Кол-во</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(order.items) &&
                        order.items.map((item: ICartItem, index: number) => (
                            <tr key={item.id} >
                            <td className="admin-table-col">{productItems[index]?.title}</td>
                            <td className="admin-table-col">{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </td>
                <td className="admin-table-col">{formatDateTime(order.timestamp)}</td>
                <td className="admin-table-col">{order.status}</td>
                <td className="admin-table-col">{order.totalprice}</td>
                <td className="admin-table-col">
                    <div className="admin-table-col-y">
                        <Edit object={order} headers={[]} />
                        <Delete />
                    </div>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminBasePage>
  );
}