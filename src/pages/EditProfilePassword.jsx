import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import zxcvbn from 'zxcvbn';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import MainAppSpinner from '../components/MainAppSpinner';





function EditProfilePassword() {
  const { axiosInstance } = useAuth();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const strengthLabel = (score) => {
    switch (score) {
      case 0: return 'Very Weak';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      default: return '';
    }
  };

  const strengthColors = ['#f8d7da', '#f5c6cb', '#f1a1a5', '#d9534f', '#b30000'];
  const strengthWidths = ['10%', '30%', '60%', '85%', '100%'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!currentPassword) return;
    if (password.length < 8) return;
    if (password !== confirmPassword) return;

    setLoading(true);
    try {
      await axiosInstance.put('/app-users/self', {
       currentPassword,
        password,
      });
      Swal.fire({
        title: '',
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
            <p style="margin: 0; color: #b30000;">User password updated successfully</p>
          </div>
        `,
        confirmButtonColor: '#b30000',
        confirmButtonText: 'OK',
      }).then(() => navigate('/profile'));
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to update password.',
        icon: 'error',
        confirmButtonColor: '#b30000',
      });
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = zxcvbn(password);
  const score = passwordStrength.score;

  return (
    <>
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MainAppSpinner />
        </div>
      )}

      <div
        className="profile_v2-wrapper"
        style={{ display: 'flex', justifyContent: 'center', padding: 20, minHeight: '80vh' }}
      >
        <div
          className="profile_v2-card"
          style={{
            border: '1px solid darkred',
            borderRadius: 8,
            padding: '2rem',
            maxWidth: 400,
            width: '100%',
            backgroundColor: '#fff',
          }}
        >
          <h2 style={{ color: 'darkred', marginBottom: '1.5rem', textAlign: 'center' }}>
            Change Password
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            noValidate
          >
            {/* Current Password */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: '600', color: '#800000', marginBottom: 6 }}>
                Current Password:
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current Password"
                style={{
                  padding: '10px',
                  border: `1px solid ${submitted && !currentPassword ? 'red' : 'red'}`,
                  borderRadius: '5px',
                  color: '#800000',
                  fontSize: 16,
                }}
                aria-invalid={submitted && !currentPassword}
                aria-describedby="current-password-error"
              />
              {submitted && !currentPassword && (
                <div
                  id="current-password-error"
                  style={{ color: 'red', marginTop: 4, fontSize: 14 }}
                >
                  Please enter your current password.
                </div>
              )}
            </div>

            {/* New Password */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: '600', color: '#800000', marginBottom: 6 }}>
                New Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                style={{
                  padding: '10px',
                  border: `1px solid ${submitted && password.length < 8 ? 'red' : 'red'}`,
                  borderRadius: '5px',
                  color: '#800000',
                  fontSize: 16,
                }}
                aria-invalid={submitted && password.length < 8}
                aria-describedby="password-error"
              />
              {submitted && password.length < 8 && (
                <div
                  id="password-error"
                  style={{ color: 'red', marginTop: 4, fontSize: 14 }}
                >
                  Password must be at least 8 characters.
                </div>
              )}
              {password && (
                <>
                  <div
                    style={{
                      height: 6,
                      width: '100%',
                      backgroundColor: '#f8d7da',
                      borderRadius: 3,
                      marginTop: 8,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: strengthWidths[score],
                        backgroundColor: strengthColors[score],
                        borderRadius: 3,
                        transition: 'width 0.5s ease, background-color 0.5s ease',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      fontWeight: 'bold',
                      color: strengthColors[score],
                      fontSize: 14,
                      userSelect: 'none',
                    }}
                  >
                    Strength: {strengthLabel(score)}
                  </div>
                </>
              )}
            </div>

            {/* Confirm Password */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: '600', color: '#800000', marginBottom: 6 }}>
                Confirm Password:
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                style={{
                  padding: '10px',
                  border: `1px solid ${submitted && password !== confirmPassword ? 'red' : 'red'}`,
                  borderRadius: '5px',
                  color: '#800000',
                  fontSize: 16,
                }}
                aria-invalid={submitted && password !== confirmPassword}
                aria-describedby="confirm-password-error"
              />
              {submitted && password !== confirmPassword && (
                <div
                  id="confirm-password-error"
                  style={{ color: 'red', marginTop: 4, fontSize: 14 }}
                >
                  Passwords do not match.
                </div>
              )}
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: 'darkred',
                color: 'white',
                padding: '12px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: 16,
                alignSelf: 'center',
                marginTop: '1rem',
                width: '100%',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#990000')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'darkred')}
            >
              Save Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProfilePassword;





