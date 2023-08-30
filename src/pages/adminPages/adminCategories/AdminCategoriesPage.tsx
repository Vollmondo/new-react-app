import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { ICategory } from "../../../models";
import { Loader } from "../../../components/service/Loader";
import { ErrorMessage } from "../../../components/service/ErrorMessage";
import { AdminCategory } from "./AdminCategory";
import { AdminBasePage } from "../AdminBasePage";

export function AdminCategoriesPage(){

    const [categories, setCategories] = useState<ICategory[]>([])
    const [loading, setLoading]= useState(false)
    const [error, setError] = useState('')

    async function fetchCats() {
        try {
            setError('')
            setLoading(true)
            const response = await axios.get<ICategory[]>('http://localhost:5000/categories')
            setCategories(response.data)
            setLoading(false)
        } catch (e:unknown) {
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)
        }
        
    }

    useEffect(() => {
        fetchCats()
        }, []
    )

    return(
        <>
            <AdminBasePage>
                <div className="admin-cat-container">
                    {loading && <Loader />}
                    <table className="admin-table">
                        <tbody>
                            <tr className="admin-table-row">
                                <th className="admin-table-th">ID категории</th>
                                <th className="admin-table-th">Название категории товара</th>
                                <th className="admin-table-th">Родительская категория</th>
                                <th className="admin-table-th">Количество наименований в категории</th>
                            </tr>
                            {categories.map(category => <AdminCategory cat={category} key={category._id}/>)}
                        </tbody>
                    </table>
                    {error && <ErrorMessage error="Не удалось загрузить товары"/>}
                </div>
            </AdminBasePage>
        </>
    )
}