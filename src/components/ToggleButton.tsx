// src/components/ToggleButtonComponent.tsx
import React from 'react';
import '../styles/ToggleButton.css'; // Assurez-vous que le chemin est correct

interface ToggleButtonProps {
  showLikes: boolean;
  onToggle: () => void;
}

const ToggleButtonComponent: React.FC<ToggleButtonProps> = ({ showLikes, onToggle }) => {
  return (
    <div className="toggle-container">
      <div className="toggle-button" onClick={onToggle}>
        <span className="toggle-button-icon">
          {showLikes ? '👍' : '👎'}
        </span>
        <span className="toggle-button-text">
          {showLikes ? 'Likes' : 'Dislikes'}
        </span>
      </div>
    </div>
  );
};

export default ToggleButtonComponent;
