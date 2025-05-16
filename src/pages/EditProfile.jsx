import React from 'react';
import UserProfile from '../components/UserProfile';

function EditProfile() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <div
        style={{
          padding: '32px',
          borderRadius: '12px',
          backgroundColor: 'var(--red-1)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          minWidth: '300px',
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#fff',
        }}
      >
        Edit Profile
      </div>
    </div>
  );
}

export default EditProfile;
