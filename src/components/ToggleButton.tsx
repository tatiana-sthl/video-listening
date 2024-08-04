import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

const ToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  background: #e0e0e0;
  border-radius: 16px;
  padding: 8px;
  width: 120px;
  justify-content: center;
`;

const ThumbIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
  margin-bottom: 4px;
`;

const Number = styled.span`
  font-size: 14px;
  margin-left: 8px;
`;

const GaugeContainer = styled.div<{ showLikes: boolean }>`
  height: 24px;
  width: 100%;
  background: #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 8px;

  & > div {
    height: 100%;
    background: ${({ showLikes }) => (showLikes ? '#76c7c0' : '#ff4d4d')};
  }
`;

interface ToggleButtonProps {
  likes: number;
  dislikes: number;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ likes, dislikes }) => {
  const [showLikes, setShowLikes] = useState(true);

  const total = likes + dislikes;
  const percentage = total ? (showLikes ? (likes / total) : (dislikes / total)) * 100 : 0;

  return (
    <ToggleContainer onClick={() => setShowLikes(!showLikes)}>
      <GaugeContainer showLikes={showLikes}>
        <div style={{ width: `${percentage}%` }} />
      </GaugeContainer>
      {showLikes ? (
        <>
          <ThumbIcon icon={faThumbsUp} style={{ color: 'green' }} />
          <Number>{likes}</Number>
        </>
      ) : (
        <>
          <ThumbIcon icon={faThumbsDown} style={{ color: 'red' }} />
          <Number>{dislikes}</Number>
        </>
      )}
    </ToggleContainer>
  );
};

export default ToggleButton;
