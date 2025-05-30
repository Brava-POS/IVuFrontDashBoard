import React from "react";


const TimeInput = ({ value, onChange, error }) => {
   return (
    <div className="date-input-container">
      <label className="date-input-label">Date</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`date-input-field ${error ? "date-input-error" : ""}`}
      />
      {error && <p className="date-error-text">{error}</p>}
    </div>
  );
};

export default TimeInput;
