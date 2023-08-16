import React from 'react';
import './Sidebar.css';

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <ul>
          <li><a href="#">Главная</a></li>
          <li><a href="#">О компании</a></li>
          <li><a href="#">Контакты</a></li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
