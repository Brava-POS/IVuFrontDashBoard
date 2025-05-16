import React from 'react';

function Device() {
  const devices = Array.from({ length: 40 }, (_, i) => `LONNNNNNNNNNNNNNNNNNNNNNNNNNNNNg text${i + 1}`);

  return (
    <div >
      {devices.map((device, index) => (
        <div
          key={index}
          style={{
            padding: '8px',
            marginBottom: '4px',
            backgroundColor: '#f9f9f9',
            borderRadius: '4px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          {device}
        </div>
      ))}
    </div>
  );
}

export default Device;
