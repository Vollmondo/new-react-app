import React, { useContext, useEffect } from "react";
import { BasePage } from "./basePage/BasePage";
import { GeoLocation } from "../components/service/Geolocation";
import { ModalWindow } from "../components/service/ModalWindow";
import { ModalWindowContext } from "../context/ModalWindowContext";

export function MainPage(){

    const {modalWindow, open, close} = useContext(ModalWindowContext)
    
    useEffect(() => {
        const Location = localStorage.getItem("Location");
        if (!Location) {
            open()
        }
      }, []);

    const checkHandler = () =>{
        close()
    }

    return(
        <>
            <BasePage>
                {modalWindow && <ModalWindow title="Ваше местоположение" onClose={() =>{close()}}>
                    <GeoLocation onCheck={checkHandler}/>
                </ModalWindow>}
                <div className="about">Lorem ipsum, dolor sit amezzt consectetur adipisicing elit. Adipisci vero velit quisquam quia enim, ratione odio exercitationem sint expedita delectus est voluptate, accusamus earum maxime ipsum minima temporibus in vitae!</div>
            </BasePage>
        </>
    )
}