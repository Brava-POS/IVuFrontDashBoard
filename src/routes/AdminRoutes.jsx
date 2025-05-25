
import BillingPage from '../pages/BillingPage';
import InformativeFiles from '../pages/InformativeFiles';
import CreateTransactionPage from '../pages/CreateTransactionPage';
import UpdateTransactionPage from '../pages/UpdateTransactionPage';
import Merchants from '../pages/Merchants';
import SettingsPage from '../pages/SettingsPage';


const AdminRoutes = [

   { path: 'informativefile', element: <InformativeFiles /> },
   { path: 'create-transaction-page', element: <CreateTransactionPage /> },
   { path: 'update-transaction-page/:id', element: <UpdateTransactionPage /> },
     { path: 'merchants', element: <Merchants /> },
       { path: 'settings', element: <SettingsPage /> },

];

export default AdminRoutes;
