import React, { useState, useEffect } from "react";
import { ISliderData } from "../../models";
import { Link } from "react-router-dom";
import "./Slider.css";

interface SlideProps {
  slideData: ISliderData;
  isActive: boolean;
  detailsPath: string;
}

export function Slide({ slideData, isActive, detailsPath }: SlideProps) {
  const { _id, title, image, content } = slideData;
  const [active, setActive] = useState(true);

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  return (
    <div className={`slider-slide ${active ? "active" : ""}`}>
      {image && <img className="slider-slide-img" src={image} alt={title} />}
      <div>
        <h2 className="slider-slide-title">{title}</h2>
        <p className="slider-slide-content" dangerouslySetInnerHTML={{ __html: content}}></p>
        {_id && <Link to={`/${detailsPath}/${_id.toString()}`} className="slider-slide-detailsbtn">Подробнее</Link>}
      </div>
    </div>
  );
}