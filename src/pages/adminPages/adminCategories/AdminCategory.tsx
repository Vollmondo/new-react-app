import React from "react";
import { ICategory } from "../../../models";
import { Edit } from "../../../components/service/Edit";
import { Delete } from "../../../components/service/Delete";
import { ModalWindowState } from "../../../context/ModalWindowContext";

interface CatProps {
    cat: ICategory
}

export function AdminCategory({cat}: CatProps){

    return(
        <ModalWindowState>
        <tr className="admin-table-row">
                <td className="admin-table-col">{cat._id}</td>
                <td className="admin-table-col">{cat.title}</td>
                <td className="admin-table-col">{cat.parent}</td>
                <td className="admin-table-col">XXX</td>
                <td className="admin-table-col">
                    <div className="admin-table-col-y">
                        <Edit object={cat} headers={[]}/>
                        <Delete />
                    </div>
                </td>
        </tr>
        </ModalWindowState>
    )
}
