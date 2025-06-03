import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainAppSpinner from '../components/MainAppSpinner';
import BackButton from '../components/BackButton';

import {
  FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaUserCircle,
  FaCheckCircle
} from 'react-icons/fa';

import { getDeviceImage, getProviderLogo } from '../utils/deviceImages';

function UsersViewPage() {

   const { axiosInstance, user, hasPermission } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get(`devices/${id}`);
        setUserData(response.data);
      } catch (err) {
        console.error('Failed to load device:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const formatBool = (value) => (value ? 'Yes' : 'No');
  const formatDate = (value) => value ? new Date(value).toLocaleString() : '—';

  if (loading) return <div className="profile_v2-spinner-wrapper"><MainAppSpinner /></div>;
  if (!userData) return <div className="profile_v2-error-message">Failed to load device info.</div>;

  const providerLogo = getProviderLogo(userData.deviceProvider);
  const modelImage = getDeviceImage(userData);

  return (
    <>
      <BackButton to="/devices" label="Back to Devices" />

      <div style={{
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'sans-serif',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          Device 
        </h2>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap',
          marginBottom: '30px',
        }}>
          {providerLogo && (
            <div style={{
              width: '180px',
              padding: '15px',
              borderRadius: '12px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              textAlign: 'center',
              backgroundColor: '#fff'
            }}>
              <img src={providerLogo} alt="Provider Logo" style={{ width: '100px', marginBottom: '10px' }} />
              <div style={{ fontWeight: 'bold' }}>Provider</div>
              <div>{userData.deviceProvider}</div>
            </div>
          )}
          {modelImage && (
            <div style={{
              width: '180px',
              padding: '15px',
              borderRadius: '12px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              textAlign: 'center',
              backgroundColor: '#fff'
            }}>
              <img src={modelImage} alt="Device Model" style={{ width: '120px', marginBottom: '10px' }} />
              <div style={{ fontWeight: 'bold' }}>Model</div>
              <div>{userData.deviceModal}</div>
            </div>
          )}
        </div>

        <h4 style={{ marginBottom: '15px', fontSize: '18px', color: '#333' }}>Device Info</h4>
        <div style={{ marginBottom: '10px' }}><FaUserCircle style={{ marginRight: '8px' }} /> <strong>Device ID:</strong> {userData.id}</div>
        <div style={{ marginBottom: '10px' }}><FaEnvelope style={{ marginRight: '8px' }} /> <strong>Serial Number:</strong> {userData.serialNumber}</div>
        <div style={{ marginBottom: '10px' }}><FaMapMarkerAlt style={{ marginRight: '8px' }} /> <strong>Model:</strong> {userData.deviceModal}</div>
        <div style={{ marginBottom: '10px' }}><FaCalendarAlt style={{ marginRight: '8px' }} /> <strong>Status:</strong> {userData.status}</div>
        <div style={{ marginBottom: '10px' }}><FaCheckCircle style={{ marginRight: '8px' }} /> <strong>Registered At:</strong> {formatDate(userData.registeredAt)}</div>
      </div>
    </>
  );
}

export default UsersViewPage;
