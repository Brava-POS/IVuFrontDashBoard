import SubscrptionToIvuControl from '../components/SubscrptionToIvuControl';
import PayWithConverge from '../pages/PayWithConverge';

const GuestRoutes = [
  { path: 'nonbravaclients', element: <SubscrptionToIvuControl /> },

 { path: 'paywithconverge', element: <PayWithConverge /> },
  
];

export default GuestRoutes;
