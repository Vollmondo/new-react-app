import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Contacts from './components/contacts/Contacts';
import { ProductsPage } from './components/products/ProductsPage';
import Footer from './components/footer/Footer';
import { ModalWindow } from './components/service/ModalWindow';


function App() {
  return (
    <div className="App">
        <Header />
         {/*  <Sidebar /> */}
          <main className="content">
            <ProductsPage />
            
          </main>
        <Footer />
      </div>
  );
}

export default App;
