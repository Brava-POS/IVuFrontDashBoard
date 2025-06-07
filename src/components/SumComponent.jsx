import React from 'react';

const SumComponent = ({
  image = false,
  title,
  amount = '0.00',   // default to string
  suffix = false,
  showDollar = true,
}) => {
  const formattedAmount = showDollar
    ? parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : amount;

  const renderSuffix = () => {
    if (!suffix) return null;
    // Check if amount represents singular '1'
    const isSingular = parseFloat(amount) === 1;
    return <span className="sum-card-suffix"> {isSingular ? suffix : `${suffix}s`}</span>;
  };

  return (
    <div className="sum-card">
      <div className="sum-card-header">
        {image && (
          <img
            src={image}
            alt={title}
            className="sum-card-icon"
            style={{ display: 'block', marginBottom: '0.5rem' }}
          />
        )}
        <h3 className="sum-card-title">{title}</h3>
      </div>
      <div className="sum-card-body">
        {showDollar && <span>$</span>}
        {formattedAmount}
        {renderSuffix()}
      </div>
    </div>
  );
};

export default SumComponent;
