// utils/deviceImages.js
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

export const providerLogos = {
  clover: cloverlogo,
  elavon: elavonlogo,
  pax: paxlogo,
};

export const deviceImages = {
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

export const getDeviceImage = (device) => {
  const model = device.deviceModal?.trim();
  const provider = device.deviceProvider?.toLowerCase();

  if (provider === 'elavon') return elavonlogo;
  if (provider === 'pax') return paxlogo;

  return deviceImages[model] || null;
};

export const getProviderLogo = (provider) => {
  if (!provider) return null;
  return providerLogos[provider.toLowerCase()] || null;
};
