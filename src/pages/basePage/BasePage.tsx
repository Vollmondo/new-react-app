import React, { useState } from "react";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";
import './BasePage.css'
import ToggleSwitch from "../../components/service/ToggleSwitch";

interface ContactsPageProps{
    children: React.ReactNode
}

export function BasePage({ children }: ContactsPageProps){

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSmallLetters, setSmallLetters] = useState(false);

    const handleToggle1 = (isOn: boolean | ((prevState: boolean) => boolean)) => {
        setIsDarkMode(isOn);
        document.body.style.backgroundColor = isOn ? "#eee" : "#ffffff";
      };
    const handleToggle2 = (isOn: boolean | ((prevState: boolean) => boolean)) => {
        setSmallLetters(isOn);
        document.body.style.fontSize = isOn ? "20pt" : "";
      };

    return(
        <div className={isDarkMode ? "base-container-x dark-mode" : "base-container-x"}>
            <div className="base-container-y">
                <Header />
                {/* Цвет фона<ToggleSwitch onToggle={handleToggle1} />
                Размер букв<ToggleSwitch onToggle={handleToggle2} /> */}
                <main className="main">{children}</main>
                <Footer />
                
            </div>
        </div>
    )
}