import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { Navigation } from '../navigation/Navigation';

export function Header() {

  const userJSON = localStorage.getItem('userJSON');
  let id = 0;
  
  if (userJSON !== null) {
    const userObj = JSON.parse(userJSON);
    id = userObj.id;
  }

    return (
      <div className="header">
        <div className="header_logo">
          <Link to='/home'><img className='logo-img' src='../img/icons8-shop-64.png' alt='logo'/></Link>
        </div>
        <div className='header-content-block'>
        <Navigation />
          <div className='header-content'>
            <div className='header-catButton-block'>
                <Link to='/cat'>
                  <div className='header-cat-btn'><img className='header-img cat' src='../img/icons8-list-64.png' alt='catalog'/>
                    <div className='header-cat-btn-y'>
                      <p>Каталог</p>
                    </div>
                </div>
              </Link>
            </div>   
            <form className='header-search'>
              <input className='header-search-input'></input>
              <button className='header-search-btn header-img search'></button>
            </form>
            <div className='header-personal-block'>
              {userJSON ? (
                <>
                  <Link to={`/userProfile/${id}`}><img className='header-img profile' src='../img/icons8-user-64.png' alt='cart'/></Link>
                  <Link to='#'><img className='header-img fav' src='../img/icons8-heart-64.png' alt='favourite'/></Link>
                  <Link to='#'><img className='header-img orders' src='../img/icons8-box-64.png' alt='orders'/></Link>
                  <Link to='#'><img className='header-img cart' src='../img/icons8-shopping-bag-64.png' alt='cart'/></Link>
                </>
              ) : (
                <Link to='/login'><img className='header-img login' src='../img/icons8-enter-64.png' alt='login'/></Link>
              )}
            </div>
          </div>
        </div>
        
      </div>
    );
  }