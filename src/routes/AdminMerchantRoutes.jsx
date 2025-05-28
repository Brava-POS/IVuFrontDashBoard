import TransactionsPage from '../pages/TransactionsPage';
import TaxesPage from '../pages/TaxesPage';
import ChangePassword from '../pages/ChangePassword';
import ViewTransactionPage from '../pages/ViewTransactionPage';
import Device from '../pages/Device';
import AccountPage from '../pages/AccountPage';
import ProfilePage from '../pages/ProfilePage';
import EditProfilePage from '../pages/EditProfilePage';
import EditProfilePassword from '../pages/EditProfilePassword';
import BillingPage from '../pages/BillingPage';
import CreateTransactionPage from '../pages/CreateTransactionPage';
import UpdateTransactionPage from '../pages/UpdateTransactionPage';






const AdminMerchantRoutes = [

     { path: 'billing', element: <BillingPage /> },
  { path: 'transactions', element: <TransactionsPage /> },
  { path: 'taxes', element: <TaxesPage /> },
  { path: 'account', element: <AccountPage /> },
  { path: 'changepassword', element: <ChangePassword /> },
  { path: 'view-transaction-page/:id', element: <ViewTransactionPage /> },
  { path: 'create-transaction-page', element: <CreateTransactionPage /> },
    { path: 'edit-transaction-page/:id', element: < UpdateTransactionPage /> },



  { path: 'devices', element: <Device /> },
  { path: 'profile', element: <ProfilePage /> },
   { path: 'editprofile', element: <EditProfilePage/> },
      { path: 'changeprofilepassword', element: <EditProfilePassword/> },













];

export default AdminMerchantRoutes;
