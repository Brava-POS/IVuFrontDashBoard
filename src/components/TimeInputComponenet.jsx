import React from "react";

const TimeInputComponent = ({ value, onChange, error }) => {
  // Convert HHMMSS string to HH:MM:SS for input field
  const formatForInput = (val) => {
    if (!/^\d{6}$/.test(val)) return "";
    return `${val.slice(0, 2)}:${val.slice(2, 4)}:${val.slice(4, 6)}`;
  };

  // Convert HH:MM:SS input back to HHMMSS
  const handleChange = (e) => {
    const val = e.target.value; // HH:MM:SS
    const parts = val.split(":");
    if (parts.length === 3) {
      const formatted = parts.join(""); // HHMMSS
      onChange(formatted);
    } else {
      onChange(""); // fallback to empty if invalid
    }
  };

  return (
    <div className="time-input-container">
      <label className="time-input-label">Time</label>
      <input
        type="time"
        step="1"
        value={formatForInput(value)}
        onChange={handleChange}
        className={`time-input-field ${error ? "time-input-error" : ""}`}
      />
      {error && <p className="time-error-text">{error}</p>}
    </div>
  );
};

export default TimeInputComponent;
