import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';

export const GeoLocation = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<boolean>(false);

  useEffect(() => {
    const savedLatitude = localStorage.getItem('latitude');
    const savedLongitude = localStorage.getItem('longitude');

    if (savedLatitude && savedLongitude) {
      setLatitude(parseFloat(savedLatitude));
      setLongitude(parseFloat(savedLongitude));
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            setLatitude(lat);
            setLongitude(lon);
            localStorage.setItem('latitude', lat.toString());
            localStorage.setItem('longitude', lon.toString());
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    }
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      const API_KEY_YANDEX = '85eaff1b-ef9e-4c11-89bc-ca01d1ae43de';
      const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${longitude},${latitude}&results=1&format=json`;
      fetch(API_URL_GEO_DATA)
        .then((response) => response.json())
        .then((data) => {
          const coords = data.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.request;
          const location = data.response.GeoObjectCollection.featureMember[0].GeoObject.description;
          setCity(location);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (latitude && longitude && confirmed) {
      localStorage.setItem('latitude', latitude.toString());
      localStorage.setItem('longitude', longitude.toString());
    }
  }, [latitude, longitude, confirmed]);

  const handleConfirmation = () => {
    setConfirmed(true);
  };

  return (
    <div>
      {city && <p>Город: {city}</p>}
      {latitude && longitude ? (
        <div>
          <p>Широта: {latitude}</p>
          <p>Долгота: {longitude}</p>
          {!confirmed && <button onClick={handleConfirmation}>Подтвердить</button>}
        </div>
        
      ) : (
        <Loader />
      )}
    </div>
  );
};