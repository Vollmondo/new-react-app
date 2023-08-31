import React from "react";
import { ICategory } from "../../../models";

interface CatProps {
    cat: ICategory
}

export function AdminCategory({cat}: CatProps){

    return(
        <tr className="admin-table-row">
                <td className="admin-table-col">{cat._id}</td>
                <td className="admin-table-col">{cat.title}</td>
                <td className="admin-table-col">{cat.parent}</td>
                <td className="admin-table-col">XXX</td>
                <td className="admin-table-col">
                    <div className="admin-table-col-y">
                        <img className="admin-table-img" src="../img/icons8-edit-64.png" alt="options" />
                        <img className="admin-table-img" src="../img/icons8-trash-64.png" alt="options" />
                    </div>
                </td>
        </tr>
    )
}
