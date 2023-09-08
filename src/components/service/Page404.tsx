import React from 'react';
import './Page404.css'
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div className='container404'>
        <img className='img404' src='../img/icons8-error-64.png' alt='cart'/>
        <h1 className='header404'>Ошибка404</h1>
        <p className='text404'>Извините, запрошенная страница не существует.</p>
        <p className='text404'>Вернитесь назад или <Link to={'/home'}>перейдите на главную страницу</Link></p>
    </div>
  );
};

export default Page404;