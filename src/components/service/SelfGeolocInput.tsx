import React, { useState } from "react";
import { InputText } from "./InputForm";
import axios from "axios";

export const SelfGeolocInput = ({ action = '#' }: { action: string }) => {
  let [location, setLocation] = useState<string | null>(null);

  const handleConfirmation = async () => {
    const API_KEY_YANDEX = '85eaff1b-ef9e-4c11-89bc-ca01d1ae43de';
    const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${location}&results=1&format=json`;
    await new Promise(resolve => setTimeout(resolve, 5));

    try {
      const response = await axios.get(API_URL_GEO_DATA);
      const data = response.data;
      
      location = data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.AdministrativeAreaName;
      const coords = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ').reverse();
      console.log(coords);

      await new Promise(resolve => setTimeout(resolve, 5));

      localStorage.setItem('Coordinates', coords.toString());
      localStorage.setItem('Location', location || '');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form action={action}>
      <h1>Введите название города</h1>
      <InputText
        type="text"
        placeholder=""
        value={location || ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
      />
      <button type="submit" onClick={handleConfirmation}>
        Подтвердить
      </button>
    </form>
  )
}