import React, { useState } from 'react';
import './Slider.css'

interface Slide {
  name: string;
  url: string;
}

interface SliderProps {
  slides: Slide[];
}

const Slider: React.FC<SliderProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  return (
    <div>
      <div className='slider'>
        <div className='slider-btn-x'>
          <div className='slider-btn-y'>
            <button className='slider-btn prev' onClick={prevSlide}></button>
          </div>
        </div>
        <div className='slider-wrapper'>
          <img src={slides[currentSlide].url} alt={slides[currentSlide].name} className='slider-img'/>
        </div>
        <div className='slider-btn-x'>
          <div className='slider-btn-y'>
            <button className='slider-btn next' onClick={nextSlide}></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;