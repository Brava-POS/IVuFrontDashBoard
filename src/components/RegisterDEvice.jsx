import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import MainAppSpinner from './MainAppSpinner';

// Import DeviceList component
import DeviceList from './DeviceList';

function RegisterDevice() {
  const { axiosInstance } = useAuth();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Registration form state
  const [provider, setProvider] = useState('');
  const [model, setModel] = useState('');

  // Ref for the form
  const formRef = useRef(null);

  const modelsByProvider = {
    CLOVER: ['Kiosk', 'Station Solo', 'FLEX', 'FLEX Pocket', 'Compact', 'Mini'],
    ELAVON: ['Ingenico Desk 3500', 'Ingenico Desk 5000', 'Ingenico Link 2500', 'Ingenico Moby 5500', 'Ingenico Move 5000'],
    PAX: ['CS30', 'CS50', 'CS10', 'CM30'],
  };

  const handleRemoveDevice = async (id) => {
    console.log('Device ID to remove:', id); 
    setLoading(true); 

    try {
      const res = await axiosInstance.delete(`devices/${id}`);
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Removed!',
          text: res.data.message || 'Device removed successfully.',
        });

        await fetchDevices(); 
      }
    } catch (err) {
      console.error('Remove failed:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to remove device.',
      });
    } finally {
      setLoading(false); 
    }
  };

  const fetchDevices = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await axiosInstance.get('devices');

      if (response.status === 200 && response.data.content) {
        setDevices(response.data.content);
      } else {
        setDevices([]);
        setErrorMsg('Failed to load devices');
      }
    } catch (error) {
      console.error('Error fetching devices:', error);
      setErrorMsg('Error fetching devices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [axiosInstance]);

  const handleDeviceRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const url = `devices/register-auto?provider=${provider}&model=${model}`;

    try {
      const response = await axiosInstance.post(url);

      if (
        response.status === 200 &&
        response.data.serialNumber &&
        response.data.deviceSecret &&
        response.data.accessToken &&
        response.data.refreshToken
      ) {
        localStorage.setItem('deviceAccessToken', response.data.accessToken);
        localStorage.setItem('deviceRefreshToken', response.data.refreshToken);

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'You have registered your device successfully!',
        });

        const refreshResponse = await axiosInstance.get('devices');
        if (refreshResponse.status === 200 && refreshResponse.data.content) {
          setDevices(refreshResponse.data.content);
        }

        setProvider('');
        setModel('');
      } else {
        setErrorMsg('Device registration failed: incomplete response.');
      }
    } catch (err) {
      console.error('Device register error:', err);
      const message = err.response?.data?.error || 'Device registration failed due to an error';
      setErrorMsg(message);
    } finally {
      setShowForm(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showForm]);

  if (loading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MainAppSpinner />
      </div>
    );
  }

  if (devices.length === 0) {
    return (
      <div
        style={{
          width: '70%',
          height: 'auto',
          position: 'absolute',
          top: '50%',
          left: '55%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <h2>No device registered, please register your device</h2>
        <form onSubmit={handleDeviceRegister} className="ivu-form" style={{ marginTop: '20px' }} ref={formRef}>
          <label>Provider</label>
          <select
            className="ivu-input"
            style={{ backgroundColor: '#eb976f' }}
            value={provider}
            onChange={(e) => {
              setProvider(e.target.value);
              setModel('');
            }}
            required
          >
            <option value="">Select Provider</option>
            {Object.keys(modelsByProvider).map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </select>

          {provider && (
            <>
              <label>Model</label>
              <select
                className="ivu-input"
                style={{ backgroundColor: '#eb976f' }}
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              >
                <option value="">Select Model</option>
                {modelsByProvider[provider].map((mod) => (
                  <option key={mod} value={mod}>
                    {mod}
                  </option>
                ))}
              </select>
            </>
          )}

          <button type="submit" className="ivu-button ivu-button-primary" style={{ marginTop: '10px' }}>
            Register Device
          </button>

          {errorMsg && <p className="ivu-status error">{errorMsg}</p>}
        </form>
      </div>
    );
  }

  // Show device list
  return (
    <>
      <DeviceList devices={devices} onRemove={handleRemoveDevice} />

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          className="ivu-button ivu-button-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add Device'}
        </button>
      </div>

      {showForm && (
        <form
  onSubmit={handleDeviceRegister}
  className="ivu-form"
  style={{ marginTop: '20px', marginBottom: '100px' }}
  ref={formRef}
>
          <label>Provider</label>
          <select
            className="ivu-input"
            value={provider}
            onChange={(e) => {
              setProvider(e.target.value);
              setModel('');
            }}
            required
          >
            <option value="">Select Provider</option>
            {Object.keys(modelsByProvider).map((prov) => (
              <option key={prov} value={prov}>{prov}</option>
            ))}
          </select>

          {provider && (
            <>
              <label>Model</label>
              <select
                className="ivu-input"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              >
                <option value="">Select Model</option>
                {modelsByProvider[provider].map((mod) => (
                  <option key={mod} value={mod}>{mod}</option>
                ))}
              </select>
            </>
          )}

          <button type="submit" className="ivu-button ivu-button-primary" style={{ marginTop: '10px' }}>
            Register Device
          </button>

          {errorMsg && <p className="ivu-status error">{errorMsg}</p>}
        </form>
      )}
    </>
  );
}

export default RegisterDevice;