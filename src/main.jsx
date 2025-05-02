import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './index.css';
import TaxesPage from './pages/TaxesPage';
import TransactionsPage from './pages/TransactionsPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';

import BillingPage from './pages/BillingPage';
import ChangePassword from './pages/ChangePassword';
import EditProfile from './pages/EditProfile';

import CreateTransactionPage from './pages/CreateTransactionPage';
import ViewTransactionPage from './pages/ViewTransactionPage';
import UpdateTransactionPage from './pages/UpdateTransactionPage';






import { AuthProvider } from './context/AuthContext.jsx';
import InformativeFiles from './pages/InformativeFiles.jsx';
import Merchants from './pages/Merchants.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Dashboard />}>
         
            <Route index element={<HomePage/>} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="taxes" element={<TaxesPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="editprofile" element={<EditProfile />} />
            <Route path="changepassword" element={<ChangePassword/>} />
            <Route path="informativefile" element={<InformativeFiles/>} />
            <Route path="merchants" element={<Merchants/>} />



            <Route path="create-transaction-page" element={<CreateTransactionPage/>} />
            <Route path="view-transaction-page/:id" element={<ViewTransactionPage/>} />
            <Route path="update-transaction-page/:id" element={<UpdateTransactionPage/>} />



          



          </Route>

          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  </React.StrictMode>
);