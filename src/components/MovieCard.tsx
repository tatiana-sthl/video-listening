// src/components/MovieCard.tsx
import React from 'react';
import '../styles/MovieCard.css'; // Import du fichier CSS

interface MovieCardProps {
  title: string;
  category: string;
  likes: number;
  dislikes: number;
  onDelete: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, category, likes, dislikes, onDelete }) => {
  const [showLikes, setShowLikes] = React.useState(true);

  const toggleShowLikes = () => {
    setShowLikes(prev => !prev);
  };

  const ratio = (showLikes ? likes : dislikes) / (likes + dislikes);

  return (
    <div className="movie-card">
      <button className="delete-button" onClick={onDelete}>Supprimer</button>
      <h3>{title}</h3>
      <p>{category}</p>
      <div className="toggle-button" onClick={toggleShowLikes}>
        <span className="toggle-button-icon">
          {showLikes ? '👍' : '👎'}
        </span>
        <span className="toggle-button-text">
          {showLikes ? 'Likes' : 'Dislikes'}
        </span>
      </div>
      <div className="gauge-container">
        <div
          className="gauge"
          style={{ width: `${ratio * 100}%`, backgroundColor: showLikes ? '#4caf50' : '#f44336' }}
        />
      </div>
      <p>{showLikes ? likes : dislikes}</p>
    </div>
  );
};

export default MovieCard;
