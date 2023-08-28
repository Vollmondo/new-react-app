import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactsPage } from './pages/ContactsPage';
import { MainPage } from './pages/MainPage';
import { HelpPage } from './pages/HelpPage';



function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/cat' element={<ProductsPage />}/>
        <Route path='/about' element={<AboutPage />}/>
        <Route path='/contacts' element={<ContactsPage />}/>
        <Route path='/help' element={<HelpPage />}/>

      </Routes>
    </>
  );
}

export default App;
