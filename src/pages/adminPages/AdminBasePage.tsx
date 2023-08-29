import React from "react";
import './AdminBasePage.css'

interface ContactsPageProps{
    children: React.ReactNode
}

export function AdminBasePage({ children }: ContactsPageProps){
    return(
        <div className="base-container-x">
            <div className="base-container-y">
                <main className="main">
                    {children}
                </main>
            </div>
        </div>
    )
}