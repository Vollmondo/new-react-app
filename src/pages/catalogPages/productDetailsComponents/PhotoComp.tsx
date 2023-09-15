import React, { useState } from "react";
import { IProduct } from "../../../models";

interface PhotoCompProps {
    product: IProduct;
  }

export function PhotoComp({ product }: PhotoCompProps) {   

    return(
        <>
            <img className="productDetails-img" src={product.image} alt={product.title} />
            <div className="productDetails-additionalImgs">
                <div className="testimg">ДОП ФОТО</div>                
                <div className="testimg">ДОП ФОТО</div>
                <div className="testimg">ДОП ФОТО</div>
                <div className="testimg">ДОП ФОТО</div>
                <div className="testimg">ДОП ФОТО</div>
                <div className="testimg">ДОП ФОТО</div>
                <div className="testimg">ДОП ФОТО</div>
            </div>
      </>
    )
}