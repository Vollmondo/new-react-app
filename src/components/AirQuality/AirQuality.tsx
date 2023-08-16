import React, { useEffect, useState } from 'react';
import Comment from '../comment/Comment';

function AirQualityComponent() {
  const [data, setData] = useState({ latitude: '', longitude: '' });

  useEffect(() => {
    fetch('https://air-quality-api.open-meteo.com/v1/air-quality?latitude=55&longitude=61')
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => console.error(error));
  }, []);

  if (data.latitude && data.longitude) {
    return (
      <div>
        <Comment name={data.latitude} text={data.longitude} />
      </div>
    );
  }

  return (
    <div>
      Loading...
    </div>
  );
}

export default AirQualityComponent;
