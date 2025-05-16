import React from 'react';
import defaultImage from '../assets/images/default-image.png';

const CardComponent = ({ cardData }) => {
  return (
    <div className="card-grid-container">
      {cardData.map((card, index) => (
        <div className="card_customized" key={index}>
          <div className="card-header_customized">
            <img
              src={card.image || defaultImage}
              alt="Header"
              className="card-header-image_customized"
            />
            <h3 className="card-header-title">{card.title || 'Untitled Card'}</h3>
          </div>
          <div className="card-body_customized">
            {Object.entries(card.details || {}).map(([key, value], idx) => (
              <div className="card-row_customized" key={idx}>
                <span className="card-value_customized">{value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardComponent;
