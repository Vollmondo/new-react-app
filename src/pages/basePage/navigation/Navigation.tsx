import React, { useContext, useState } from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { ModalWindow } from "../../../components/service/ModalWindow";
import { GeoLocation } from "../../../components/service/Geolocation";
import LocationContext from "../../../context/LocationContext";

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
      <Link to="/about">О нас</Link>
      <Link to="/help">Помощь</Link>
      <Link to="/contacts">Контакты</Link>
      <Link to="/admin">Администрирование</Link>
    </nav>
  );
}