import React, { useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { IUser } from "../../models";
import { Loader } from "../../components/service/Loader";
import { ErrorMessage } from "../../components/service/ErrorMessage";
import { User } from "./UserPage";
import { AdminBasePage } from "./AdminBasePage";

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
                    <table>
                        {users.map(user => <User user={user} key={user.id}/>)}
                    </table>
                    {error && <ErrorMessage error="Не удалось загрузить товары"/>}
                </div>
            </AdminBasePage>
        </>
    )
}