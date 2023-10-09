import React, { useState } from "react";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";
import './BasePage.css'

interface ContactsPageProps{
    children: React.ReactNode
}

export function BasePage({ children }: ContactsPageProps){

    return(
        <div className="base-container-x">
            <div className="base-container-y">
                <Header />
                <main className="main">{children}</main>
                <Footer />
                
            </div>
        </div>
    )
}