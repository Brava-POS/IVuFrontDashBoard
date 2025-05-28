import React from 'react';
import Login from '../components/Login';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/brava.png';
import { useAuth } from '../context/AuthContext';
import MerchantListPageView from './MerchantListPageView';

function Merchants() {
  const handleSelect = (merchant) => {
    console.log('Selected merchant:', merchant);
    // Do something on merchant select if needed
  };

  return <MerchantListPageView onSelect={handleSelect} />;
}

export default Merchants;
