// src/components/Card.js
import React from 'react';
import './Card.css'; // Specific styles
import { useNavigate } from 'react-router-dom';

function Card({ imageUrl, title, linkTo }) {
  const navigate = useNavigate();

  const handleClick = () => {
    
    if (linkTo) {
      if (typeof linkTo === 'object' && linkTo !== null && linkTo.pathname) {
        navigate(linkTo.pathname, { state: linkTo.state });
      } else {
        navigate(linkTo);
      }
    }
    
  };

  return (
    <div className="card" onClick={handleClick}>
      <img src={imageUrl} alt={title} className="card-image" />
      {title && <p className="card-title">{title}</p>}
    </div>
  );
}

export default Card;