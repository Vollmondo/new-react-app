import React from "react";
import './AdminBasePage.css'
import { AdminHeader } from "../adminHeader/AdminHeader";
import { AdminFooter } from "../adminFooter/AdminFooter";

interface ContactsPageProps{
    children: React.ReactNode
}

export function AdminBasePage({ children }: ContactsPageProps){
    return(
        <div className="admin-base-container-x">
            <div className="admin-base-container-y">
                <AdminHeader />
                <main className="admin-main">
                    {children}
                </main>
                <AdminFooter />
            </div>
        </div>
    )
}