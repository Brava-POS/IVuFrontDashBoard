import React from 'react';


const TransactionCountCard = ({ data }) => {
  if (!data) return null;

  const { image, title, details } = data;

  return (
    <div className="transaction-count-card">
      <div className="transaction-card-horizontal">
        <img src={image} alt={title} className="transaction-card-icon" />
        <h3 className="transaction-card-title">{title}</h3>
        <p className="transaction-card-value">{details?.Count}</p>
      </div>
    </div>
  );
};
export default TransactionCountCard;
