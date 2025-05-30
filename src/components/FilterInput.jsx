// components/FilterInput.js
import React from 'react';

export default function FilterInput({ label, value, onChange, type = 'text' }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column', 
        flex: 1,                  
        minWidth: 0,              
      }}
    >
      <label
        style={{
          marginBottom: '6px',
          fontWeight: 'bold',
          fontSize: '14px',
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        style={{
          padding: '8px',
          fontSize: '14px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          width: '100%',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}
