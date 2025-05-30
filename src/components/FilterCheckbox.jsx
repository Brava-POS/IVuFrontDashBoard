import React from 'react';

export default function FilterCheckbox({ label, checked, onChange }) {
  const styles = {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
       margin:'20px',
    },
    input: {
      width: '16px',
      height: '16px',
      accentColor: '#fc6c6c', 
    },
    label: {
      fontSize: '14px',
      color: '#333',
    },
  };

  return (
    <div style={styles.wrapper}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={styles.input}
      />
      <label style={styles.label}>{label}</label>
    </div>
  );
}
