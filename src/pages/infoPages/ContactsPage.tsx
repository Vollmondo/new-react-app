import React from "react";
import Contacts from "../../components/contacts/Contacts";
import { BasePage } from "./../basePage/BasePage";



export function ContactsPage(){
    return(
        <>
            <BasePage>
                <h1>КОНТАКТЫ</h1>
                <div className="conacts">Lorem ipsum, dolor sit amezzt consectetur adipisicing elit. Adipisci vero velit quisquam quia enim, ratione odio exercitationem sint expedita delectus est voluptate, accusamus earum maxime ipsum minima temporibus in vitae!</div>
                <Contacts />
            </BasePage>
        </>
    )
}