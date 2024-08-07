import React from 'react';
import '../styles/MovieCard.css'; 
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

  const totalVotes = likes + dislikes;
  const ratio = totalVotes === 0 ? 0 : (showLikes ? likes : dislikes) / totalVotes;

  return (
    <div className="movie-card">
      <h3>{title}</h3>
      <h4>{category}</h4>
      <ToggleButtonComponent showLikes={showLikes} onToggle={toggleShowLikes} />
      <div className="gauge-wrapper">
        <div className="gauge-container">
          <div
            className="gauge"
            style={{ width: `${ratio * 100}%`, backgroundColor: showLikes ? '#4caf50' : '#f44336' }}
          />
        </div>
        <span className="gauge-value">{showLikes ? likes : dislikes}</span>
      </div>
      <button className="delete-button" onClick={onDelete}>🗑️</button>
    </div>
  );
};

export default MovieCard;
