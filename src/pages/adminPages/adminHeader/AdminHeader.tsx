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
              <ul className="topmenu">
                <li className='admin-header-link'>Товары
                  <ul className="submenu">
                    <li className='admin-header-sublink'><Link to='/admin/products' >Товары</Link></li>
                    <li className='admin-header-sublink'><Link to='/admin/categories' >Категории товаров</Link></li>
                    <li className='admin-header-sublink'><Link to='/admin/prodchars' >Характеристики товаров</Link></li>
                  </ul>
                </li>
                <li className='admin-header-link'>Пользователи
                  <ul className="submenu">
                    <li className='admin-header-sublink'><Link to='/admin/users' >Пользователи</Link></li>
                    <li className='admin-header-sublink'><Link to='/admin/roles' >Категории пользователей</Link></li>
                  </ul>
                </li>
                <li className='admin-header-link'>Заказы
                  <ul className="submenu">
                    <li className='admin-header-sublink'><Link to='#' >Заказы</Link></li>
                    <li className='admin-header-sublink'><Link to='#' >Статусы</Link></li>
                  </ul>
                </li>
                <li className='admin-header-link'>Информационные материалы
                  <ul className="submenu">
                    <li className='admin-header-sublink'><Link to='#' >Статьи</Link></li>
                    <li className='admin-header-sublink'><Link to='#' >Банеры</Link></li>
                    <li className='admin-header-sublink'><Link to='#' >Реквизиты организации</Link></li>
                  </ul>
                </li>
                <li className='admin-header-link'><Link to='#'>Настройки сайта</Link></li>
                <li className='admin-header-link'><Link to='/' target='blank' >Перейти к сайту</Link></li>
              </ul>
            </div>
          </div>        
      </div>
    );
  }