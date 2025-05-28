import React, { useState, useEffect } from 'react';

const TimeInput = ({ value, onChange, error }) => {
  const [displayValue, setDisplayValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Format the value for display (HH:MM:SS)
  useEffect(() => {
    if (!isFocused) {
      let formatted = '';
      if (value && value.length > 0) {
        formatted = value
          .padEnd(6, '0')
          .match(/.{1,2}/g)
          .join(':');
      }
      setDisplayValue(formatted);
    }
  }, [value, isFocused]);

  const handleChange = (e) => {
    // Allow only digits and limit to 6 characters
    const rawValue = e.target.value.replace(/\D/g, '').slice(0, 6);
    onChange(rawValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setDisplayValue(value || '');
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Format the value when blurring
    if (value) {
      const formatted = value
        .padEnd(6, '0')
        .match(/.{1,2}/g)
        .join(':');
      setDisplayValue(formatted);
    }
  };

  return (
    <div className="time-input-container">
      <input
        type="text"
        value={isFocused ? displayValue : displayValue}
        onChange={(e) => {
          setDisplayValue(e.target.value);
          handleChange(e);
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="HH:MM:SS"
        className={`time-input ${error ? 'input-error' : ''}`}
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default TimeInput;