import React from 'react';
import logo from '../assets/images/brava.png';


const MainAppSpinner = () => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner-content">
        <img src={logo} alt="Brava Logo" className="spinner-logo" />
        <span className="spinner-loading-text">
          <span className="dot" style={{ animationDelay: '0s' }}>.</span>
          <span className="dot" style={{ animationDelay: '0.2s' }}>.</span>
          <span className="dot" style={{ animationDelay: '0.4s' }}>.</span>
        </span>
      </div>
    </div>
  );
};

export default MainAppSpinner;
