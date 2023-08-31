import React from "react";
import { IProduct } from "../../../models";
import './AdminProduct.css'



interface ProductProps {
    product: IProduct
}

export function AdminProduct({product}: ProductProps){
    const rating = product.rating?.rate ?? 0;
    const count = product.rating?.count ?? 0;

    return(
        <tr className="admin-table-row">
                <td className="admin-table-col">{product.id}</td>
                <td className="admin-table-col">{product.category}</td>
                <td className="admin-table-col">{product.title}</td>
                <td className="admin-table-col">{product.description}</td>
                <td className="admin-table-col">{rating}</td>
                <td className="admin-table-col">{count}</td>
                <td className="admin-table-col">{product.price}</td>
                <td className="admin-table-col">
                    <div className="admin-table-col-y">
                        <img className="admin-table-img" src="../img/icons8-edit-64.png" alt="options" />
                        <img className="admin-table-img" src="../img/icons8-trash-64.png" alt="options" />
                    </div>
                </td>
        </tr>
    )
}