import React, { useState } from "react";
import { ISliderData } from "../../models";
import { Slide } from "./Slide";
import "./Slider.css"

interface SliderProps {
  sliderData: ISliderData[];
  detailsPath: string;
}

export function Slider({ sliderData, detailsPath }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePreviousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? sliderData.length - 1 : prevIndex - 1));
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderData.length);
  };

  const slides = sliderData.map((slide, index) => (
    <Slide key={index} slideData={slide} isActive={index === currentIndex} detailsPath={detailsPath} />
  ));

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