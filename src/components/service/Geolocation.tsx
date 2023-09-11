import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { SelfGeolocInput } from './SelfGeolocInput';
import axios from 'axios';

interface CheckLocProps {
  onCheck: () => void;
}

export const GeoLocation = ({ onCheck }: CheckLocProps) => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [showInput, setShowInput] = useState(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);

  useEffect(() => {
    const savedLatitude = localStorage.getItem('latitude');
    const savedLongitude = localStorage.getItem('longitude');

    if (savedLatitude && savedLongitude) {
      setLatitude(parseFloat(savedLatitude));
      setLongitude(parseFloat(savedLongitude));
      setConfirmed(true);
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            setLatitude(lat);
            setLongitude(lon);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        console.log('Ваш браузер не поддерживает геолокацию.');
      }
    }
  }, [latitude, longitude, confirmed]);

  useEffect(() => {
    if (latitude && longitude) {
      const API_KEY_YANDEX = '85eaff1b-ef9e-4c11-89bc-ca01d1ae43de';
      const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${longitude},${latitude}&results=1&format=json`;
      axios
        .get(API_URL_GEO_DATA)
        .then((response) => response.data)
        .then(async (data) => {
          const coords = await (data.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.request.split(',').reverse());
          console.log(coords)
          const location = await (data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.AdministrativeAreaName);
          setCity(location);
          if (latitude && longitude && confirmed) {
            localStorage.setItem('Coordinates', coords.toString());
            localStorage.setItem('Location', location)
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [latitude, longitude, confirmed]);

  const handleConfirmation = async () => {
    await setConfirmed(true);
    onCheck();
  };

  const handleSelfInput = () => {
    setShowInput(true);
  };

  return (
    <div>
      {city && <p>{city}</p>}
      {latitude && longitude ? (
        <div>
          <p>Широта: {latitude}</p>
          <p>Долгота: {longitude}</p>
          {!confirmed && <button onClick={handleConfirmation}>Подтвердить</button>}
          {!confirmed && <button onClick={handleSelfInput}>Ввести данные вручную</button>}
          {showInput && <SelfGeolocInput action={''} />}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};