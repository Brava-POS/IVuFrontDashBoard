import React from 'react';
const CardGridLayout = ({ data = [], renderCard }) => {
  return (
    <div className="card-grid-container">
      {data.map((item, index) => (
        <div className="card-grid-item" key={index}>
          {renderCard(item, index)}
        </div>
      ))}
    </div>
  );
};

export default CardGridLayout;
