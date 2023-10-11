import React, { useContext, useState } from "react";
import "./Navigation.css";
import { Link, Navigate } from "react-router-dom";
import { ModalWindow } from "../../../components/service/ModalWindow";
import { GeoLocation } from "../../../components/service/Geolocation";
import LocationContext from "../../../context/LocationContext";
import { useAppSelector } from "../../../store/hooks";

export function Navigation() {
  const locationContext = useContext(LocationContext);
  const [showModal, setShowModal] = useState(false);

  const handleCityClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCheck = () => {
    const updatedLocation = localStorage.getItem("Location");
    if (updatedLocation) {
      const locationArray = updatedLocation.split(",");
      const lastElement = locationArray[locationArray.length - 1];
      locationContext?.updateLocation(lastElement.toUpperCase());
    }
    setShowModal(false);
  };

  const user = useAppSelector((state) => state.user.user);

  return (
    <nav className="navigation-menu">
      <div onClick={handleCityClick} className="nav-geolocation">
        <img
          className="geolocation-img"
          src="../img/icons8-location-64.png"
          alt="location"
        />
        {showModal ? (
          <ModalWindow title="Ваше местоположение" onClose={handleCloseModal}>
            <GeoLocation onCheck={handleCheck} />
          </ModalWindow>
        ) : (
          <p>{locationContext?.location ? locationContext.location : "Город Н"}</p>
        )}
      </div>
      {(!user || user.role !== "admin") ? (
      <>
        <Link to="/about" className='header-btn-link'>О нас</Link>
        <Link to="/help" className='header-btn-link'>Помощь</Link>
        <Link to="/contacts" className='header-btn-link'>Контакты</Link>
      </>
    ) : (
      <>
        <Link to="/about" className='header-btn-link'>О нас</Link>
        <Link to="/help" className='header-btn-link'>Помощь</Link>
        <Link to="/contacts" className='header-btn-link'>Контакты</Link>
        <Link to="/admin" className='header-btn-link'>Администрирование</Link>
      </>
    )}
    </nav>
  );
}