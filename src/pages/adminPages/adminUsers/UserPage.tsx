import React from "react";
import { IUser } from "../../../models";
import '../adminBasePage/AdminBasePage.css'
import { Edit } from "../../../components/service/Edit";
import { Delete } from "../../../components/service/Delete";

interface UserProps {
    user: IUser
}

export function User({user}: UserProps){

    return(
        <tr className="admin-table-row">
            <td className="admin-table-col">{user._id}</td>
            <td className="admin-table-col">{user.username}</td>
            <td className="admin-table-col">{user.role}</td>
            <td className="admin-table-col">{user.email}</td>
            <td className="admin-table-col">{user.name?.lastname}</td>
            <td className="admin-table-col">{user.name?.firstname}</td>
            <td className="admin-table-col">{user.name?.patronymic}</td>
            <td className="admin-table-col">
                <div className="admin-table-col-y">
                    <Edit />
                    <Delete />
                </div>
            </td>
        </tr>
    )
}