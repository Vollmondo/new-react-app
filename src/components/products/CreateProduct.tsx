import React, { useState } from "react";
import './CreateProduct.css';
import { IProduct } from "../../models";
import axios from "axios";
import { ErrorMessage } from "../service/ErrorMessage";

const newProduct: IProduct ={
        title: '',
        price: 0,
        description: '',
        image: '',
        category: '',
        rating: {
            rate: 0,
            count: 0
        }
}

interface CreateProductProps{
    onCreate: (product: IProduct) => void
}

export function CreateProduct({ onCreate }: CreateProductProps) {
    const [titleValue, setTitleValue] = useState('');
    const [priceValue, setPriceValue] = useState(0);
    const [descriptionValue, setDescriptionValue] = useState('');
    const [photoValue, setPhotoValue] = useState('');

    const [error, setError] = useState('');
  
    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('')

        if (titleValue.trim().length === 0 || descriptionValue.trim().length === 0 || priceValue === 0){
            setError('Введите корректное значение')
            return
        }
        
        newProduct.title = titleValue
        newProduct.price = priceValue
        newProduct.description = descriptionValue
        newProduct.image = photoValue

        const response = await axios.post<IProduct>('http://localhost:5000/products/', newProduct)
        console.log(response)
        onCreate(response.data)
    };
  
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      if (event.target.name === 'title') {
        setTitleValue(event.target.value);
      } else if (event.target.name === 'price') {
        setPriceValue(parseFloat(event.target.value));
      } else if (event.target.name === 'description') {
        setDescriptionValue(event.target.value);
      } else if (event.target.name === 'photo') {
        setPhotoValue(event.target.value);
      }
    };
  
    return (
      <div className="create-product-container">
        <form 
          className="create-product-form"
          onSubmit={submitHandler}
          >
{/* НАЗВАНИЕ ТОВАРА */}
          <div className="create-product-row">
            <p className="create-product-label">Название товара:</p>
            <input
              className="create-product-el"
              type="text"
              name="title"
              value={titleValue}
              onChange={changeHandler}
            />
          </div>
{/* ЦЕНА ТОВАРА */}
          <div className="create-product-row">
            <p className="create-product-label">Стоимость товара:</p>
            <input
              className="create-product-el"
              type="text"
              name="price"
              value={priceValue}
              onChange={changeHandler}
            />
          </div>
{/* ОПИСАНИЕ ТОВАРА */}
          <div className="create-product-row">
            <p className="create-product-label">Описание товара:</p>
            <textarea
              className="create-product-el descr"
              name="description"
              rows={10} 
              cols={50}
              value={descriptionValue}
              onChange={changeHandler}
            />
          </div>
{/* КАТЕГОРИЯ ТОВАРА */}
          <div className="create-product-row">
            <p className="create-product-label">Категория товара:</p>
            <select className="create-product-el">
              <option>Категория 1</option>
              <option>Категория 2</option>
            </select>
          </div>
{/* ФОТО ТОВАРА */}
          <div className="create-product-row">
            <p className="create-product-label">Фото товара:</p>
            <input
              className="create-product-el"
              type="text"
              name="photo"
              value={photoValue}
              onChange={changeHandler}
            />
          </div>
          {error && <ErrorMessage error={error} />}
          <div className="create-product-btnBlock">
            <button className="create-product-btn">Создать</button>
          </div>
        </form>
      </div>
    );
  }