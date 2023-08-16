import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Comments from './forms/Comments/Comments';
import { Contacts } from './components/contacts/Contacts';

function App() {
  return (
    <div className="App">
        <Header />
        <div className="body">
          <Sidebar />
          <main className="content">
            <Comments />
          </main>
          <Contacts />
        </div>
      </div>
  );
}

export default App;
