import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <nav className="footer-menu">
        <a href="#">Contact</a>
        <span>-</span>
        <a href="#">Mentions Légales</a>
      </nav>
    </footer>
  );
};

export default Footer;
