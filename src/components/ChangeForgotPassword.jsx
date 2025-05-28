import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import MainAppSpinner from './MainAppSpinner';

function ChangeForgotPassword() {
  const { axiosInstance } = useAuth();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    try {
      await axiosInstance.post('/passwordrecovery/send-password-reset-email', { email });

      Swal.fire({
        icon: 'success',
        title: 'Email Sent',
        text: 'A password reset link has been sent to your email.',
        confirmButtonColor: '#b30000',
      });

      setEmail('');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to send reset email. Please try again.',
        confirmButtonColor: '#b30000',
      });
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

return (
  <div className="forgot-wrapper">
    {submitting && (
      <div className="forgot-overlay">
        <MainAppSpinner />
      </div>
    )}

    <div className="forgot-card">
      <h2 className="forgot-title">Reset Your Password</h2>
      <p className="forgot-subtitle">Enter your email to receive a password reset link.</p>

      <form onSubmit={handleSubmit} className="forgot-form">
        <input
          type="email"
          placeholder="Enter your email"
          className="forgot-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" className="forgot-button">
          Send
        </button>

<a href="/login" className="forgot-link">Return to Login</a>
<a href="/register" className="forgot-link">Create a New Account</a>

      </form>
    </div>
  </div>
);

}

export default ChangeForgotPassword;