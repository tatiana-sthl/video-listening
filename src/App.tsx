import React from 'react';
import MovieList from './components/MovieList';
import styled from 'styled-components';

const AppContainer = styled.div`
  text-align: center;
`;

const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <AppHeader>
        <h1>Video Listing</h1>
      </AppHeader>
      <MovieList />
    </AppContainer>
  );
};

export default App;
