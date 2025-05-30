
import BillingPage from '../pages/BillingPage';
import InformativeFiles from '../pages/InformativeFiles';
import CreateTransactionPage from '../pages/CreateTransactionPage';
import UpdateTransactionPage from '../pages/UpdateTransactionPage';
import SettingsPage from '../pages/SettingsPage';
import MerchantsPage from '../pages/MerchantsPage';
import MerchantCreatePage from '../pages/MerchantCreatePage';
import MerchantEditPage from '../pages/MerchantEditPage';
import MerchantViewPage  from '../pages/MerchantViewPage';




const AdminRoutes = [
   { path: 'informativefile', element: <InformativeFiles /> },
   { path: 'create-transaction-page', element: <CreateTransactionPage /> },
   { path: 'update-transaction-page/:id', element: <UpdateTransactionPage /> },
   { path: 'merchants', element: <MerchantsPage /> },
   { path: 'settings', element: <SettingsPage /> },

 // Merchants      



   { path: 'merchants', element: <MerchantsPage /> },
 { path: 'merhantcreate', element: <MerchantCreatePage /> },
 { path: 'merhantview/:id', element: <MerchantViewPage /> },
{ path: 'merhantupdate/:id', element: <MerchantEditPage/> },




 // AppUsers     

//MerchantCreatePage.jsx
//MerchantEditPage.jsx
//MerchantViewPage.jsx
//  { path: 'settings', element: <SettingsPage /> },
//  { path: 'settings', element: <SettingsPage /> },
//  { path: 'settings', element: <SettingsPage /> },



  // MDevices     

//MerchantCreatePage.jsx
//MerchantEditPage.jsx
//MerchantViewPage.jsx
//  { path: 'settings', element: <SettingsPage /> },
//  { path: 'settings', element: <SettingsPage /> },
//  { path: 'settings', element: <SettingsPage /> },


 // Subscriptions      

//MerchantCreatePage.jsx
//MerchantEditPage.jsx
//MerchantViewPage.jsx
//  { path: 'settings', element: <SettingsPage /> },
//  { path: 'settings', element: <SettingsPage /> },
//  { path: 'settings', element: <SettingsPage /> },






];

export default AdminRoutes;
