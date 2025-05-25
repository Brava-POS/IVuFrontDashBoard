import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainAppSpinner from './MainAppSpinner';

import {
  FaEnvelope, FaMapMarkerAlt, FaUserCircle, FaPhone, FaCalendarAlt
} from 'react-icons/fa';

function Profile() {
  const { axiosInstance } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/app-users/self');
        setUserData(response.data);
      } catch (err) {
        console.error('Failed to load user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="profile_v2-spinner-wrapper"><MainAppSpinner /></div>;
  if (!userData) return <div className="profile_v2-error-message">Failed to load profile.</div>;

  return (
    <div className="profile_v2-wrapper">
      <div className="profile_v2-card">

        <div className="profile_v2-usercard">
          <img src={userData.avatarUrl} alt="User Avatar" className="profile_v2-avatar" />
          <h4 className="profile_v2-name">{userData.username?.toUpperCase()}</h4>
        </div>

        <div className="profile_v2-info">
          <button className="profile_v2-edit-button" onClick={() => navigate('/editprofile')}>
            Edit
          </button>

          <h4 className="profile_v2-section-title">Profile</h4>
          <div className="profile_v2-line"><FaUserCircle className="profile_v2-icon" /> Username: {userData.username}</div>
          <div className="profile_v2-line"><FaEnvelope className="profile_v2-icon" /> Email: {userData.email}</div>
          <div className="profile_v2-line"><FaPhone className="profile_v2-icon" /> Phone: {userData.phone}</div>
          <div className="profile_v2-line">
            <FaMapMarkerAlt className="profile_v2-icon" /> Address: {userData.address}, {userData.city}, {userData.state}, {userData.zip}, {userData.country}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;
