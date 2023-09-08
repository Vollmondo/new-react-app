import React, { useContext } from "react";
import { BasePage } from "./basePage/BasePage";
import { GeoLocation } from "../components/service/Geolocation";
import { ModalWindow } from "../components/service/ModalWindow";
import { ModalWindowContext } from "../context/ModalWindowContext";

export function MainPage(){

    const {modalWindow, close} = useContext(ModalWindowContext)

    return(
        <>
            <BasePage>
                {<ModalWindow title="Ваше месторасположения:" onClose={() =>{close()}}>
                    <GeoLocation />
                </ModalWindow>}
                <div className="about">Lorem ipsum, dolor sit amezzt consectetur adipisicing elit. Adipisci vero velit quisquam quia enim, ratione odio exercitationem sint expedita delectus est voluptate, accusamus earum maxime ipsum minima temporibus in vitae!</div>
            </BasePage>
        </>
    )
}