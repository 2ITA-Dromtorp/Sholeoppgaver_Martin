import React from 'react';
import './header.css';
import logo from '../assets/vhd-logo.png'; // Husk å legge til logoen i assets-mappen

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <img src={logo} alt="VHD Logo" className="logo" />
        <h1 className="title">VHD Butikk</h1>
      </div>
    </header>
  );
}

export default Header;
