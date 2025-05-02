import React, { useState, useEffect } from 'react';

import CardComponent from './CardComponent';
const CardGrid = ({ cardData }) => {
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
  
      const timer = setTimeout(() => setLoading(false), 2000); 
  
      return () => clearTimeout(timer); 
    }, []);
  
    if (loading) {
      return (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      );
    }
  
    return (
      <div className="card-grid-wrapper">
        <div className="card-grid">

          {cardData.map((card, index) => (
            <CardComponent
              key={index}
              imageSrc={card.image || CardComponent.defaultProps.imageSrc}
            title={card.title || CardComponent.defaultProps.title}
            data={card.details || CardComponent.defaultProps.data}
            />
          ))}
        </div>


        
      </div>
    );
  };
  
  export default CardGrid;