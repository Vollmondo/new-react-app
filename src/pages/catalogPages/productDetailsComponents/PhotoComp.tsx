import React from "react";
import { IProduct } from "../../../models";

interface PhotoCompProps {
  product: IProduct;
}

export function PhotoComp({ product }: PhotoCompProps) {   

  return (
    <>
        <img className="productDetails-img" src={product.image} alt={product.title} />
        <div className="productDetails-additionalImgs">
            {Array.isArray(product.addImg) ? (
            <div className="productDetails-additionalImgs">
                {product.addImg.map((imgSrc, index) => (
                <img key={index} src={imgSrc} alt="доп фото" />
                ))}
            </div>
            ) : null}
        </div>
    </>
  );
}