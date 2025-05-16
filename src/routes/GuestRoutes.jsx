import SubscrptionToIvuControl from '../components/SubscrptionToIvuControl';
import EditProfile from '../pages/EditProfile';

const GuestRoutes = [
   { path: 'profile', element: <EditProfile /> },
  { path: 'nonbravaclients', element: <SubscrptionToIvuControl /> },
];

export default GuestRoutes;
