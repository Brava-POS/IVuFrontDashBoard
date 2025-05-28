import React from 'react';


const Input = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  error = '',
  placeholder = '',
  maxLength,
  className = '',
 step = '',  
  prefix = '',
    min = '',
     max = '',
  
}) => {
  return (
    <div className="input-wrapper">
      {label && <label htmlFor={name} className="input-label">{label}</label>}

         <div className="input-prefix-wrapper">
        {prefix && <span className="input-prefix">{prefix}</span>}
      <input
          id={name}
        step={step}
          name={name}
          type={type}
          value={value}
          maxLength={maxLength}
          onChange={onChange}
          placeholder={placeholder}
          className={`input-field ${prefix ? 'input-field-with-prefix' : ''} ${error ? 'input-error' : ''} ${className}`}
/>
      
    </div>
    {error && <div className="input-error-text">{error}</div>}
    </div>
  );
};

export default Input;
