import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/infoPages/AboutPage';
import { ContactsPage } from './pages/infoPages/ContactsPage';
import { MainPage } from './pages/MainPage';
import { HelpPage } from './pages/infoPages/HelpPage';
import { UsersPage } from './pages/adminPages/adminUsers/UsersPage';
import { ProfilePageWrapper } from './pages/userPages/ProfilePageWrapper';
import { AdminProductsPage } from './pages/adminPages/adminProducts/AdminProductsPage';
import { AdminCategoriesPage } from './pages/adminPages/adminCategories/AdminCategoriesPage';
import { AdminMainPage } from './pages/adminPages/AdminMainPage';
import { LoginForm } from './pages/userPages/LoginForm';
 


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/cat' element={<ProductsPage />}/>
        <Route path='/about' element={<AboutPage />}/>
        <Route path='/contacts' element={<ContactsPage />}/>
        <Route path='/help' element={<HelpPage />}/>
        <Route path="/userProfile/:id" element={<ProfilePageWrapper />} />
        <Route path="/login" element={<LoginForm/>} />

        <Route path='/admin' element={<AdminMainPage />}/>
        <Route path='/admin/users' element={<UsersPage />}/>
        <Route path='/admin/products' element={<AdminProductsPage />}/>
        <Route path='/admin/categories' element={<AdminCategoriesPage />}/>

        
      </Routes>
    </>
  );
}

export default App;
