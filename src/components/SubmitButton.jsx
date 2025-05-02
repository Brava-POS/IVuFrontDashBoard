// components/SubmitButton.jsx
import React from 'react';
import PropTypes from 'prop-types';


const SubmitButton = ({ text, type = "submit", disabled = false, onClick }) => {
  return (
    <button
      className="submit-button"
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default SubmitButton;