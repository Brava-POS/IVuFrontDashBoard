import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import TableComponent from "../components/TableComponent";

import { useAuth } from '../context/AuthContext';
import MainAppSpinner from '../components/MainAppSpinner';
import { showAlert } from '../components/SweetAlertComponent';
import BackButton from '../components/BackButton';
import RedTitle from '../components/RedTitle';
import Input from '../components/Input ';
import EditButton from '../components/EditButton';
import CreateButton from '../components/CreateButton';
import CustomizedButton from '../components/CustomizedButton';
import AdditionalAmountModal from '../components/AdditionalAmountModal';
import UpdateAdditionalAmountModal from '../components/UpdateAdditionalAmountModal';
import ButtonCustomizedAction from '../components/ButtonCustomizedAction';
import AppFlexBox from '../components/AppFlexBox';
import MainFilterInput from '../components/MainFilterInput';

const UpdateMerchantPage = () => {
  const { id } = useParams();
  const { axiosInstance } = useAuth();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false); // NEW

  const [form, setForm] = useState({
    merchantSerialCode: '',
    isActive: true,
    isBlocked: false,
    isDeleted: false,
  });

  useEffect(() => {
    const fetchMerchant = async () => {
      try {
        const { data } = await axiosInstance.get(`/merchants/${id}`);
        setForm({
          merchantSerialCode: data.merchantSerialCode || '',
          isActive: data.active || false,
          isBlocked: data.blocked || false,
          isDeleted: data.deleted || false,
        });
      } catch (err) {
        showAlert('error', 'Failed to load merchant data');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMerchant();
  }, [id, axiosInstance]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    setUpdating(true); 
    try {
      const payload = {
        merchantSerialCode: form.merchantSerialCode,
        isActive: form.isActive,
        isBlocked: form.isBlocked,
        isDeleted: form.isDeleted,
      };

      const res = await axiosInstance.put(`/merchants/${id}`, payload);

      if (res.data?.message === 'Merchant updated successfully') {
        showAlert('success', 'Merchant updated successfully');
      } else {
        showAlert('error', 'Update failed');
      }
    } catch (err) {
      showAlert('error', err?.response?.data?.message || 'Update failed');
    } finally {
      setUpdating(false); // NEW
    }
  };

  if (loading || updating) return <MainAppSpinner />; 

  return (



  <>
 
  <div className="createdr-section-title-large"> {`Update User  with serial number  ${form.merchantSerialCode}`}</div>
     <BackButton to="/merchants" label="Back to Merchants" />
     
      <div className="createdr-section">


      <div className="createdr-container">

        <Input
        label="Merchant Serial Code"
        name="merchantSerialCode"
        value={form.merchantSerialCode}
       
      /> 



         <AppFlexBox justify="in">

          <label>
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          /> Active
        </label>
        <label>
          <input
            type="checkbox"
            name="isBlocked"
            checked={form.isBlocked}
            onChange={handleChange}
          /> Blocked
        </label>
        <label>
          <input
            type="checkbox"
            name="isDeleted"
            checked={form.isDeleted}
            onChange={handleChange}
          /> Deleted
        </label>

</AppFlexBox>


      </div>



      </div>
    



     

     




 <ButtonCustomizedAction action="edit" label="Update" onClick={handleSubmit} />




</>

  );
};

 export default UpdateMerchantPage;

