import React, { useState } from "react";
import { IProduct } from "../../../models";

interface TabCompProps {
    product: IProduct;
  }

export function TabComp({ product }: TabCompProps) {
    const [activeTab, setActiveTab] = useState('ProdDescription');

    const openTab = (event: React.MouseEvent<HTMLButtonElement>, tabId: string) => {
        setActiveTab(tabId);
      };

    return(
        <>
            <div className="productDetails-tab">
                <button className={`tablinks ${activeTab === 'ProdDescription' ? 'active' : ''}`} onClick={(e) => openTab(e, 'ProdDescription')}>Подробное описание</button>
                <button className={`tablinks ${activeTab === 'ProdChars' ? 'active' : ''}`} onClick={(e) => openTab(e, 'ProdChars')}>Характеристики</button>
                <button className={`tablinks ${activeTab === 'ProdRefs' ? 'active' : ''}`} onClick={(e) => openTab(e, 'ProdRefs')}>Отзывы</button>
            </div>
            {activeTab === 'ProdDescription' && (
                <div className="productDetails-description active" id="ProdDescription">
                    <p className="productDetails-tabcontent">{product.description}</p>
                </div>
            )}
            {activeTab === 'ProdChars' && (
                <div className="productDetails-ProdChars active" id="ProdChars">
                    <p className="productDetails-tabcontent">{product.description}</p>
                </div>
            )}
            {activeTab === 'ProdRefs' && (
                <div className="productDetails-refs active" id="ProdRefs">
                    <p className="productDetails-tabcontent">{product.description}</p>
                </div>
            )}
      </>
    )
}