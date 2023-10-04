import React from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from '../navigation/Navigation';
import { LocationProvider } from '../../../context/LocationContext';
import { CartLink } from '../../../components/cart/CartLink';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { resetFavProducts } from '../../../store/FavProducts.Slice';
import { Search } from '../../../components/service/Search';
import { resetUser } from '../../../store/User.Slice';
import { Wallet } from '../../../components/wallet/Wallet';

export function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user); 

  const handleLogout = () => {
    dispatch(resetFavProducts());
    dispatch(resetUser())
    navigate('/home');
  };

    return (
      <div className="header">
        <div className="header_logo">
          <Link to='/home'><img className='logo-img' src='../img/icons8-shop-64.png' alt='logo'/></Link>
        </div>
        <div className='header-content-block'>
          <LocationProvider>
            <Navigation />
          </LocationProvider>
          <div className='header-content'>
            <div className='header-catButton-block'>
                <Link to='/cat' className='header-cat-btn-link'>
                  <div className='header-cat-btn'><img className='header-img cat' src='../img/icons8-list-64.png' alt='catalog'/>
                    <div className='header-cat-btn-y'>
                      Каталог
                    </div>
                </div>
              </Link>
            </div>
            <Search />
            <div className='header-personal-block'>
              {user.user?._id ? (
                <>
                  <Link to={`/userProfile/${user.user?._id}`}>
                    <img className='header-img profile' src='../img/icons8-user-64.png' alt='profile'/>
                    </Link>
                  <Link to={`/userProfile/fav`}>
                    <img className='header-img fav' src='../img/icons8-heart-64.png' alt='favourite'/>
                  </Link>
                  <Link to={`/userProfile/orders`}>
                    <img className='header-img orders' src='../img/icons8-box-64.png' alt='orders'/>
                  </Link>
                  <Link to={`/#`}>
                    <img className='header-img cart' src='../img/icons8-wallet-64.png' alt='cart'/>
                  </Link>
                  <Wallet />
                  <Link to={`/userProfile/cart`}>
                    <img className='header-img cart' src='../img/icons8-shopping-bag-64.png' alt='cart'/>
                  </Link>
                  <CartLink />
                  <Link to='/home' className='header-logout-link' onClick={handleLogout}>
                    <img className='header-img logout' src='../img/icons8-logout-64.png' alt='logOut'/>
                  </Link>
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