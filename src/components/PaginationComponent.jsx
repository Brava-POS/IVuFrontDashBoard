import React from 'react';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const MAX_VISIBLE_PAGES = 5;
  const getPageNumbers = () => {
    const pages = [];
    const half = Math.floor(MAX_VISIBLE_PAGES / 2);
    let start = Math.max(0, currentPage - half);
    let end = Math.min(totalPages - 1, currentPage + half);
    if (currentPage <= half) {
      end = Math.min(totalPages - 1, MAX_VISIBLE_PAGES - 1);
    } else if (currentPage + half >= totalPages) {
      start = Math.max(0, totalPages - MAX_VISIBLE_PAGES);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(0)} disabled={currentPage === 0}>⏮ First </button>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 0}>◀ Prev</button>

      {getPageNumbers().map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={number === currentPage ? 'active' : ''}
        >
          {number + 1}
        </button>
      ))}

      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>Next ▶</button>
      <button onClick={() => onPageChange(totalPages - 1)} disabled={currentPage === totalPages - 1}>Last ⏭</button>
    </div>
  );
};

export default PaginationComponent;
