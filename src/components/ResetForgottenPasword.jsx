import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import zxcvbn from 'zxcvbn';
import MainAppSpinner from './MainAppSpinner';



function ResetForgottenPasword() {
  const { axiosInstance } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const strengthColors = ['#f8d7da', '#f5c6cb', '#f1a1a5', '#d9534f', '#b30000'];
  const strengthWidths = ['10%', '30%', '60%', '85%', '100%'];
  const strengthLabel = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const score = zxcvbn(password).score;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (password.length < 8 || password !== confirmPassword) return;

    setLoading(true);
    try {
      // Send password as query parameter as backend expects
      const response = await axiosInstance.post(
        `/passwordrecovery/create-new-password?token=${encodeURIComponent(token)}&newPassword=${encodeURIComponent(password)}`
      );

      if (response.status === 200 && response.data === "Password successfully updated") {
        Swal.fire({
          html: `
            <div style="display: flex; flex-direction: column; align-items: center;">
              <div style="
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background-color: #f8d7da;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 15px;
              ">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#b30000" viewBox="0 0 16 16">
                  <path d="M16 2L6 12l-4-4" stroke="#b30000" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <p style="margin: 0; color: #b30000;">Password has been reset successfully</p>
            </div>
          `,
          confirmButtonColor: '#b30000',
          confirmButtonText: 'OK',
        }).then(() => navigate('/login'));
      } else {
        throw new Error('Unexpected response');
      }
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err.response?.data || 'Failed to reset password.',
        icon: 'error',
        confirmButtonColor: '#b30000',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <MainAppSpinner />
        </div>
      )}

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f9f9f9',
      }}>
        <div style={{
          width: '60%',
          backgroundColor: '#fff',
          border: '1px solid darkred',
          borderRadius: 8,
          padding: '2rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}>
          <h3 style={{ color: '#f35235', marginBottom: '1.5rem', textAlign: 'center' }}>
            Reset Your Password
          </h3>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} noValidate>
            {/* New Password */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: '200', color: '#ec3818', marginBottom: 6 }}>
                New Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                style={{
                  padding: '10px',
                  border: `1px solid ${submitted && password.length < 8 ? 'red' : 'darkred'}`,
                  borderRadius: '5px',
                  color: '#800000',
                  fontSize: 16,
                }}
              />
              {submitted && password.length < 8 && (
                <div style={{ color: 'red', fontSize: 14, marginTop: 4 }}>
                  Password must be at least 8 characters.
                </div>
              )}
              {password && (
                <>
                  <div style={{
                    height: 6,
                    backgroundColor: '#f8d7da',
                    borderRadius: 3,
                    overflow: 'hidden',
                    marginTop: 8,
                  }}>
                    <div style={{
                      height: '100%',
                      width: strengthWidths[score],
                      backgroundColor: strengthColors[score],
                      transition: 'width 0.3s ease',
                    }} />
                  </div>
                  <div style={{ marginTop: 6, color: strengthColors[score], fontSize: 14, fontWeight: 'bold' }}>
                    Strength: {strengthLabel[score]}
                  </div>
                </>
              )}
            </div>

            {/* Confirm Password */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: '600', color: '#ec3818', marginBottom: 6 }}>
                Confirm Password:
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                style={{
                  padding: '10px',
                  border: `1px solid ${submitted && password !== confirmPassword ? 'red' : 'darkred'}`,
                  borderRadius: '5px',
                  color: '#800000',
                  fontSize: 16,
                }}
              />
              {submitted && password !== confirmPassword && (
                <div style={{ color: 'red', fontSize: 14, marginTop: 4 }}>
                  Passwords do not match.
                </div>
              )}
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: '#f35235',
                color: 'white',
                padding: '12px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: 16,
                marginTop: '1rem',
                width: '100%',
              }}
              // Do NOT use onMouseEnter/onMouseLeave for CSS: do in CSS or use [active]/[hover] pseudo-classes
            >
              Reset Password
            </button>
          </form>
        </div>
         <p> <a href="/login" style={{ color: '#ec3818', fontWeight: 'bold' }}>Login</a></p>
      </div>
    </>
  );
}

export default ResetForgottenPasword;