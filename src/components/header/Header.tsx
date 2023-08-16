import React from 'react';
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="header_logo" />
        <div className="header_title-block">
          <h1 className="header_title">My Project</h1>
        </div>
      </div>
    );
  }
}

export default Header;
