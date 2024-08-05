import React from 'react';
import MovieList from './components/MovieList';
import './App.css'; 

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Seshat</h1>
      </header>
      <MovieList />
    </div>
  );
};

export default App;
