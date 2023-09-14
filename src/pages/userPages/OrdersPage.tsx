import React from "react";
import { BasePage } from "../basePage/BasePage";


export function OrdersPage() {
    const userJSON = localStorage.getItem('userJSON');

    return(
        <BasePage>
            <h1>Заказы</h1>
        </BasePage>
    )
}