import React from "react";
import './Navigation.css';
import { Link } from "react-router-dom";

export function Navigation(){
    return (
        <nav className="navigation-menu">
            <div className="nav-geolocation">
                <img className="geolocation-img" src="../img/icons8-location-64.png" alt="loacation" />
                <p>Город Н</p>
            </div>
            <Link to='/about'>О нас</Link>
            <Link to='/help'>Помощь</Link>

            <Link to='/contacts'>Контакты</Link>
            <Link to='/admin'>Администрирование</Link>

        </nav>
    )
}