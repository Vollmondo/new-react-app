import React, { useState } from "react";
import { IProduct } from "../../../models";
import { ModalWindow } from "../../../components/service/ModalWindow";

interface PhotoCompProps {
  product: IProduct;
}

export function PhotoComp({ product }: PhotoCompProps) {
  const [mainImage, setMainImage] = useState<string>(product.image || "");
  const [additionalImages, setAdditionalImages] = useState<string[]>(product.addImg || []);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleImageClick = (imgSrc: string) => {
    setMainImage(imgSrc);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <img className="productDetails-img" src={mainImage} alt={product.title} onClick={handleModalOpen} />
      <div className="productDetails-additionalImgs">
        {additionalImages.map((imgSrc, index) => (
          <img
            key={index}
            src={imgSrc}
            alt="доп фото"
            onClick={() => handleImageClick(imgSrc)}
          />
        ))}
      </div>
      {isModalOpen && (
        <ModalWindow title={product.title} onClose={handleModalClose}>
          <div className="productDetails-hugeContainer">
            <div className="hugeImg-container">
              <img src={mainImage} alt={product.title} className="productDetails-hugeImg"/>
            </div>
            <div className="productDetails-additionalImgs hugeAddsImgs">
              {additionalImages.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt="доп фото"
                  onClick={() => handleImageClick(imgSrc)}
                />
              ))}
            </div>
          </div>
        </ModalWindow>
      )}    </>
  );
}