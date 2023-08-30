import React from "react";
import { IProduct } from "../../../models";
import './AdminProduct.css'



interface ProductProps {
    product: IProduct
}

export function AdminProduct({product}: ProductProps){

    return(
        <tr className="admin-table-row">
                <td className="admin-table-col">{product.id}</td>
                <td className="admin-table-col">{product.category}</td>
                <td className="admin-table-col">{product.title}</td>
                <td className="admin-table-col">{product.description}</td>
                <td className="admin-table-col">{product.rating.rate}</td>
                <td className="admin-table-col">{product.rating.count}</td>
                <td className="admin-table-col">{product.price}</td>
                <td className="admin-table-col">
                    <div className="product-table-col-y">
                        <img className="product-table-img" src="../img/icons8-edit-64.png" alt="options" />
                        <img className="product-table-img" src="../img/icons8-trash-64.png" alt="options" />
                    </div>
                </td>
        </tr>
    )
}