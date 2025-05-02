import React from 'react';
import defaultImage from '../assets/images/default-image.png';
const CardComponent = ({ imageSrc, title, data }) => {
  return (
    <div className="card">
      <div className="card-header">
        <img src={imageSrc} alt="Header" className="card-header-image" />
        <h3 className="card-header-title">{title}</h3>
      </div>
      <div className="card-body">
        {Object.entries(data).map(([key, value], index) => (
          <div className="card-row" key={index}>
            
            <span className="card-value">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
CardComponent.defaultProps = {
    imageSrc: defaultImage, 
    title: 'Untitled Card',               
    data: {
      'Key 1': 'Value 1',                 
      'Key 2': 'Value 2',
    },
  };

export default CardComponent;
