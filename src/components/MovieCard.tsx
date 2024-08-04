// src/components/MovieCard.tsx
import React from 'react';
import '../styles/MovieCard.css'; // Assurez-vous que le chemin est correct
import ToggleButtonComponent from './ToggleButton';

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

  // Calculer le ratio pour la jauge
  const totalVotes = likes + dislikes;
  const ratio = totalVotes === 0 ? 0 : (showLikes ? likes : dislikes) / totalVotes;

  return (
    <div className="movie-card">
      <button className="delete-button" onClick={onDelete}>Supprimer</button>
      <h3>{title}</h3>
      <p>{category}</p>
      <ToggleButtonComponent showLikes={showLikes} onToggle={toggleShowLikes} />
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
