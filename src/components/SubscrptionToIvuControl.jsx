import React from 'react';
import { useNavigate } from 'react-router-dom';

function SubscriptionToIvuControl() {
  const navigate = useNavigate();

  const handleSubscribeClick = () => {
    navigate('/paywithconverge');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Subscribe to Brav Control</h2>
        <p style={styles.description}>$10/month</p>
        <button style={styles.button} onClick={handleSubscribeClick}>
          Pay with Converge
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
  },
  card: {
    padding: '40px',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '300px',
  },
  title: {
    marginBottom: '10px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  description: {
    marginBottom: '20px',
    fontSize: '18px',
    color: '#555',
  },
  button: {
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default SubscriptionToIvuControl;
