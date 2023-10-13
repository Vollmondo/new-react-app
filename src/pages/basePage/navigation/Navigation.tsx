import React, { useContext } from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { ModalWindow } from "../../../components/service/ModalWindow";
import { GeoLocation } from "../../../components/service/Geolocation";
import LocationContext from "../../../context/LocationContext";
import { useAppSelector } from "../../../store/hooks";
import { ModalWindowState, ModalWindowContext } from "../../../context/ModalWindowContext";

export function Navigation() {
  const locationContext = useContext(LocationContext);
  const modalWindowContext = useContext(ModalWindowContext);

  const handleCityClick = () => {
    modalWindowContext.open();
  };

  const handleCloseModal = () => {
    modalWindowContext.close();
  };

  const handleCheck = () => {
    const updatedLocation = localStorage.getItem("Location");
    if (updatedLocation) {
      const locationArray = updatedLocation.split(",");
      const lastElement = locationArray[locationArray.length - 1];
      locationContext?.updateLocation(lastElement.toUpperCase());
    }
    modalWindowContext.close();
  };

  const user = useAppSelector((state) => state.user.user);

  return (
    <nav className="navigation-menu">
      <ModalWindowState>
        <div onClick={handleCityClick} className="nav-geolocation">
          <img
            className="geolocation-img"
            src="../img/icons8-location-64.png"
            alt="location"
          />
          {modalWindowContext.modalWindow ? (
            <ModalWindow title="Ваше местоположение" onClose={handleCloseModal}>
              <GeoLocation onCheck={handleCheck} />
            </ModalWindow>
          ) : (
            <p>{locationContext?.location ? locationContext.location : "Город Н"}</p>
          )}
        </div>
      </ModalWindowState>
      {!user || user.role !== "admin" ? (
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