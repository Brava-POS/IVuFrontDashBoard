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
      <div className="editprofilepasswordv2-spinner-overlay">
        <MainAppSpinner />
      </div>
    )}

    <div className="editprofilepasswordv2-wrapper">
      <div className="editprofilepasswordv2-card">
        <h3 className="editprofilepasswordv2-title">Change Password</h3>

        <form onSubmit={handleSubmit} className="editprofilepasswordv2-form" noValidate>
          {/* Current Password */}
          <div className="editprofilepasswordv2-form-group">
            <label className="editprofilepasswordv2-label">Current Password:</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current Password"
              className={`editprofilepasswordv2-input ${submitted && !currentPassword ? 'invalid' : ''}`}
              aria-invalid={submitted && !currentPassword}
              aria-describedby="current-password-error"
            />
            {submitted && !currentPassword && (
              <div id="current-password-error" className="editprofilepasswordv2-error">
                Please enter your current password.
              </div>
            )}
          </div>

          {/* New Password */}
          <div className="editprofilepasswordv2-form-group">
            <label className="editprofilepasswordv2-label">New Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className={`editprofilepasswordv2-input ${submitted && password.length < 8 ? 'invalid' : ''}`}
              aria-invalid={submitted && password.length < 8}
              aria-describedby="password-error"
            />
            {submitted && password.length < 8 && (
              <div id="password-error" className="editprofilepasswordv2-error">
                Password must be at least 8 characters.
              </div>
            )}
            {password && (
              <>
                <div className="editprofilepasswordv2-strength-bar-container">
                  <div
                    className="editprofilepasswordv2-strength-bar"
                    style={{
                      width: strengthWidths[score],
                      backgroundColor: strengthColors[score],
                    }}
                  />
                </div>
                <div
                  className="editprofilepasswordv2-strength-label"
                  style={{ color: strengthColors[score] }}
                >
                  Strength: {strengthLabel(score)}
                </div>
              </>
            )}
          </div>

          {/* Confirm Password */}
          <div className="editprofilepasswordv2-form-group">
            <label className="editprofilepasswordv2-label">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className={`editprofilepasswordv2-input ${submitted && password !== confirmPassword ? 'invalid' : ''}`}
              aria-invalid={submitted && password !== confirmPassword}
              aria-describedby="confirm-password-error"
            />
            {submitted && password !== confirmPassword && (
              <div id="confirm-password-error" className="editprofilepasswordv2-error">
                Passwords do not match.
              </div>
            )}
          </div>

          <button
            type="submit"
            className="editprofilepasswordv2-submit-button"
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





