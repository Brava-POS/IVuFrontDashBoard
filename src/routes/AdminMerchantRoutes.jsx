import TransactionsPage from '../pages/TransactionsPage';
import TaxesPage from '../pages/TaxesPage';
import EditProfile from '../pages/EditProfile';
import ChangePassword from '../pages/ChangePassword';
import ViewTransactionPage from '../pages/ViewTransactionPage';
import Device from '../pages/Device';




const AdminMerchantRoutes = [

  { path: 'transactions', element: <TransactionsPage /> },
  { path: 'taxes', element: <TaxesPage /> },
  { path: 'profile', element: <EditProfile /> },
  { path: 'changepassword', element: <ChangePassword /> },
  { path: 'view-transaction-page/:id', element: <ViewTransactionPage /> },
    { path: 'devices', element: <Device /> },

];

export default AdminMerchantRoutes;
