import React, { useState } from "react";
import './CreateProduct.css';
import { IProduct } from "../../models";
import axios from "axios";
import { ErrorMessage } from "../service/ErrorMessage";

const newProduct: IProduct ={
        title: 'test product',
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic',
        rating: {
            rate: 5,
            count: 222
        }
}

interface CreateProductProps{
    onCreate: (product: IProduct) => void
}

export function CreateProduct({ onCreate }: CreateProductProps) {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
  
    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('')

        if (value.trim().length === 0){
            setError('Введите корректное название товара')
            return
        }
        newProduct.title = value

        const response = await axios.post<IProduct>('https://fakestoreapi.com/products', newProduct)
        console.log(response)
        onCreate(response.data)
    };
  
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };
  
    return (
      <form onSubmit={submitHandler}>
        <input
            type="text"
            value={value}
            onChange={changeHandler}
        />
        {error && <ErrorMessage error={error} />}
        <label>
          Выберите категорию товара:
          <select>
            <option>Категория 1</option>
            <option>Категория 2</option>
          </select>
        </label>
        <label>
          Введите описание товара:
          <input type="text" />
        </label>
        <button>Создать</button>
      </form>
    );
  }