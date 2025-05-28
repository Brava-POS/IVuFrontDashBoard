import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Left arrow icon


const BackButton = ({ to = '/', label = 'Back' }) => {
  const navigate = useNavigate();

  return (
    <button
      className="back-button"
      onClick={() => navigate(to)}
    >
      <FaArrowLeft className="back-icon" />
      {label}
    </button>
  );
};

export default BackButton;
