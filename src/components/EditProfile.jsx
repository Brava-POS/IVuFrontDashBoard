import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
import MainAppSpinner from './MainAppSpinner';
import Input from '../components/Input ';
import RedTitle from '../components/RedTitle';
import ButtonCustomizedAction from '../components/ButtonCustomizedAction';
import placeHolder from '../assets/images/placeHolder.png';
import { MdClose } from 'react-icons/md';
import { showAlert } from '../components/SweetAlertComponent';

function EditProfile() {
  const { axiosInstance } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [avatar, setAvatar] = useState(null);

  const [userData, setUserData] = useState({
   username : '',
    email: '',
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
  });

  const fieldLabels = {
  email: 'Email',
  username: 'Username',
  firstName: 'First Name',
  middleName: 'Middle Name',
  lastName: 'Last Name',
  secondLastName: 'Second Last Name',
  phone: 'Phone',
  address: 'Address',
  city: 'City',
  state: 'State',
  zip: 'ZIP Code',
  country: 'Country',
};

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('/app-users/self');

        console.log("data from editprofiel",res.data)
        const normalizedData = Object.fromEntries(
          Object.entries(res.data).map(([key, val]) => [key, val ?? ''])
        );
        setUserData(normalizedData);
        if (res.data.avatarUrl) setAvatar(res.data.avatarUrl);
      } catch (err) {
        showAlert('error', 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(userData.email.trim())) {
      newErrors.email = 'Invalid email';
    }
    if (!userData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (userData.phone && !/^\d+$/.test(userData.phone.trim())) {
      newErrors.phone = 'Phone must be numeric';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      let avatarBase64 = null;

      if (avatar instanceof File) {
        avatarBase64 = await fileToBase64(avatar);
      } else if (avatar === null) {
        avatarBase64 = '';
      }

      const payload = { ...userData, avatar: avatarBase64 };

      await axiosInstance.put('/app-users/self', payload);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Profile updated successfully!',
        confirmButtonColor: '#b30000',
      }).then(() => navigate('/profile'));
    } catch (err) {
      Swal.fire('Update failed', err?.response?.data?.message || '', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <MainAppSpinner />;

  return (
    <>
      {submitting && (
        <div className="overlay-spinner">
          <MainAppSpinner />
        </div>
      )}
      <div className="createdr-container">
        <RedTitle title="Edit Profile" />
        <ButtonCustomizedAction label="Back" action="back" onClick={() => navigate(-1)} />
        {/* Avatar Preview & Upload */}
        <div className="avatar-preview-card">
          <div className="avatar-preview-wrapper">
            {avatar && (
              <span className="avatar-remove-icon" onClick={() => setAvatar(null)}>
                <MdClose />
              </span>
            )}
            <img
              src={
                avatar
                  ? avatar instanceof File
                    ? URL.createObjectURL(avatar)
                    : avatar
                  : placeHolder
              }
              onError={(e) => (e.target.src = placeHolder)}
              alt="Avatar"
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
        {/* Form Fields */}
        <div className="createdr-section">
          <div className="createdr-section-title">Your Information</div>
          {[
            'email', 'username','firstName', 'middleName', 'lastName', 'secondLastName',
            'phone', 'address', 'city', 'state', 'zip', 'country'
          ].map((field) => (
            <Input
              key={field}
               label={fieldLabels[field]}
              name={field}
              value={userData[field] || ''}
              onChange={handleChange}
              error={errors[field]}
            />
          ))}

          {/* Language select */}
          <div className="createdr-section-title-start">
            <label>
              Language
              <select
                name="language"
                value={userData.language || ''}
                onChange={handleChange}
                className="stepper-input"
              >
                <option value="">Select Language</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
              </select>
            </label>
          </div>

          <ButtonCustomizedAction label="Save Changes" action="edit" onClick={handleSubmit} />
        </div>
      </div>
    </>
  );
}

export default EditProfile;



























// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import Swal from 'sweetalert2';
// import MainAppSpinner from './MainAppSpinner';


// function EditProfile() {
//   const { axiosInstance } = useAuth();
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axiosInstance.get('/app-users/self');
//         setUserData(response.data);
//       } catch (err) {
//         console.error('Failed to load user profile:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       await axiosInstance.put('/app-users/self', userData);
//       Swal.fire({
//         title: '',
//         html: `
//           <div style="display: flex; flex-direction: column; align-items: center;">
//             <div style="
//               width: 80px;
//               height: 80px;
//               border-radius: 50%;
//               background-color: #f8d7da;
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               margin-bottom: 15px;
//             ">
//               <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#b30000" viewBox="0 0 16 16">
//                 <path d="M16 2L6 12l-4-4" stroke="#b30000" strokeWidth="2" fill="none" />
//               </svg>
//             </div>
//             <p style="margin: 0; color: #b30000;">User updated successfully</p>
//           </div>
//         `,
//         showConfirmButton: true,
//         confirmButtonColor: '#b30000',
//         confirmButtonText: 'OK',
//       }).then(() => navigate('/profile'));
//     } catch (err) {
//       console.error('Failed to update profile:', err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading || !userData) return <MainAppSpinner />;

//   return (
//     <>
//       {submitting && (
//         <div style={{
//           position: 'fixed',
//           top: 0, left: 0, right: 0, bottom: 0,
//           backgroundColor: 'rgba(255, 255, 255, 0.7)',
//           zIndex: 9999,
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center'
//         }}>
//           <MainAppSpinner />
//         </div>
//       )}

  
//       <div className="edit-profile-container">
//         <div className="profile_v2-wrapper">
//           <div className="profile_v2-card" style={{ borderColor: 'darkred' }}>
//             <h2 style={{ color: 'darkred', marginBottom: '1rem' }}>Edit Profile</h2>
//             <form onSubmit={handleSubmit} className="profile_v2-form" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//               {[
//                 "email", "firstName", "middleName", "lastName", "secondLastName",
//                 "phone", "address", "city", "state", "zip", "country"
//               ].map((field) => (
//                 <input
//                   key={field}
//                   name={field}
//                   value={userData[field] || ''}
//                   onChange={handleChange}
//                   placeholder={field}
//                   className="profile_v2-input"
//                   style={{
//                     padding: '10px',
//                     border: '1px solid red',
//                     borderRadius: '5px',
//                     color: '#800000'
//                   }}
//                 />
//               ))}



// <select
//   name="language"
//   value={userData.language || ''}
//   onChange={handleChange}
//   className="profile_v2-input"
//   style={{
//     padding: '10px',

//     border: '1px solid #b30000', 
//     borderRadius: '5px',
//     color: '#800000', 
//     outline: 'none',
//     boxShadow: 'none',
//     WebkitAppearance: 'none', 
//     MozAppearance: 'none',    
//     appearance: 'none',
//   }}
// >
//   <option value="">Select Language</option>
//   <option value="en">English</option>
//   <option value="es">Spanish</option>
// </select>





  








//               <button
//                 type="submit"
//                 className="profile_v2-edit-button"
//                 style={{
//                   backgroundColor: 'darkred',
//                   color: 'white',
//                   padding: '10px 20px',
//                   border: 'none',
//                   borderRadius: '5px',
//                   cursor: 'pointer',
//                   alignSelf: 'flex-start'
//                 }}
//               >
//                 Save
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default EditProfile;



