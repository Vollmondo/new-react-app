import React from "react";
import { BasePage } from "../basePage/BasePage";


export function CartPage() {
    const userJSON = localStorage.getItem('userJSON');

    return(
        <BasePage>
            <h1>Корзина</h1>
        </BasePage>
    )
}