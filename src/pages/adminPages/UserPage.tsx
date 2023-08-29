import React from "react";
import { IUser } from "../../models";

interface UserProps {
    user: IUser
}

export function User({user}: UserProps){

    return(
        <tr className="user-table-row">
                <td className="user-table-col">{user.id}</td>
                <td className="user-table-col">{user.username}</td>
                <td className="user-table-col">{user.email}</td>
                <td className="user-table-col">{user.name.firstname}</td>
                <td className="user-table-col">{user.name.lastname}</td>
                <td className="user-table-col">{user.name.patronymic}</td>
        </tr>
    )
}