import React, { useState } from "react";
import { ISliderData } from "../../models";
import { Slide } from "./Slide";
import "./Slider.css"

interface SliderProps {
  sliderData: ISliderData[];
}

export function Slider({ sliderData }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePreviousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? sliderData.length - 1 : prevIndex - 1));
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderData.length);
  };

  const slides = [];
  for (let i = 0; i < sliderData.length; i++) {
    const slide = sliderData[i];
    slides.push(<Slide key={i} slideData={slide} isActive={i === currentIndex} />);
  }

  return (
    <>
      <div className="slider">
        <div className="slide-navigation left center-x">
          <div className="center-y">
            <button className="slider-btn " onClick={handlePreviousSlide}></button>
          </div>
        </div>
        <div className="slider-slide-container">
          {slides}
        </div>
        <div className="slide-navigation right center-x">
          <div className="center-y">
            <button className="slider-btn" onClick={handleNextSlide}></button>
          </div>
        </div>
      </div>
    </>
  );
}