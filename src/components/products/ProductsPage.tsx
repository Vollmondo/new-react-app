import React, { useEffect, useState } from "react";
import './ProductsPage.css';
import { Product } from "./Product";
import axios, { AxiosError } from "axios";
import { IProduct } from "../../models";
import { FetchError } from "../service/FetchError";
import { Loader } from "../service/Loader";
import { ModalWindow } from "../service/ModalWindow";


export function ProductsPage(){
    
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading]= useState(false)
    const [error, setError] = useState('')

    async function fetchProducts() {
        try {
            setError('')
            setLoading(true)
            const response = await axios.get<IProduct[]>('https://fakestoreapi.com/products/')
            setProducts(response.data)
            setLoading(false)
        } catch (e:unknown) {
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)
        }
        
    }

    useEffect(() => {
        fetchProducts()
        }, []
    )

    return(
            <div className="products-page">
                {loading && <Loader />}
                {error && <FetchError />}
                <div className="products-container">
                    {products.map(product => <Product product={product} key={product.id}/>)}
                    <ModalWindow />
                </div>
            </div>
       
    )
}
    
