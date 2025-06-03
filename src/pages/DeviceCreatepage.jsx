import React from 'react';
import RegisterDevice from '../components/RegisterDEvice';
import RegisterDeviceAdmin from '../components/RegisterDeviceAdmin';
import { useAuth } from '../context/AuthContext';

function DeviceCreatepage() {
  const { hasPermission } = useAuth();

  return (
    <>
      {hasPermission("Transactions", "delete") ? (
        <RegisterDeviceAdmin />
      ) : (
        <RegisterDevice />
      )}
    </>
  );
}

export default DeviceCreatepage;


