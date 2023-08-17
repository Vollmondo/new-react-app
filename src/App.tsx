import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Comments from './forms/Comments/Comments';
import Contacts from './components/contacts/Contacts';
import Slider from './components/slider/Slider';

function App() {
  return (
    <div className="App">
        <Header />
        <div className="body">
          <Sidebar />
          <main className="content">
            <Comments />
            <Slider countOfSlides={0} setSliderState={function (state: { countOfSlides: number; }): void {
            throw new Error('Function not implemented.');
          } } />
          </main>
          <Contacts />
        </div>
      </div>
  );
}

export default App;
