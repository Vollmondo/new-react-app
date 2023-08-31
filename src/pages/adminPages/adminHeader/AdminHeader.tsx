import React from 'react';
import './AdminHeader.css';
import { Link } from 'react-router-dom';

export function AdminHeader() {
    return (
      <div className="admin-header">
        <div className="admin-header_logo">
          <Link to='/admin'><img className='admin-logo-img' src='../img/icons8-support-64.png' alt='logo'/></Link>
        </div>
        <div className='admin-header-content-block'>
            <h1>Панель администратора</h1>
          <div className='admin-header-content'>
              <Link to='/admin/products' className='admin-header-link'>Товары</Link>
              <Link to='/admin/categories' className='admin-header-link'>Категории товаров</Link>
              <Link to='/admin/users' className='admin-header-link'>Пользователи</Link>
              <Link to='#' className='admin-header-link'>Информационные материалы</Link>
              <Link to='#' className='admin-header-link'>Настройки сайта</Link>
              <Link to='/' target='blank' className='admin-header-link' >Перейти к сайту</Link>
            </div>
          </div>        
      </div>
    );
  }