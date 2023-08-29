import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/infoPages/AboutPage';
import { ContactsPage } from './pages/infoPages/ContactsPage';
import { MainPage } from './pages/MainPage';
import { HelpPage } from './pages/infoPages/HelpPage';
import { UsersPage } from './pages/adminPages/UsersPage';
import { ProfilePageWrapper } from './pages/userPages/ProfilePageWrapper';
 


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
        <Route path='/admin/usersPage' element={<UsersPage />}/>

      </Routes>
    </>
  );
}

export default App;
