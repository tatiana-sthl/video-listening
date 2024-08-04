// src/components/CategoryFilter.tsx
import React from 'react';
import '../styles/CategoryFilter.css';

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: Set<string>;
  onCategoryChange: (category: string, isSelected: boolean) => void;
  onClearFilters: () => void; // Nouvelle propriété pour réinitialiser les filtres
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
  onClearFilters
}) => {
  return (
    <div className="category-filter">
      <div 
        className="category-filter-item"
        onClick={onClearFilters}
      >
        Voir tout
      </div>
      {categories.map(category => (
        <div
          key={category}
          className={`category-filter-item ${selectedCategories.has(category) ? 'selected' : ''}`}
          onClick={() => onCategoryChange(category, !selectedCategories.has(category))}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
