import React from "react";
import { ICategory } from "../../../models";
import { Edit } from "../../../components/service/Edit";
import { Delete } from "../../../components/service/Delete";

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
                        <Edit/>
                        <Delete />
                    </div>
                </td>
        </tr>
    )
}
