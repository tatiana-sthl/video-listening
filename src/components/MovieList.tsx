import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { movies$, Movie } from '../movies';
import ToggleButton from './ToggleButton'; // Importation du composant ToggleButton

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
`;

const Card = styled.div`
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  width: calc(33.333% - 32px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: calc(50% - 32px);
  }

  @media (max-width: 480px) {
    width: calc(100% - 32px);
  }
`;

const Title = styled.h2`
  font-weight: bold;
  margin-bottom: 8px;
`;

const Category = styled.p`
  margin-bottom: 8px;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;

  &:hover {
    background: #0056b3;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
`;

const FilterButton = styled.button<{ selected: boolean }>`
  background: ${({ selected }) => (selected ? '#007bff' : '#e0e0e0')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${({ selected }) => (selected ? '#0056b3' : '#ccc')};
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
`;

const PaginationButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 8px;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background: #0056b3;
  }
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-left: 16px;
`;

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    movies$.then(setMovies);
  }, []);

  const handleDelete = (id: string) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handlePageChange = (direction: 'prev' | 'next') => {
    setCurrentPage(prev => prev + (direction === 'next' ? 1 : -1));
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const categories = Array.from(new Set(movies.map(movie => movie.category)));
  const filteredMovies = selectedCategories.length
    ? movies.filter(movie => selectedCategories.includes(movie.category))
    : movies;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMovies = filteredMovies.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  return (
    <div>
      <FilterContainer>
        {categories.map(category => (
          <FilterButton
            key={category}
            selected={selectedCategories.includes(category)}
            onClick={() => handleCategoryToggle(category)}
          >
            {category}
          </FilterButton>
        ))}
      </FilterContainer>
      <Container>
        {paginatedMovies.map(movie => (
          <Card key={movie.id}>
            <Title>{movie.title}</Title>
            <Category>{movie.category}</Category>
            <ToggleButton
              likes={movie.likes}
              dislikes={movie.dislikes}
            />
            <Button onClick={() => handleDelete(movie.id)}>Delete</Button>
          </Card>
        ))}
      </Container>
      <PaginationContainer>
        <PaginationButton
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
        >
          Previous
        </PaginationButton>
        <span>{currentPage} / {totalPages}</span>
        <PaginationButton
          onClick={() => handlePageChange('next')}
          disabled={currentPage === totalPages}
        >
          Next
        </PaginationButton>
        <Select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={12}>12</option>
        </Select>
      </PaginationContainer>
    </div>
  );
};

export default MovieList;
