import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import MainAppSpinner from '../components/MainAppSpinner';
import AppUserSelector from '../components/AppUserSelector';
import BackButton from '../components/BackButton';
import ButtonCustomizedAction from '../components/ButtonCustomizedAction';


const MerchantCreatePage = () => {
  const navigate = useNavigate();
  const { axiosInstance } = useAuth();

  const [loading, setLoading] = useState(false);
  const [appUser, setAppUser] = useState(null);
  const [formData, setFormData] = useState({
   merchantNumber:"134567888",
    merchantTaxId: 12344444,
    appUserId: null
  });
const handleSelectMerchant = (user) => {
  console.log("user", user);

  setAppUser(user);

  setFormData(prev => ({
    ...prev,
    appUserId: user ? user.id : null 
  }));
};

  const handleSubmit = async () => {
    if (!appUser) {
      Swal.fire('Validation', 'Selecting a user is required', 'warning');
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.post('/merchants', formData);
      const msg = res.data?.message || 'Merchant created';

      await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: msg
      });

      setAppUser(null);
      setFormData({
          merchantNumber:"134566888",
    merchantTaxId: 1234444,
    appUserId: null
      });

    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to create merchant';
      Swal.fire('Error', msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <MainAppSpinner />;

  return (
    <>
      <div className="merchant-title">Create New Merchant</div>
      <BackButton to="/merchants" label="Back to Merchants" />
      <AppUserSelector onSelect={handleSelectMerchant} />


 <div className="createdr-section-title-start"></div>
 

      <div className="createdr-section">
      
          
        

        {appUser ? (
          <div >
            <img
              src={appUser.avatarUrl}
              alt="Avatar"
              className="merchant-avatar"
            />
            <div className="createdr-section-title-start">
           <div><strong>ID:</strong> {appUser.id}</div>
          <div><strong>Username:</strong> {appUser.username}</div>
          <div><strong>Email:</strong> {appUser.email}</div>
          <div><strong>Status:</strong> {appUser.active ? 'Active' : 'Inactive'}</div>
          <div><strong>Deleted:</strong> {appUser.deleted ? 'Yes' : 'No'}</div>
          <div><strong>Blocked:</strong> {appUser.blocked ? 'Yes' : 'No'}</div>
          <div><strong>Account Expired:</strong> {appUser.accountExpired ? 'Expired' : 'Not Expired'}</div>
          <div><strong>Credentials Expired:</strong> {appUser.credentialsExpired ? 'Expired' : 'Not Expired'}</div>
          <div><strong>Account Locked:</strong> {appUser.accountLocked ? 'Yes' : 'No'}</div>
          <div><strong>Notifications Enabled:</strong> {appUser.notificationsEnabled ? 'Yes' : 'No'}</div>
          <div><strong>First Name:</strong> {appUser.firstName}</div>
          <div><strong>Middle Name:</strong> {appUser.middleName || '—'}</div>
          <div><strong>Last Name:</strong> {appUser.lastName}</div>
          <div><strong>Second Last Name:</strong> {appUser.secondLastName || '—'}</div>
          <div><strong>Phone:</strong> {appUser.phone}</div>
          <div><strong>Address:</strong> {appUser.address}</div>
          <div><strong>City:</strong> {appUser.city}</div>
          <div><strong>State:</strong> {appUser.state}</div>
          <div><strong>ZIP:</strong> {appUser.zip}</div>
          <div><strong>Country:</strong> {appUser.country}</div>
          <div><strong>Language:</strong> {appUser.language || '—'}</div>
          <div><strong>Timezone:</strong> {appUser.timezone || '—'}</div>
          <div><strong>Created At:</strong> {new Date(appUser.createdAt).toLocaleString()}</div>
          <div><strong>Updated At:</strong> {appUser.updatedAt ? new Date(appUser.updatedAt).toLocaleString() : '—'}</div>
          <div><strong>Created By IP:</strong> {appUser.createdByIp || '—'}</div>
          <div><strong>Last Login At:</strong> {appUser.lastLoginAt ? new Date(appUser.lastLoginAt).toLocaleString() : '—'}</div>
          <div><strong>Last Login IP:</strong> {appUser.lastLoginIp || '—'}</div>
        

            </div>
          </div>
        ) : (
          <div className="createdr-section-title">No App User Selected</div>
        )}
      </div>

      {appUser && (
        <div className="merchant-section merchant-submit">
          <ButtonCustomizedAction
            action="create"
         label={`Convert user ${appUser?.username ?? '[No User Selected]'} from Guest to Merchant`}
            onClick={handleSubmit}
          />
        </div>
      )}
    </>
  );
};

export default MerchantCreatePage;
