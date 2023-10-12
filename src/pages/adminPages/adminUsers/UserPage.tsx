import React from "react";
import { IUser } from "../../../models";
import { Edit } from "../../../components/service/Edit";
import { Delete } from "../../../components/service/Delete";
import { ModalWindowState } from "../../../context/ModalWindowContext";

interface UserProps {
    user: IUser
    headers: string[];
}

export function User({ user, headers  }: UserProps) {
    return (
        <ModalWindowState>
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
                    <Edit object={user} headers={[]} />
                    <Delete />
                </div>
            </td>
        </tr>
        </ModalWindowState>
    )
}