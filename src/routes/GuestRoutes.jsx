import SubscrptionToIvuControl from '../components/SubscrptionToIvuControl';
import EditProfilePage from '../pages/EditProfilePage';
import EditProfilePassword from '../pages/EditProfilePassword';
import PayWithConverge from '../pages/PayWithConverge';
import ProfilePage from '../pages/ProfilePage';

const GuestRoutes = [


  
  // { path: 'nonbravaclients', element: <SubscrptionToIvuControl /> },

 { path: 'paywithconverge', element: <PayWithConverge /> },

   { path: 'profile', element: <ProfilePage /> },
   { path: 'editprofile', element: <EditProfilePage/> },
      { path: 'changeprofilepassword', element: <EditProfilePassword/> },
  
];

export default GuestRoutes;
