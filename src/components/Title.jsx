import React from 'react';
import PropTypes from 'prop-types';
const Title = ({ text }) => {
    return (
      <div className="title-container">
        <h2 className="title-text">{text}</h2>
      </div>
    );
  };

Title.propTypes = {
  text: PropTypes.string.isRequired
};

export default Title;