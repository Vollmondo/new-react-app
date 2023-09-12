import React, { useContext, useEffect, useState } from "react";
import './ProductsPage.css';
import { Product } from "../components/products/Product";
import axios, { AxiosError } from "axios";
import { IProduct, ISliderData } from "../models";
import { ErrorMessage } from "../components/service/ErrorMessage";
import { Loader } from "../components/service/Loader";
import { ModalWindow } from "../components/service/ModalWindow";
import { CreateProduct } from "../components/products/CreateProduct";
import { ModalWindowContext } from "../context/ModalWindowContext";
import { BasePage } from "./basePage/BasePage";
import { Slider } from "../components/service/Slider";

export function ProductsPage(){
    
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading]= useState(false)
    const [error, setError] = useState('')
    const {modalWindow, open, close} = useContext(ModalWindowContext)

    function addProduct(product:IProduct){
        setProducts(prev =>[...prev, product])
    }

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

    const createHandler = (product:IProduct) =>{
        close()
        addProduct(product)
    }  
    
    const sliderData: ISliderData[] = products.map((product) => ({
        id: product.id,
        title: product.title,
        image: product.image,
        content: product.description,
      }));

    return(
        <>
            <BasePage>
                <div className="products-page">
                    {loading && <Loader />}
                    {error && <ErrorMessage error="Не удалось загрузить товары"/>}
                    <div className="products-container">
                        <Slider sliderData={sliderData}></Slider>
                        {products.map(product => <Product product={product} key={product.id}/>)}
                        <button className="addProduct-btn" onClick={() => open()}></button>
                        { modalWindow && <ModalWindow title="Создать новый продукт" onClose={() =>{close()}}>
                            <CreateProduct onCreate={createHandler}></CreateProduct>
                        </ModalWindow>}
                    </div>
                </div>
            </BasePage>
        </>
       
    )
}
    
