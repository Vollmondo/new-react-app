import React from "react";
import { IProduct } from "../../../models";
import './AdminProduct.css'
import { Edit } from "../../../components/service/Edit";
import { Delete } from "../../../components/service/Delete";



interface ProductProps {
    product: IProduct
}

export function AdminProduct({product}: ProductProps){
    const rating = product.rating?.rate ?? 0;
    const count = product.rating?.count ?? 0;

    return(
        <tr className="admin-table-row">
                <td className="admin-table-col">{product._id}</td>
                <td className="admin-table-col">{product.category}</td>
                <td className="admin-table-col">{product.title}</td>
                <td className="admin-table-col">{product.description}</td>
                <td className="admin-table-col">{rating}</td>
                <td className="admin-table-col">{count}</td>
                <td className="admin-table-col">{product.price}</td>
                <td className="admin-table-col">
                    <div className="admin-table-col-y">
                        <Edit object={product} headers={[]} />
                        <Delete />
                    </div>
                </td>
        </tr>
    )
}