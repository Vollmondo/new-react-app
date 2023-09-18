import React, { useState, useEffect } from "react";
import axios from "axios";
import { Characteristic, IProduct } from "../../../models";

interface CharCompProps {
  product: IProduct;
}
  

export function CharComp({ product }: CharCompProps) {
  const [data, setData] = useState<Characteristic[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/characteristics', {
            params: {
              chars: product.chars
            }
          });
          const charEntries = response.data;

          // Обработка массива пар ключ-значение
          const characteristics = charEntries.map(([key, value]: [string, any]) => ({
            title: key,
            value: value
          }));
      
          setData(characteristics);
        } catch (error) {
          console.error(error);
        }
      };

    fetchData();
  }, []);

  return (
    <div className="productDetails-chars">ХАРАКТЕРИСТИКИ ТОВАРА:
        <table className="productDetails-charTable">
          <tbody>
            {data.map((char, index) => (
              <tr key={index}>
                <td>{char.title}:</td>
                <td>{char.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};
