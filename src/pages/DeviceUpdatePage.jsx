import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import MainAppSpinner from '../components/MainAppSpinner';
import BackButton from '../components/BackButton';


const modelsByProvider = {
  CLOVER: ['Kiosk', 'Station Solo', 'FLEX', 'FLEX Pocket', 'Compact', 'Mini'],
  ELAVON: ['Ingenico Desk 3500', 'Ingenico Desk 5000', 'Ingenico Link 2500', 'Ingenico Moby 5500', 'Ingenico Move 5000'],
  PAX: ['CS30', 'CS50', 'CS10', 'CM30'],
};

function DeviceUpdatePage() {
  const { axiosInstance } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [device, setDevice] = useState(null);
  const [error, setError] = useState('');

  const [serialNumber, setSerialNumber] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [deviceBrand, setDeviceBrand] = useState('');
  const [status, setStatus] = useState('');
  const [deviceSecret, setDeviceSecret] = useState('');

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const res = await axiosInstance.get(`devices/${id}`);
        if (res.status === 200) {
          setDevice(res.data);
          setSerialNumber(res.data.serialNumber || '');
          setDeviceModel(res.data.deviceModal || '');
          setDeviceBrand(res.data.deviceProvider || '');
          setStatus(res.data.status || '');
          setDeviceSecret(res.data.deviceSecret || '');
        } else {
          setError('Failed to load device data.');
        }
      } catch (err) {
        console.error(err);
        setError('Error fetching device data.');
      } finally {
        setLoading(false);
      }
    };
    fetchDevice();
  }, [axiosInstance, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
     const payload = {
                     serialNumber,
                     deviceModal: deviceModel,      
                     deviceProvider: deviceBrand,     
                      status,
                         deviceSecret
};

      const res = await axiosInstance.put(`devices/${id}`, payload);

      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Device Updated!',
          text: 'The device was successfully updated.',
        });
        navigate('/devices');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Update failed',
          text: 'Could not update device.',
        });
      }
    } catch (err) {
      console.error('Update error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.error || 'An unexpected error occurred.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <MainAppSpinner />
      </div>
    );
  }

  if (!device) {
    return <div style={{ padding: '20px' }}>Error: {error}</div>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '30px' }}>


   <BackButton to="/devices" label="Back to Devices" />










      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Update Device</h2>
      <form onSubmit={handleSubmit} className="ivu-form">
        <label>Provider</label>
        <select
          className="ivu-input"
          value={deviceBrand}
          onChange={(e) => {
            setDeviceBrand(e.target.value);
            setDeviceModel('');
          }}
          required
        >
          <option value="">Select Provider</option>
          {Object.keys(modelsByProvider).map((prov) => (
            <option key={prov} value={prov}>{prov}</option>
          ))}
        </select>

        {deviceBrand && (
          <>
            <label>Model</label>
            <select
              className="ivu-input"
              value={deviceModel}
              onChange={(e) => setDeviceModel(e.target.value)}
              required
            >
              <option value="">Select Model</option>
              {modelsByProvider[deviceBrand]?.map((mod) => (
                <option key={mod} value={mod}>{mod}</option>
              ))}
            </select>
          </>
        )}

        <label>Serial Number</label>
        <input
          className="ivu-input"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          required
        />

        <label>Status</label>
        <select
          className="ivu-input"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">Select Status</option>

 
                    <option value="UNREGISTERED">Unregistered</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="BLOCKED">BLOCKED</option>
                    <option value="EXPIRED">EXPIRED</option>
                    <option value="LOCKED">LOCKED</option>






          <option value="ACTIVE">Active</option>
          <option value="UNREGISTERED">Unregistered</option>
          <option value="BLOCKED">Blocked</option>
        </select>

        <label>Device Secret</label>
        <input
          className="ivu-input"
          value={deviceSecret}
          onChange={(e) => setDeviceSecret(e.target.value)}
          required
        />

        <button type="submit" className="ivu-button ivu-button-primary" style={{ marginTop: '20px' }}>
          Update Device
        </button>
      </form>
    </div>
  );
}

export default DeviceUpdatePage;
