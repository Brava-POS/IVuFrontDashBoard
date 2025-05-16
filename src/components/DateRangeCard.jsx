// components/DateRangeCard.jsx
import React from 'react';


const DateRangeCard = ({ startDate, endDate, setStartDate, setEndDate }) => {
  return (
    <div className="date-range-card">
      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>
    </div>
  );
};

export default DateRangeCard;
