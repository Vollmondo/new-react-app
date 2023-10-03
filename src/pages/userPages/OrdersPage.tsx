import React, { useEffect, useState } from "react";
import { BasePage } from "../basePage/BasePage";
import { getCustomersOrders } from "../../api/api";
import { ICartItem, IOrder } from "../../models";
import { useAppSelector } from "../../store/hooks";

export function OrdersPage() {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const user = useAppSelector((state) => state.user?.user);

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
          
    return (
        <BasePage>
            <h1>Заказы</h1>
            <table>
                <thead>
                    <tr>
                        <th>Номер заказа</th>
                        <th>Товары</th>
                        <th>Дата заказа</th>
                        <th>Статус</th>
                        <th>Общая стоимость</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>
                                <ul>
                                {Array.isArray(order.items) && order.items.map((item: ICartItem) => (
                                    <li key={item.id}>{item.id}</li>
                                ))}
                                </ul>
                            </td>
                            <td>{order.timestamp}</td>
                            <td>{order.status}</td>
                            <td>{order.totalprice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </BasePage>
    );
}