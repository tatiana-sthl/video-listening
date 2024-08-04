// src/components/CategoryFilter.tsx
import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  margin: 16px 0;
`;

const Label = styled.label`
  margin-right: 8px;
`;

const Select = styled.select`
  padding: 8px;
`;

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <FilterContainer>
      <Label htmlFor="category-filter">Filtrer par catégorie:</Label>
      <Select
        id="category-filter"
        value={selectedCategory || ''}
        onChange={(e) => onCategoryChange(e.target.value || null)}
      >
        <option value="">Toutes les catégories</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </Select>
    </FilterContainer>
  );
};

export default CategoryFilter;
