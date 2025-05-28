// src/pages/DefaultLanding.jsx
import { useAuth } from '../context/AuthContext';
import SubscrptionToIvuControl from '../components/SubscrptionToIvuControl';
import HomePage from './HomePage';
import PayWithConverge from './PayWithConverge';

const DefaultLanding = () => {
  const { user } = useAuth();
  const role = user?.role?.replace('ROLE_', '').toLowerCase();

  if (role === 'guest') {
    return <PayWithConverge />;
  }

  return <HomePage />;
};

export default DefaultLanding;
