import React, { useState } from "react";
import './CreateProduct.css';
import { ICategory } from "../../models";
import axios from "axios";
import { ErrorMessage } from "../service/ErrorMessage";

const newCat: ICategory ={
        title: '',
        parent: ''
}

interface CreateCatProps{
    onCreate: (cat: ICategory) => void
}

export function CreateCategory({ onCreate }: CreateCatProps) {
    const [titleValue, setTitleValue] = useState('');
    const [parentValue, setParentValue] = useState('');

    const [error, setError] = useState('');
  
    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('')

        if (titleValue.trim().length === 0 || parentValue.trim().length === 0 ){
            setError('Введите корректное значение')
            return
        }
        newCat.title = titleValue
        newCat.parent = parentValue
    

        const response = await axios.post<ICategory>('http://localhost:5000/categories', newCat)
        console.log(response)
        onCreate(response.data)
    };
  
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      if (event.target.name === 'title') {
        setTitleValue(event.target.value);
      } else if (event.target.name === 'price') {
        setParentValue(event.target.value);
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
            <p className="create-product-label">Название категории:</p>
            <input
              className="create-product-el"
              type="text"
              name="title"
              value={titleValue}
              onChange={changeHandler}
            />
          </div>
          {error && <ErrorMessage error={error} />}
{/* ЦЕНА ТОВАРА */}
          <div className="create-product-row">
            <p className="create-product-label">Входит в категорию:</p>
            <input
              className="create-product-el"
              type="text"
              name="price"
              value={parentValue}
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