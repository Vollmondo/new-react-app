import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Comments from './forms/Comments/Comments';
import Contacts from './components/contacts/Contacts';
import HomePage from './components/slider2/SliderPack';


function App() {
  return (
    <div className="App">
        <Header />
        <div className="body">
          <Sidebar />
          <main className="content">
            <HomePage />
            <Comments />
          </main>
          <Contacts />
        </div>
      </div>
  );
}

export default App;
