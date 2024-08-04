// src/components/MovieList.tsx
import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import Pagination from './Pagination';
import CategoryFilter from './CategoryFilter';
import { movies$ } from '../movies'; // Assurez-vous que le chemin est correct
import '../styles/MovieList.css'; // Mise à jour du chemin CSS

const itemsPerPageOptions = [4, 8, 12];

interface Movie {
  id: string;
  title: string;
  category: string;
  likes: number;
  dislikes: number;
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    movies$.then((data) => {
      setMovies(data);
      setFilteredMovies(data);
    });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredMovies(movies.filter(movie => movie.category === selectedCategory));
    } else {
      setFilteredMovies(movies);
    }
  }, [selectedCategory, movies]);

  const handleDelete = (id: string) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMovies = filteredMovies.slice(startIndex, endIndex);

  const uniqueCategories = Array.from(new Set(movies.map(movie => movie.category)));

  return (
    <div>
      <CategoryFilter
        categories={uniqueCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className="movie-list">
        {paginatedMovies.map(movie => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            category={movie.category}
            likes={movie.likes}
            dislikes={movie.dislikes}
            onDelete={() => handleDelete(movie.id)}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={filteredMovies.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        itemsPerPageOptions={itemsPerPageOptions}
      />
    </div>
  );
};

export default MovieList;
