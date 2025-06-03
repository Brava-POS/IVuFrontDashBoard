import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import MainAppSpinner from './MainAppSpinner';
import DeviceList from './DeviceList';
import MerchantDropdownSelector from './MerchantDropdownSelector';
import BackButton from './BackButton';

function RegisterDeviceAdmin() {
  const { axiosInstance, hasPermission } = useAuth();
  const navigate = useNavigate();

  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Form states
  const [provider, setProvider] = useState('');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [deviceSecret, setDeviceSecret] = useState('');
  const [merchantId, setMerchantId] = useState('');

  const formRef = useRef(null);

  const modelsByProvider = {
    CLOVER: ['Kiosk', 'Station Solo', 'FLEX', 'FLEX Pocket', 'Compact', 'Mini'],
    ELAVON: ['Ingenico Desk 3500', 'Ingenico Desk 5000', 'Ingenico Link 2500', 'Ingenico Moby 5500', 'Ingenico Move 5000'],
    PAX: ['CS30', 'CS50', 'CS10', 'CM30'],
  };

  const fetchDevices = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('devices');
      setDevices(response.data?.content || []);
    } catch (err) {
      console.error('Error fetching devices:', err);
      setErrorMsg('Error fetching devices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [axiosInstance]);

  const handleRemoveDevice = async (id) => {
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

const handleDeviceRegister = async (e) => {
  e.preventDefault();
  setErrorMsg('');

  // ✅ Alert if merchantId is not selected
  if (!merchantId) {
    Swal.fire({
      icon: 'warning',
      title: 'Missing Merchant',
      text: 'Please select a merchant before registering the device.',
    });
    return;
  }

  setLoading(true);

  const requestBody = {
    serialNumber,
    deviceModel: model,
    deviceBrand: provider,
    status: "ACTIVE",
    deviceSecret,
    merchantId,
  };

  try {
    const response = await axiosInstance.post('devices', requestBody);

    if (response.status === 201 && response.data?.serialNumber) {
      Swal.fire({
        icon: 'success',
        title: 'Device Registered',
        text: `Device ${response.data.serialNumber} registered successfully!`,
      });

      await fetchDevices();

      setProvider('');
      setModel('');
      setSerialNumber('');
      setDeviceSecret('');
      setMerchantId('');
      setShowForm(false);
    } else {
      setErrorMsg('Device registration failed: unexpected server response.');
    }
  } catch (err) {
    console.error('Device registration error:', err);
    const message = err.response?.data?.message || 'Device registration failed.';
    setErrorMsg(message);
  } finally {
    setLoading(false);
  }
};


  const handleSelectMerchant = (merchant) => {
    setMerchantId(merchant?.id || '');
  };

  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showForm]);

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <MainAppSpinner />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>


      <div className="createdr-section-title-large">Devices</div>
        <BackButton to="/devices" label="Back to Devices" />

      {hasPermission("Transactions", "delete") && (
        <MerchantDropdownSelector onSelect={handleSelectMerchant} />
      )}

      {devices.length === 0 ? (
        <div style={{ marginTop: '30px' }}>
          <h2>No device registered, please register your device</h2>
        </div>
      ) : (
        <DeviceList devices={devices} onRemove={handleRemoveDevice} />
      )}

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

          <label>Serial Number</label>
          <input
            type="text"
            className="ivu-input"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            required
          />

          <label>Device Secret</label>
          <input
            type="text"
            className="ivu-input"
            value={deviceSecret}
            onChange={(e) => setDeviceSecret(e.target.value)}
            required
          />

          <button
            type="submit"
            className="ivu-button ivu-button-primary"
            style={{ marginTop: '10px' }}
          >
            Register Device
          </button>

          {errorMsg && <p className="ivu-status error">{errorMsg}</p>}
        </form>
      )}
    </div>
  );
}

export default RegisterDeviceAdmin;
