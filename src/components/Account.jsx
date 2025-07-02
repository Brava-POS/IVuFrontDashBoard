import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainAppSpinner from './MainAppSpinner';

import {
  FaEnvelope, FaMapMarkerAlt, FaStore, FaCheckCircle, FaCalendarAlt,
  FaIdCard, FaEuroSign, FaReceipt, FaClock, FaCreditCard,
  FaMoneyCheckAlt, FaRegThumbsUp, FaUserCircle
} from 'react-icons/fa';

function Account() {
  const { axiosInstance } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/app-users/merchant/profile');

        console.log("response ===",response)
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
          <img src={userData.avatar} alt="User Avatar" className="profile_v2-avatar" />
          <h4 className="profile_v2-name">{userData.username?.toUpperCase()}</h4>
        </div>

        <div className="profile_v2-info">
        

          <h4 className="profile_v2-section-title">Profile</h4>
          <div><FaUserCircle className="profile_v2-icon" /> Username: {userData.username}</div>
          <div><FaEnvelope className="profile_v2-icon" /> Email: {userData.email}</div>
          <div><FaMapMarkerAlt className="profile_v2-icon" /> Address: {userData.address}, {userData.city}, {userData.zip}, {userData.country}</div>
          <div><FaCalendarAlt className="profile_v2-icon" /> Created At: {userData.createdAt}</div>
        </div>


{/* Account Card */}
<div className="profile_v2-info">
  <h4 className="profile_v2-section-title">Account</h4>
  <div className="profile_v2-line">
    <FaStore className="profile_v2-icon" /> <strong>Merchant #:</strong> {userData.merchantSerialCode}
  </div>
  <div className="profile_v2-line">
    <FaCheckCircle className="profile_v2-icon" /> <strong>Status:</strong> {userData.merchantStatus}
  </div>
</div>

{/* Subscription Section - only if at least one has meaningful data */}
{Array.isArray(userData.elavonSubscriptions) &&
  userData.elavonSubscriptions.some(
    sub =>
      sub.planName ||
      sub.planBillingCycle ||
      sub.planPrice ||
      sub.subscrptionStatus ||
      sub.subscrptionNextBillingDate
  ) && (
    <div className="profile_v2-info">
      <h4 className="profile_v2-section-title">Subscription</h4>
      {userData.elavonSubscriptions.map((sub, idx) =>
        sub.planName ||
        sub.planBillingCycle ||
        sub.planPrice ||
        sub.subscrptionStatus ||
        sub.subscrptionNextBillingDate ? (
          <div key={idx}>
            <div className="profile_v2-line">
              <FaIdCard className="profile_v2-icon" /> <strong>Plan:</strong>{' '}
              {sub.planName || 'N/A'}
            </div>
            <div className="profile_v2-line">
              <FaEuroSign className="profile_v2-icon" />{' '}
              <strong>{sub.planBillingCycle || 'N/A'}</strong> - $
              {sub.planPrice || '0.00'}
            </div>
            <div className="profile_v2-line">
              <FaCheckCircle className="profile_v2-icon" /> <strong>Status:</strong>{' '}
              {sub.subscrptionStatus || 'N/A'}
            </div>
            <div className="profile_v2-line">
              <FaClock className="profile_v2-icon" /> <strong>Next Billing:</strong>{' '}
              {sub.subscrptionNextBillingDate || 'N/A'}
            </div>
          </div>
        ) : null
      )}
    </div>
)}


{/* Payment Section - only if at least one has lastPayment */}
{Array.isArray(userData.elavonSubscriptions) &&
  userData.elavonSubscriptions.some(sub => sub.lastPayment) && (
    <div className="profile_v2-info">
      <h4 className="profile_v2-section-title">Payment</h4>
      {userData.elavonSubscriptions.map((sub, idx) =>
        sub.lastPayment ? (
          <div key={idx}>
            <div className="profile_v2-line">
              <FaReceipt className="profile_v2-icon" />
              <strong>Payment ID:</strong> {sub.lastPayment.sslTxnId}
            </div>
            <div className="profile_v2-line">
              <FaMoneyCheckAlt className="profile_v2-icon" />
              <strong>Amount:</strong> ${sub.lastPayment.sslAmount}
            </div>
            <div className="profile_v2-line">
              <FaRegThumbsUp className="profile_v2-icon" />
              <strong>Result:</strong> {sub.lastPayment.sslResult}
            </div>
            <div className="profile_v2-line">
              <FaClock className="profile_v2-icon" />
              <strong>Time:</strong> {sub.lastPayment.sslTxnTime}
            </div>
          </div>
        ) : null
      )}
    </div>
)}

{/* Devices Section - only if devices array contains at least one non-null device */}
{Array.isArray(userData.devices) &&
  userData.devices.some(
    dev =>
      dev.serialNumber ||
      dev.provider ||
      dev.model ||
      dev.status
  ) && (
    <div className="profile_v2-info">
      <h4 className="profile_v2-section-title">Devices</h4>
      {userData.devices.map((dev, idx) =>
        dev.serialNumber || dev.provider || dev.model || dev.status ? (
          <div key={idx} className="profile_v2-device">
            <div>
              <FaCreditCard className="profile_v2-icon" /> Serial Number:{' '}
              {dev.serialNumber || 'N/A'}
            </div>
            <div style={{ paddingLeft: '24px' }}>
              Provider: {dev.provider || 'N/A'}
            </div>
            <div style={{ paddingLeft: '24px' }}>
              Model: {dev.model || 'N/A'}
            </div>
            <div style={{ paddingLeft: '24px' }}>
              Status: {dev.status || 'N/A'}
            </div>
            <hr />
          </div>
        ) : null
      )}
    </div>
)}




      </div>
    </div>
  );
}

export default Account;
