import React from "react";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
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