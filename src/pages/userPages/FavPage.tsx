import React from "react";
import { BasePage } from "../basePage/BasePage";


export function FavPage() {
    const userJSON = localStorage.getItem('userJSON');

    return(
        <BasePage>
            <h1>Избранное</h1>
        </BasePage>
    )
}