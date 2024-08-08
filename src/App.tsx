import React from 'react';
import MovieList from './components/MovieList';
import Footer from './components/Footer';
import logo from './img/logo192.png';
import './App.css'; 

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <img src={logo} alt='logo' className='header-logo' />
        <h1>
          Seshat
        </h1>
      </header>
      <div className="app-content">
        <MovieList />
      </div>
      <Footer />
    </div>
  );
};

export default App;
