import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
import MainAppSpinner from '../components/MainAppSpinner';
import { showAlert } from '../components/SweetAlertComponent';
import BackButton from '../components/BackButton';
import RedTitle from '../components/RedTitle';
import Input from '../components/Input ';
import ButtonCustomizedAction from '../components/ButtonCustomizedAction';
import { MdClose } from 'react-icons/md';
import zxcvbn from 'zxcvbn';

const UserUpdatePage = () => {
  const { axiosInstance } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

// const handlePasswordChange = async () => {
//   if (newPassword !== confirmPassword) {
//     showAlert('error', 'Passwords do not match');
//     return;
//   }

//   try {
//     setLoading(true);
//     const res = await axiosInstance.put(`/app-users/${id}`, { password: newPassword });

//     if (res.status === 200 && res.data?.message) {
//       showAlert('success', 'Password updated successfully');
//       setShowPasswordModal(false);
//       setNewPassword('');
//       setConfirmPassword('');
//     } else {
//       showAlert('error', 'Password update failed');
//     }
//   } catch (err) {
//     Swal.fire('Password update failed', err?.response?.data?.message || '', 'error');
//   } finally {
//     setLoading(false);
//   }
// };


const handlePasswordChange = async () => {
  const errors = {};

  if (!newPassword || newPassword.length < 8) {
    errors.newPassword = "Password must be at least 8 characters";
  }

  if (newPassword !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    return;
  }

  try {
    setLoading(true);
    const res = await axiosInstance.put(`/app-users/${id}`, { password: newPassword });

    if (res.status === 200 && res.data?.message) {
      showAlert('success', 'Password updated successfully');
      setShowPasswordModal(false);
      setNewPassword('');
      setConfirmPassword('');
    } else {
      showAlert('error', 'Password update failed');
    }
  } catch (err) {
    Swal.fire('Password update failed', err?.response?.data?.message || '', 'error');
  } finally {
    setLoading(false);
  }
};











  const [form, setForm] = useState({
    email: '',
    username: '',
 
    firstName: '',
    middleName: '',
    lastName: '',
    secondLastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    language: '',
    timezone: '',
    active: true,
    deleted: false,
    blocked: false,
    accountExpired: false,
    credentialsExpired: false,
    accountLocked: false,
  });
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`/app-users/${id}`);
        setForm({ ...form, ...res.data });
        if (res.data.avatarUrl) {
        setAvatar(res.data.avatarUrl);
}
        

   console.log("res data loading for upadted page ",res.data)

      } catch (err) {
        showAlert('error', 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

const validateForm = () => {
  const newErrors = {};

  if (!form.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
    newErrors.email = "Invalid email address";
  }

  if (!form.username.trim()) {
    newErrors.username = "Username is required";
  } else if (form.username.trim().length < 8) {
    newErrors.username = "Username must be at least 8 characters";
  }

  if (!form.firstName.trim()) {
    newErrors.firstName = "First name is required";
  }

  if (!form.lastName.trim()) {
    newErrors.lastName = "Last name is required";
  }

  if (!form.phone.trim()) {
    newErrors.phone = "Phone is required";
  } else if (!/^\d+$/.test(form.phone.trim())) {
    newErrors.phone = "Phone must be numeric";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};



// const handleSubmit = async () => {
//   try {
//     setLoading(true);

//     let avatarBase64 = null;

//     if (avatar instanceof File) {
//       avatarBase64 = await fileToBase64(avatar);
//     } else if (avatar === null) {
//       // Avatar was cleared, send empty string to trigger deletion
//       avatarBase64 = '';
//     }

//     const payload = {
//       ...form,
//       avatar: avatarBase64, // '' will indicate deletion
//     };

//     const res = await axiosInstance.put(`/app-users/${id}`, payload);

//     if (res.status === 200 && res.data?.message) {
//       showAlert('success', res.data.message);
//       navigate('/users');
//     } else {
//       showAlert('error', 'Update failed');
//     }
//   } catch (err) {
//     Swal.fire('Update failed', err?.response?.data?.message || '', 'error');
//   } finally {
//     setLoading(false);
//   }
// };

const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    setLoading(true);

    let avatarBase64 = null;

    if (avatar instanceof File) {
      avatarBase64 = await fileToBase64(avatar);
    } else if (avatar === null) {
      avatarBase64 = '';
    }

    const payload = {
      ...form,
      avatar: avatarBase64,
    };

    const res = await axiosInstance.put(`/app-users/${id}`, payload);

    if (res.status === 200 && res.data?.message) {
      showAlert('success', res.data.message);
      navigate('/users');
    } else {
      showAlert('error', 'Update failed');
    }
  } catch (err) {
    Swal.fire('Update failed', err?.response?.data?.message || '', 'error');
  } finally {
    setLoading(false);
  }
};










  if (loading) return <MainAppSpinner />;

  return (
    <div className="createdr-container">
      <RedTitle title={`Update User: ${form.username}`} />
      <BackButton to="/users" label="Back to Users" />







<div className="avatar-preview-card">
  <div className="avatar-preview-wrapper">
    {avatar && (
      <span className="avatar-remove-icon" onClick={() => setAvatar(null)}>
        <MdClose />
      </span>
    )}
    <img
      src={avatar instanceof File ? URL.createObjectURL(avatar) : avatar}
      alt="Avatar Preview"
      className="avatar-preview-image"
    />
  </div>

  <div className="avatar-actions">
    <label className="stepper-button" htmlFor="avatar-upload">
      Choose Image
    </label>
    <input
      id="avatar-upload"
      type="file"
      accept="image/*"
      style={{ display: 'none' }}
      onChange={(e) => setAvatar(e.target.files[0])}
    />
  </div>
</div>





  <div className="createdr-section">
   <ButtonCustomizedAction action="edit" label="Change Password" onClick={() => setShowPasswordModal(true)}/>




{showPasswordModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3>Change Password</h3>

      <input
        type="password"
        name="newPassword"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="stepper-input"
      />
      {errors.newPassword && <p className="stepper-error">{errors.newPassword}</p>}

      {/* Password strength bar */}
      {newPassword && (
        <div className="password-strength-bar" style={{ height: '6px', marginTop: '8px', backgroundColor: '#eee' }}>
          <div
            style={{
              width: ['10%', '30%', '60%', '85%', '100%'][zxcvbn(newPassword).score],
              height: '100%',
              backgroundColor: ['#f8d7da', '#f5c6cb', '#f1a1a5', '#d9534f', '#b30000'][zxcvbn(newPassword).score],
              transition: 'width 0.3s ease-in-out'
            }}
          />
        </div>
      )}

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="stepper-input"
      />
      {errors.confirmPassword && <p className="stepper-error">{errors.confirmPassword}</p>}

      <div className="modal-actions">
        <ButtonCustomizedAction
          action="edit"
          label="Submit"
          onClick={handlePasswordChange}
        />
        <ButtonCustomizedAction
          action="cancel"
          label="Cancel"
          onClick={() => setShowPasswordModal(false)}
        />
      </div>
    </div>
  </div>
)}






  </div>












      <div className="createdr-section">
        <div className="createdr-section-title">User Details</div>

        {[
          "email", "username", "password", "firstName", "middleName", "lastName",
          "secondLastName", "phone", "address", "city", "state", "zip",
          "country", "language", "timezone"
        ].map((field) => (
          <Input
            key={field}
            label={field.replace(/([A-Z])/g, ' $1')}
            name={field}
            value={form[field] || ''}
            onChange={handleChange}
            error={errors[field]}
          />
        ))}

        {[
          "active", "deleted", "blocked", "accountExpired",
          "credentialsExpired", "accountLocked"
        ].map((field) => (
          <div key={field}  className="createdr-section-title-start">
            <label >
              <input
              style={{
                 accentColor: 'red', 
                  marginRight: '8px'
      }}
                type="checkbox"
                name={field}
                checked={form[field]}
                onChange={handleChange}
              />{" "}
              {field.replace(/([A-Z])/g, ' $1')}
            </label>
          </div>
        ))}

 <ButtonCustomizedAction action="edit" label="Update User" onClick={handleSubmit} />
       
      </div>


























    </div>
  );
};

export default UserUpdatePage;
