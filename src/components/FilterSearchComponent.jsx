import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';


const FilterSearchComponent = ({ onApplyFilters }) => {
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [controlNumber, setControlNumber] = useState('');
  const [authorizationCode, setAuthorizationCode] = useState('');
  const [lastCardNumber, setLastCardNumber] = useState('');

  const handleApplyFilters = () => {

    
    const dateRange = dateStart && dateEnd ? `${dateStart.replaceAll('-', '')}-${dateEnd.replaceAll('-', '')}` 
                    : dateStart ? `${dateStart.replaceAll('-', '')}` 
                    : '';
    const timeRange = timeStart && timeEnd ? `${timeStart.replaceAll(':', '')}-${timeEnd.replaceAll(':', '')}` 
                    : timeStart ? `${timeStart.replaceAll(':', '')}` 
                    : '';

    onApplyFilters({ 
      dateRange, 
      timeRange, 
      controlNumber, 
      authorizationCode, 
      lastCardNumber 
    });
  };

  return (
    <div className="filter-search-container">
      <div className="filter-row">
        <div className="filter-item">
          <label>Start Date:</label>
          <input
            type="date"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
          />
        </div>
        <div className="filter-item">
          <label>End Date:</label>
          <input
            type="date"
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
          />
        </div>
        <div className="filter-item">
          <label>Start Time:</label>
          <input
            type="time"
            value={timeStart}
            onChange={(e) => setTimeStart(e.target.value)}
          />
        </div>
        <div className="filter-item">
          <label>End Time:</label>
          <input
            type="time"
            value={timeEnd}
            onChange={(e) => setTimeEnd(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-row">
        <div className="filter-item">
          <label>Control Number:</label>
          <input
            type="text"
            placeholder="IVUCC00001"
            value={controlNumber}
            onChange={(e) => setControlNumber(e.target.value)}
          />
        </div>
        <div className="filter-item">
          <label>Authorization Code:</label>
          <input
            type="text"
            placeholder="AUTH1234"
            value={authorizationCode}
            onChange={(e) => setAuthorizationCode(e.target.value)}
          />
        </div>
        <div className="filter-item">
          <label>Last 4 Card Number:</label>
          <input
            type="text"
            placeholder="1234"
            value={lastCardNumber}
            onChange={(e) => setLastCardNumber(e.target.value)}
          />
        </div>
        <div className="filter-item search-button">
          <button onClick={handleApplyFilters}>
            <FaSearch /> Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSearchComponent;
