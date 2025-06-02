import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


import {
  FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaUserCircle,
  FaPhone, FaCheckCircle, FaBan, FaLock, FaBell,
  FaTimesCircle, FaGlobe, FaLanguage, FaClock, FaUserEdit, FaLaptopHouse, FaSignInAlt
} from 'react-icons/fa';
import MainAppSpinner from '../components/MainAppSpinner';
import BackButton from '../components/BackButton';

function UsersViewPage() {
  const { axiosInstance } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
    const { id } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get(`app-users/${id}`);
        setUserData(response.data);

        console.log("get app user ",response.data)
      } catch (err) {
        console.error('Failed to load user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
    const formatBool = (value) => (value ? 'Yes' : 'No');
  const formatDate = (value) => value ? new Date(value).toLocaleString() : '—';

  if (loading) return <div className="profile_v2-spinner-wrapper"><MainAppSpinner /></div>;
  if (!userData) return <div className="profile_v2-error-message">Failed to load profile.</div>;

return (
    <>
      <BackButton to="/users" label="Back to Users" />

      <div className="profile_v2-info">
        <div className="profile_v2-usercard">
          <img src={userData.avatarUrl} alt="User Avatar" className="profile_v2-avatar" />
          <h4 className="profile_v2-name">{userData.username?.toUpperCase()}</h4>
        </div>

        <h4 className="profile_v2-section-title">Profile</h4>
        <div><FaUserCircle className="profile_v2-icon" /> Username: {userData.username}</div>
        <div><FaEnvelope className="profile_v2-icon" /> Email: {userData.email}</div>
        <div><FaPhone className="profile_v2-icon" /> Phone: {userData.phone}</div>
        <div><FaMapMarkerAlt className="profile_v2-icon" /> Address: {userData.address}, {userData.city}, {userData.zip}, {userData.country}</div>
        <div><FaCalendarAlt className="profile_v2-icon" /> Created At: {formatDate(userData.createdAt)}</div>

        <h4 className="profile_v2-section-title">Status</h4>
        <div><FaCheckCircle className="profile_v2-icon" /> Active: {formatBool(userData.active)}</div>
        <div><FaCheckCircle className="profile_v2-icon" /> Enabled: {formatBool(userData.enabled)}</div>
        <div><FaTimesCircle className="profile_v2-icon" /> Deleted: {formatBool(userData.deleted)}</div>
        <div><FaBan className="profile_v2-icon" /> Blocked: {formatBool(userData.blocked)}</div>
        <div><FaClock className="profile_v2-icon" /> Account Expired: {formatBool(userData.accountExpired)}</div>
        <div><FaClock className="profile_v2-icon" /> Credentials Expired: {formatBool(userData.credentialsExpired)}</div>
        <div><FaLock className="profile_v2-icon" /> Account Locked: {formatBool(userData.accountLocked)}</div>
        <div><FaBell className="profile_v2-icon" /> Notifications Enabled: {formatBool(userData.notificationsEnabled)}</div>

        <h4 className="profile_v2-section-title">Personal Info</h4>
        <div><FaUserEdit className="profile_v2-icon" /> First Name: {userData.firstName}</div>
        <div><FaUserEdit className="profile_v2-icon" /> Middle Name: {userData.middleName || '—'}</div>
        <div><FaUserEdit className="profile_v2-icon" /> Last Name: {userData.lastName}</div>
        <div><FaUserEdit className="profile_v2-icon" /> Second Last Name: {userData.secondLastName || '—'}</div>
        <div><FaLanguage className="profile_v2-icon" /> Language: {userData.language || '—'}</div>
        <div><FaGlobe className="profile_v2-icon" /> Timezone: {userData.timezone || '—'}</div>

        <h4 className="profile_v2-section-title">Login Info</h4>
        <div><FaSignInAlt className="profile_v2-icon" /> Last Login At: {formatDate(userData.lastLoginAt)}</div>
        <div><FaLaptopHouse className="profile_v2-icon" /> Created By IP: {userData.createdByIp || '—'}</div>
        <div><FaLaptopHouse className="profile_v2-icon" /> Last Login IP: {userData.lastLoginIp || '—'}</div>
      </div>
    </>
  );
}

export default UsersViewPage;



