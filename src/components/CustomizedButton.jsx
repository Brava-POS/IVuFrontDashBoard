import React from 'react';


function CustomizedButton({ onClick, label = 'Click Me' }) {
  return (
    <button className="back-button" onClick={onClick}>
      {label}
    </button>
  );
}

export default CustomizedButton;
