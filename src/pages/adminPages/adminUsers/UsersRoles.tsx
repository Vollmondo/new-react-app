import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Loader } from "../../../components/service/Loader";
import { ErrorMessage } from "../../../components/service/ErrorMessage";
import { AdminBasePage } from "../adminBasePage/AdminBasePage";
import '../adminBasePage/AdminBasePage.css'

type IRoles = {
    _id: string,
    name: string,
}

export function UserRoles(){

    const [roles, setRoles] = useState<IRoles[]>([])
    const [loading, setLoading]= useState(false)
    const [error, setError] = useState('')

    async function fetchRoles() {
        
        try {
            setError('')
            setLoading(true)
            const response = await axios.get<IRoles[]>('http://localhost:5000/roles/')
            setRoles(response.data)
            setLoading(false)
        } catch (e:unknown) {
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchRoles()
    }, [])

    return(
        <>
            <AdminBasePage>
                <div className="profile-container">
                    {loading && <Loader />}
                    <table className="admin-table">
                        <tbody>
                            <tr className="admin-table-row">
                                <th className="admin-table-th">ID роли</th>
                                <th className="admin-table-th">Наименование роли</th>
                            </tr>
                            {roles.map(role => <Role role={role} key={role._id}/>)}
                        </tbody>
                    </table>
                    {error && <ErrorMessage error="Не удалось загрузить роли"/>}
                </div>
            </AdminBasePage>
        </>
    )
}

interface RoleProps {
    role: IRoles
}

export function Role({role}: RoleProps){

    return(
        <tr className="admin-table-row">
                <td className="admin-table-col">{role._id}</td>
                <td className="admin-table-col">{role.name}</td>
        </tr>
    )
}