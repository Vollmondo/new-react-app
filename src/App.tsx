import React from 'react';
import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProductsPage } from './pages/catalogPages/ProductsPage';
import { AboutPage } from './pages/infoPages/AboutPage';
import { ContactsPage } from './pages/infoPages/ContactsPage';
import { MainPage } from './pages/MainPage';
import { HelpPage } from './pages/infoPages/HelpPage';
import { UsersPage } from './pages/adminPages/adminUsers/UsersPage';
import { ProfilePageWrapper } from './pages/userPages/ProfilePageWrapper';
import { AdminProductsPage } from './pages/adminPages/adminProducts/AdminProductsPage';
import { AdminCategoriesPage } from './pages/adminPages/adminCategories/AdminCategoriesPage';
import { AdminMainPage } from './pages/adminPages/AdminMainPage';
import { AuthForm } from './pages/userPages/AuthForm';
import {Page404} from './components/service/Page404';
import { ProductDetails } from './pages/catalogPages/ProductDetails';
 


function App() {

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/') {
      navigate('/home');
    }
  }, [navigate, location]);

  return (
    <>
      <Routes>
        <Route path='/home' element={<MainPage />}/>

        <Route path='/cat' element={<ProductsPage />}/>
        <Route path='/cat/:id' element={<ProductDetails />}/>


        <Route path='/about' element={<AboutPage />}/>
        <Route path='/contacts' element={<ContactsPage />}/>
        <Route path='/help' element={<HelpPage />}/>
        
        <Route path="/userProfile/:id" element={<ProfilePageWrapper />} />
        <Route path="/login" element={<AuthForm/>} />

        <Route path='/admin' element={<AdminMainPage />}/>
        <Route path='/admin/users' element={<UsersPage />}/>
        <Route path='/admin/products' element={<AdminProductsPage />}/>
        <Route path='/admin/categories' element={<AdminCategoriesPage />}/>

        <Route path='*' element={<Page404/>} />
      </Routes>
    </>
  );
}

export default App;
