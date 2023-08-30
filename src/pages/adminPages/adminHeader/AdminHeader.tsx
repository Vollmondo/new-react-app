import React from 'react';
import './AdminHeader.css';
import { Link } from 'react-router-dom';

export function AdminHeader() {
    return (
      <div className="admin-header">
        <div className="admin-header_logo">
          <Link to='/'><img className='admin-logo-img' src='../img/icons8-support-64.png' alt='logo'/></Link>
        </div>
        <div className='admin-header-content-block'>
            <h1>Панель администратора</h1>
          <div className='admin-header-content'>
              <Link to='#'>Товары</Link>
              <Link to='/admin/usersPage'>Пользователи</Link>
              <Link to='#'>Информационные материалы</Link>
              <Link to='#'>Настройки сайта</Link>
            </div>
          </div>        
      </div>
    );
  }