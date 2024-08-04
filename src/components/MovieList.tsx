// src/components/MovieList.tsx
import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import Pagination from './Pagination';
import CategoryFilter from './CategoryFilter';
import { movies$ } from '../movies';
import '../styles/MovieList.css';

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
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    movies$.then((data) => {
      setMovies(data);
      updateCategoriesAndFilteredMovies(data, selectedCategories);
    });
  }, []);

  useEffect(() => {
    updateCategoriesAndFilteredMovies(movies, selectedCategories);
  }, [selectedCategories, movies, itemsPerPage, currentPage]);

  const updateCategoriesAndFilteredMovies = (movies: Movie[], selectedCategories: Set<string>) => {
    const filtered = selectedCategories.size > 0
      ? movies.filter(movie => selectedCategories.has(movie.category))
      : movies;

    setFilteredMovies(filtered);

    const availableCategories = Array.from(new Set(movies.map(movie => movie.category)));
    setCategories(availableCategories);

    if (selectedCategories.size > 0) {
      setSelectedCategories(prev => {
        const updatedCategories = new Set(prev);
        for (const category of prev) {
          if (!availableCategories.includes(category)) {
            updatedCategories.delete(category);
          }
        }
        return updatedCategories;
      });
    }

    if (currentPage > Math.ceil(filtered.length / itemsPerPage)) {
      setCurrentPage(1);
    }
  };

  const handleDelete = (id: string) => {
    const updatedMovies = movies.filter(movie => movie.id !== id);
    setMovies(updatedMovies);
    updateCategoriesAndFilteredMovies(updatedMovies, selectedCategories);
  };

  const handleCategoryChange = (category: string, isSelected: boolean) => {
    setSelectedCategories(prev => {
      const updatedCategories = new Set(prev);
      if (isSelected) {
        updatedCategories.add(category);
      } else {
        updatedCategories.delete(category);
      }
      return updatedCategories;
    });
  };

  const handleClearFilters = () => {
    setSelectedCategories(new Set()); // Réinitialiser les filtres
    setCurrentPage(1); // Réinitialiser la page
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMovies = filteredMovies.slice(startIndex, endIndex);

  return (
    <div>
      <CategoryFilter
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
        onClearFilters={handleClearFilters} // Passer la fonction au composant
      />
      <div className="movie-list">
        {paginatedMovies.length > 0 ? (
          paginatedMovies.map(movie => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              category={movie.category}
              likes={movie.likes}
              dislikes={movie.dislikes}
              onDelete={() => handleDelete(movie.id)}
            />
          ))
        ) : (
          <p>No movies available</p>
        )}
      </div>
      {filteredMovies.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={filteredMovies.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          itemsPerPageOptions={itemsPerPageOptions}
        />
      )}
    </div>
  );
};

export default MovieList;
