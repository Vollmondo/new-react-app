import React from 'react';
import Slider from './Slider';

const slides = [
  {
    name: 'Slide 1',
    url: 'jpg/1.jpg',
  },
  {
    name: 'Slide 2',
    url: 'jpg/2.jpg',
  },
  {
    name: 'Slide 3',
    url: 'jpg/3.jpg',
  },
];

const HomePage: React.FC = () => {
  return (
    <div>
      <Slider slides={slides} />
    </div>
  );
};

export default HomePage;