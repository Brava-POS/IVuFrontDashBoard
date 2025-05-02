import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchComponent = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return; // Don't do anything if the query is empty

    // Pass the search query up to the parent
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch(''); // Clear the search in the parent as well
  };

  return (
    <div className="search-component">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="search-input"
        />

        {searchQuery && (
          <button type="button" className="delete-btn" onClick={handleClear}>
            <FaTimes />
          </button>
        )}

        <button type="submit" className="search-btn">
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchComponent;
