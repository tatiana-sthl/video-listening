import React from 'react';
import '../styles/ToggleButton.css'; 

interface ToggleButtonProps {
  showLikes: boolean;
  onToggle: () => void;
}

const ToggleButtonComponent: React.FC<ToggleButtonProps> = ({ showLikes, onToggle }) => {
  return (
    <div className="toggle-container">
      <span className="toggle-button-icon">👍</span>
      <div className={`toggle-switch ${showLikes ? 'on' : 'off'}`} onClick={onToggle}>
        <div className="toggle-slider" />
      </div>
      <span className="toggle-button-icon">👎</span>
    </div>
  );
};

export default ToggleButtonComponent;
