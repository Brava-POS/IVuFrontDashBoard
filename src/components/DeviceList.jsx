import React, { useState } from 'react';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineCopy,
  AiOutlineCheck,
  AiOutlineDelete,
} from 'react-icons/ai';
import { FiTablet } from 'react-icons/fi';
import Swal from 'sweetalert2';
import cloverlogo from '../assets/images/cloverlogo.png';
import elavonlogo from '../assets/images/elavonLogo.png';
import paxlogo from '../assets/images/paxlogo.jpeg';

import cloverKisok from '../assets/images/Clover-Kiosk-1.jpg';
import cloverStationDuo from '../assets/images/Clover-Station-Duo.png';
import cloverStationSolo from '../assets/images/clover-station-solo.png';
import cloverMini from '../assets/images/clovermini.png';
import cloverFlex from '../assets/images/cloverflex.png';
import cloverFlexPocket from '../assets/images/cloverpocket.png';
import cloverStaCompact from '../assets/images/clovercompact.png';

const deviceImages = {
  'Station Duo': cloverStationDuo,
  'Station Solo': cloverStationSolo,
  'Kiosk': cloverKisok,
  'Mini': cloverMini,
  'FLEX': cloverFlex,
  'FLEX Pocket': cloverFlexPocket,
  'Compact': cloverStaCompact,
  'Clover Kiosk': cloverKisok,
  'Clover Flex': cloverFlex,
  'Clover Mini': cloverMini,
  'Clover Compact': cloverStaCompact,
  'Clover Station Solo': cloverStationSolo,
  'Clover Station Duo': cloverStationDuo,
};

const getDeviceImage = (device) => {
  const model = device.deviceModal?.trim();
  const provider = device.deviceProvider?.toLowerCase();

  if (provider === 'elavon') return elavonlogo;
  if (provider === 'pax') return paxlogo;

  return deviceImages[model] || null;
};

function DeviceList({ devices, onRemove }) {
  const [visibleSecrets, setVisibleSecrets] = useState({});
  const [copiedIds, setCopiedIds] = useState({});

  const toggleSecret = (id) => {
    setVisibleSecrets((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (id, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIds((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedIds((prev) => ({ ...prev, [id]: false }));
      }, 1500);
    });
  };

const confirmRemove = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This will remove the device permanently.',
    icon: 'warning',
    background: '#ffffff', // clean white background
    color: '#1a1a1a',       // almost black text
    iconColor: '#E62B1E',   // TED red for the warning icon
    showCancelButton: true,
    confirmButtonText: 'Yes, remove it!',
    cancelButtonText: 'Cancel',

    confirmButtonColor: '#E62B1E',   // TED red
    cancelButtonColor: '#AAAAAA',    // neutral gray

    customClass: {
      popup: 'ted-alert',
      confirmButton: 'ted-confirm-btn',
      cancelButton: 'ted-cancel-btn',
    }
  }).then((result) => {
    if (result.isConfirmed) {
      onRemove(id); // console logs or delete API call
    }
  });
};


  return (
    <div className="devicelist-container">
      {devices.map((device) => {
        const imgSrc = getDeviceImage(device);
        const isSecretVisible = visibleSecrets[device.id];
        const isCopied = copiedIds[device.id];

        return (
          <div key={device.id} className="devicelist-card">
            {imgSrc ? (
              <img src={imgSrc} alt={device.deviceModal} className="devicelist-image" />
            ) : (
              <FiTablet className="devicelist-image" style={{ fontSize: '64px', color: '#888' }} />
            )}

            <div className="devicelist-info">
              <h3><strong>Provider :</strong> {device.deviceProvider}</h3>
              
              <p><strong>Model:</strong> {device.deviceModal}</p>
              <p><strong>Status:</strong> {device.status}</p>
              <p><strong>Registered At:</strong> {new Date(device.registeredAt).toLocaleString()}</p>

               <h3><strong></strong> Credentials</h3>
               <p  style={{ marginTop: '20px' }} ><strong>Serial Number:</strong> {device.serialNumber}</p>
              <div className="devicelist-secret-wrapper" style={{ gap: '6px' }}>
                <strong>Device Secret:</strong>
                <span
                  className="devicelist-secret-text"
                  onClick={() => toggleSecret(device.id)}
                  style={{ marginLeft: 6, cursor: 'pointer' }}
                >
                  {isSecretVisible ? device.deviceSecret : '••••••••••••••'}
                </span>

                <span onClick={() => toggleSecret(device.id)} style={{ cursor: 'pointer' }}>
                  {isSecretVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>

                <span
                  className={`devicelist-icon ${isCopied ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(device.id, device.deviceSecret)}
                  style={{ cursor: 'pointer' }}
                >
                  {isCopied ? <AiOutlineCheck color="green" /> : <AiOutlineCopy />}
                </span>

                <span
                  title="Remove Device"
                  onClick={() => confirmRemove(device.id)}
                  style={{ cursor: 'pointer', color: 'red', marginLeft: 'auto' }}
                >
                  <AiOutlineDelete size={20} />
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DeviceList;
