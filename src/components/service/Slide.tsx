import React, { useState, useEffect } from "react";
import { ISliderData } from "../../models";
import "./Slider.css";

interface SlideProps {
  slideData: ISliderData;
  isActive: boolean;
}

export function Slide({ slideData, isActive }: SlideProps) {
  const { title, image, content } = slideData;
  const [active, setActive] = useState(true);

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  return (
    <div className={`slider-slide ${active ? "active" : ""}`}>
      <img className="slider-slide-img" src={image} alt={title} />
      <div>
        <h2 className="slider-slide-title">{title}</h2>
        <p className="slider-slide-content">{content}</p>
      </div>
    </div>
  );
}