import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Loader } from "../../../components/service/Loader";
import { ErrorMessage } from "../../../components/service/ErrorMessage";
import { AdminBasePage } from "../adminBasePage/AdminBasePage";
import '../adminBasePage/AdminBasePage.css'
import { Edit } from "../../../components/service/Edit";
import { Delete } from "../../../components/service/Delete";
import { ModalWindowState } from "../../../context/ModalWindowContext";

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
                    <h1>Категории пользователей</h1>
                    {loading && <Loader />}
                    <table className="admin-table">
                        <tbody>
                            <tr className="admin-table-row">
                                <th className="admin-table-th">ID роли</th>
                                <th className="admin-table-th">Наименование роли</th>
                                <th className="admin-table-th">Действия</th>
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
        <ModalWindowState>
        <tr className="admin-table-row">
                <td className="admin-table-col">{role._id}</td>
                <td className="admin-table-col">{role.name}</td>
                <td className="admin-table-col">
                <div className="admin-table-col-y">
                    <Edit object={role} headers={[]} />
                    <Delete />
                </div>
            </td>
        </tr>
        </ModalWindowState>
    )
}