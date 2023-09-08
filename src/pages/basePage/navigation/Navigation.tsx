import React, { useState, useEffect } from "react";
import './Navigation.css';
import { Link } from "react-router-dom";
import { ModalWindow } from "../../../components/service/ModalWindow";
import { GeoLocation } from "../../../components/service/Geolocation";

export function Navigation(){
    const [location, setLocation] = useState<string | null>(localStorage.getItem('Location'));
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const storedLocation = localStorage.getItem('Location');
        if (storedLocation) {
            const locationArray = storedLocation.split(',');
            const lastElement = locationArray[locationArray.length - 1];
            setLocation(lastElement.toUpperCase());         }
    }, []);

    const handleCityClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const checkHandler = () =>{
        setShowModal(false);
    }

    return (
        <nav className="navigation-menu">
            <div onClick={handleCityClick} className="nav-geolocation">
                <img className="geolocation-img" src="../img/icons8-location-64.png" alt="location" />
                {showModal ? (
                    <ModalWindow title="Ваше местоположение" onClose={handleCloseModal}>
                        <GeoLocation onCheck={checkHandler}/>
                    </ModalWindow>
                ) : (
                    <p>{location ? location : "Город Н"}</p>
                )}
            </div>
            <Link to='/about'>О нас</Link>
            <Link to='/help'>Помощь</Link>
            <Link to='/contacts'>Контакты</Link>
            <Link to='/admin'>Администрирование</Link>
        </nav>
    )
}