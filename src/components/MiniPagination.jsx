// MiniPagination.jsx
import React from 'react';
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight
} from 'react-icons/fa';

const MiniPagination = ({ currentPage, totalPages, onPageChange }) => {
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage + 1 >= totalPages;

  return (
    <div className="flex items-center justify-center gap-3 py-3 text-gray-700 text-sm">
      <button
        onClick={() => onPageChange(0)}
        disabled={isFirstPage}
        className="p-2 disabled:opacity-40"
        title="First Page"
      >
        <FaAngleDoubleLeft />
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        className="p-2 disabled:opacity-40"
        title="Previous Page"
      >
        <FaAngleLeft />
      </button>

      <span className="px-2">
        Page <strong>{currentPage + 1}</strong> of <strong>{totalPages}</strong>
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        className="p-2 disabled:opacity-40"
        title="Next Page"
      >
        <FaAngleRight />
      </button>
      <button
        onClick={() => onPageChange(totalPages - 1)}
        disabled={isLastPage}
        className="p-2 disabled:opacity-40"
        title="Last Page"
      >
        <FaAngleDoubleRight />
      </button>
    </div>
  );
};

export default MiniPagination;
