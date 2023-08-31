import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { IUser } from "../../../models";
import { Loader } from "../../../components/service/Loader";
import { ErrorMessage } from "../../../components/service/ErrorMessage";
import { User } from "./UserPage";
import { AdminBasePage } from "../adminBasePage/AdminBasePage";
import '../adminBasePage/AdminBasePage.css'

export function UsersPage(){

    const [users, setUsers] = useState<IUser[]>([])
    const [loading, setLoading]= useState(false)
    const [error, setError] = useState('')

    async function fetchUser() {
        
        try {
            setError('')
            setLoading(true)
            const response = await axios.get<IUser[]>('https://fakestoreapi.com/users/')
            setUsers(response.data)
            setLoading(false)
        } catch (e:unknown) {
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchUser()
        }, []
    )


    return(
        <>
            <AdminBasePage>
                <div className="profile-container">
                    {loading && <Loader />}
                    <table className="admin-table">
                        <tbody>
                            <tr className="admin-table-row">
                                <th className="admin-table-th">ID</th>
                                <th className="admin-table-th">Имя пользователя</th>
                                <th className="admin-table-th">Роль</th>
                                <th className="admin-table-th">E-mail</th>
                                <th className="admin-table-th">Фамилия</th>
                                <th className="admin-table-th">Имя</th>
                                <th className="admin-table-th">Отчество</th>
                            </tr>
                        {users.map(user => <User user={user} key={user.id}/>)}
                        </tbody>
                    </table>
                    {error && <ErrorMessage error="Не удалось загрузить товары"/>}
                </div>
            </AdminBasePage>
        </>
    )
}