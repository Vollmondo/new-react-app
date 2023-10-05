import React, { useContext, useEffect, useState } from "react";
import { BasePage } from "./basePage/BasePage";
import { GeoLocation } from "../components/service/Geolocation";
import { ModalWindow } from "../components/service/ModalWindow";
import { ModalWindowContext } from "../context/ModalWindowContext";
import { Slider } from "../components/service/Slider";
import { IArticle, ISliderData } from "../models";
import axios, { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getProducts } from "../api/api";
import { receivedProducts } from "../store/Products.Slice";

export function MainPage(){
    const [news, setNews] = useState<IArticle[]>([])
    const [loading, setLoading]= useState(false)
    const [error, setError] = useState('')
    const {modalWindow, open, close} = useContext(ModalWindowContext)
    const dispatch = useAppDispatch();

    useEffect(() => {
        getProducts().then((products) => {
        dispatch(receivedProducts(products));
        });
    }, []);

    const products = useAppSelector ((state) => state.products.products)
    
    useEffect(() => {
        const Location = localStorage.getItem("Location");
        if (!Location) {
            open()
        }
      }, []);

    const checkHandler = () =>{
        close()
    }

    async function fetchProducts() {
        try {
            setError('')
            setLoading(true)
            const response = await axios.get<IArticle[]>('http://localhost:5000/articles/')
            setNews(response.data)
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


    const infoSliderData: ISliderData[] = news.map((newsIssue) => ({
        _id: newsIssue.id ? newsIssue.id.toString(16) : undefined,
        title: newsIssue.title,
        image: newsIssue.image,
        content: newsIssue.content,
      }));

      const prodSliderData: ISliderData[] = Object.values(products).map((product) => ({
        _id: product._id,
        title: product.title,
        image: product.image,
        content: product.description,
      }));

    return(
        <>
            <BasePage>
                <Slider sliderData={infoSliderData} detailsPath={"about"}></Slider>
                <Slider sliderData={prodSliderData} detailsPath={"cat"}></Slider>
                {modalWindow && <ModalWindow title="Ваше местоположение" onClose={() =>{close()}}>
                    <GeoLocation onCheck={checkHandler}/>
                </ModalWindow>}
                <div className="about">Lorem ipsum, dolor sit amezzt consectetur adipisicing elit. Adipisci vero velit quisquam quia enim, ratione odio exercitationem sint expedita delectus est voluptate, accusamus earum maxime ipsum minima temporibus in vitae!</div>
            </BasePage>
        </>
    )
}