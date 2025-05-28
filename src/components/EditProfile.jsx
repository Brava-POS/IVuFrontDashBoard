import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import MainAppSpinner from './MainAppSpinner';


function EditProfile() {
  const { axiosInstance } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/app-users/self');
        setUserData(response.data);
      } catch (err) {
        console.error('Failed to load user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axiosInstance.put('/app-users/self', userData);
      Swal.fire({
        title: '',
        html: `
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="
              width: 80px;
              height: 80px;
              border-radius: 50%;
              background-color: #f8d7da;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 15px;
            ">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#b30000" viewBox="0 0 16 16">
                <path d="M16 2L6 12l-4-4" stroke="#b30000" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <p style="margin: 0; color: #b30000;">User updated successfully</p>
          </div>
        `,
        showConfirmButton: true,
        confirmButtonColor: '#b30000',
        confirmButtonText: 'OK',
      }).then(() => navigate('/profile'));
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !userData) return <MainAppSpinner />;

  return (
    <>
      {submitting && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <MainAppSpinner />
        </div>
      )}

  
      <div className="edit-profile-container">
        <div className="profile_v2-wrapper">
          <div className="profile_v2-card" style={{ borderColor: 'darkred' }}>
            <h2 style={{ color: 'darkred', marginBottom: '1rem' }}>Edit Profile</h2>
            <form onSubmit={handleSubmit} className="profile_v2-form" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                "email", "firstName", "middleName", "lastName", "secondLastName",
                "phone", "address", "city", "state", "zip", "country"
              ].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={userData[field] || ''}
                  onChange={handleChange}
                  placeholder={field}
                  className="profile_v2-input"
                  style={{
                    padding: '10px',
                    border: '1px solid red',
                    borderRadius: '5px',
                    color: '#800000'
                  }}
                />
              ))}



<select
  name="language"
  value={userData.language || ''}
  onChange={handleChange}
  className="profile_v2-input"
  style={{
    padding: '10px',

    border: '1px solid #b30000', 
    borderRadius: '5px',
    color: '#800000', 
    outline: 'none',
    boxShadow: 'none',
    WebkitAppearance: 'none', 
    MozAppearance: 'none',    
    appearance: 'none',
  }}
>
  <option value="">Select Language</option>
  <option value="en">English</option>
  <option value="es">Spanish</option>
</select>





  








              <button
                type="submit"
                className="profile_v2-edit-button"
                style={{
                  backgroundColor: 'darkred',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  alignSelf: 'flex-start'
                }}
              >
                Save
              </button>
            </form>
          </div>
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
//     Swal.fire({
//   title: '',
//   html: `
//     <div style="display: flex; flex-direction: column; align-items: center;">
//       <div style="
//         width: 80px;
//         height: 80px;
//         border-radius: 50%;
//         background-color: #f8d7da;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         margin-bottom: 15px;
//       ">
//         <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#b30000" viewBox="0 0 16 16">
//           <path d="M16 2L6 12l-4-4" stroke="#b30000" strokeWidth="2" fill="none" />
//         </svg>
//       </div>
//       <p style="margin: 0; color: #b30000;">User updated successfully</p>
//     </div>
//   `,
//   showConfirmButton: true,
//   confirmButtonColor: '#b30000',
//   confirmButtonText: 'OK',
// }).then(() => navigate('/profile'));
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

//       <div className="profile_v2-wrapper">
//         <div className="profile_v2-card" style={{ borderColor: 'darkred' }}>
//           <h2 style={{ color: 'darkred', marginBottom: '1rem' }}>Edit Profile</h2>
//           <form onSubmit={handleSubmit} className="profile_v2-form" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
           

//             {[
//              "email", "firstName", "middleName", "lastName", "secondLastName",
//               "phone", "address", "city", "state", "zip", "country"
//             ].map((field) => (



//               <input
//                 key={field}
//                 name={field}
//                 value={userData[field] || ''}
//                 onChange={handleChange}
//                 placeholder={field}
//                 className="profile_v2-input"
//                 style={{
//                   padding: '10px',
//                   border: '1px solid red',
//                   borderRadius: '5px',
//                   color: '#800000'
//                 }}
//               />
//             ))}

//             <select
//               name="language"
//               value={userData.language || ''}
//               onChange={handleChange}
//               className="profile_v2-input"
//               style={{
//                 padding: '10px',
//                 border: '1px solid red',
//                 borderRadius: '5px',
//                 color: '#800000'
//               }}
//             >
//               <option value="">Select Language</option>
//               <option value="en">English</option>
//               <option value="es">Spanish</option>
//             </select>

//             <button
//               type="submit"
//               className="profile_v2-edit-button"
//               style={{
//                 backgroundColor: 'darkred',
//                 color: 'white',
//                 padding: '10px 20px',
//                 border: 'none',
//                 borderRadius: '5px',
//                 cursor: 'pointer',
//                 alignSelf: 'flex-start'
//               }}
//             >
//               Save
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default EditProfile;



                {/* {[
              "username", "email", "firstName", "middleName", "lastName", "secondLastName",
              "phone", "address", "city", "state", "zip", "country"
            ].map((field) => (

            */}