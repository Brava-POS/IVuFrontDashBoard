import SubscrptionToIvuControl from '../components/SubscrptionToIvuControl';
import EditProfile from '../pages/EditProfile';
import PaymentForm from '../pages/PaymentForm';
import PayWithConverge from '../pages/PayWithConverge';

const GuestRoutes = [
   { path: 'profile', element: <EditProfile /> },
  { path: 'nonbravaclients', element: <SubscrptionToIvuControl /> },

 { path: 'paywithconverge', element: <PayWithConverge /> },
  
];

export default GuestRoutes;
