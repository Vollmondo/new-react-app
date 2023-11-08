import React, { useContext, useEffect, useState } from "react";
import { BasePage } from "./basePage/BasePage";
import { GeoLocation } from "../components/service/Geolocation";
import { ModalWindow } from "../components/service/ModalWindow";
import { ModalWindowContext, ModalWindowState } from "../context/ModalWindowContext";
import { Slider } from "../components/service/Slider";
import { ISliderData } from "../models";
import { useAppDispatch } from "../store/hooks";
import { useGetProductsQuery, useFetchNewsQuery } from "../api/api";
import { receivedProducts } from "../store/Products.Slice";

export function MainPage() {
  const {modalWindow, open, close} = useContext(ModalWindowContext)
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  const { data: products = [], isLoading: productsLoading } = useGetProductsQuery();
  const { data: news = [], isLoading: newsLoading } = useFetchNewsQuery();

  useEffect(() => {
    dispatch(receivedProducts(products));
  }, [dispatch, products]);

  useEffect(() => {
    const location = localStorage.getItem("Location");
    if (!location) {
      setShowModal(true);
    }
  }, []);

  const checkHandler = () => {
    setShowModal(false);
  };

  const infoSliderData: ISliderData[] = news?.map((newsIssue) => ({
  _id: newsIssue.id ? newsIssue.id.toString() : undefined,
  title: newsIssue.title,
  image: newsIssue.image,
  content: newsIssue.content,
})) || [];

  const prodSliderData: ISliderData[] = products.map((product) => ({
    _id: product._id,
    title: product.title,
    image: product.image,
    content: product.description,
  }));

  return (
    <>
      <BasePage>
        <div className="homePage">
          <Slider sliderData={infoSliderData} detailsPath={"about"}></Slider>
          <Slider sliderData={prodSliderData} detailsPath={"cat"}></Slider>
            <ModalWindowState>
              {modalWindow && <ModalWindow title="Ваше местоположение" onClose={() =>{close()}}>
              <GeoLocation onCheck={checkHandler}/>
                </ModalWindow>}
            </ModalWindowState>
          <div className="about">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci vero velit quisquam quia enim, ratione
            odio exercitationem sint expedita delectus est voluptate, accusamus earum maxime ipsum minima temporibus in
            vitae!
          </div>
        </div>
      </BasePage>
    </>
  );
}