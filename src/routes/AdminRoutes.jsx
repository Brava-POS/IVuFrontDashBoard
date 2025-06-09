//src/routes/AdminRoutes.jsx

import BillingPage from "../pages/BillingPage";
import InformativeFiles from "../pages/InformativeFiles";
import CreateTransactionPage from "../pages/CreateTransactionPage";
import UpdateTransactionPage from "../pages/UpdateTransactionPage";
import SettingsPage from "../pages/SettingsPage";
import MerchantsPage from "../pages/MerchantsPage";
import MerchantCreatePage from "../pages/MerchantCreatePage";
import MerchantEditPage from "../pages/MerchantEditPage";
import MerchantViewPage from "../pages/MerchantViewPage";
import MerchantSubscribtionsPage from "../pages/MerchantSubscribtionsPage";
import UsersPage from "../pages/UsersPage";

import UsersViewPage from "../pages/UsersViewPage";
import UsersCreatePage from "../pages/UsersCreatePage";
import UserUpdatePage from "../pages/UserUpdatePage";
import MerchantSubscribtionsViewPage from "../pages/MerchantSubscribtionsViewPage";
import MerchantSubscribtionsCreatePage from "../pages/MerchantSubscribtionsCreatePage";
import MerchantSubscribtionsUpdatePage from "../pages/MerchantSubscribtionsUpdatePage";
import ElavonPaymentView from "../pages/ElavonPaymentView";
import LeadsPage from "../pages/LeadsPage";
import AdminsPage from "../pages/AdminsPage";
import InformativeFile from "../pages/InformativeFile";

const AdminRoutes = [
  { path: "informativefile", element: <InformativeFiles /> },
  { path: "create-transaction-page", element: <CreateTransactionPage /> },
  { path: "update-transaction-page/:id", element: <UpdateTransactionPage /> },
  { path: "merchants", element: <MerchantsPage /> },
  { path: "settings", element: <SettingsPage /> },

  // Merchants

  { path: "merchants", element: <MerchantsPage /> },
  { path: "merhantcreate", element: <MerchantCreatePage /> },
  { path: "merhantview/:id", element: <MerchantViewPage /> },
  { path: "merhantupdate/:id", element: <MerchantEditPage /> },

  // AppUsers

  { path: "leads", element: <LeadsPage /> },
  { path: "admins", element: <AdminsPage /> },
  // { path: "users", element: <UsersPage /> },
  { path: "users-view/:id", element: <UsersViewPage /> },
  { path: "users-create", element: <UsersCreatePage /> },
  { path: "users-update/:id", element: <UserUpdatePage /> },

  // Subscriptions

  { path: "subscriptions", element: <MerchantSubscribtionsPage /> },
  {
    path: "subscriptions-view/:id",
    element: <MerchantSubscribtionsViewPage />,
  },
  {
    path: "subscriptionss-create",
    element: <MerchantSubscribtionsCreatePage />,
  },
  {
    path: "subscriptions-update/:id",
    element: <MerchantSubscribtionsUpdatePage />,
  },

  { path: "elavon-payment-view/:id", element: <ElavonPaymentView /> },


 // InformativeFilesd

  { path: "informativefiles", element: <InformativeFile /> },















];

export default AdminRoutes;
