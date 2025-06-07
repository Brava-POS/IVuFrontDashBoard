import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainAppSpinner from './MainAppSpinner';
import { MdEdit } from 'react-icons/md';
import placeHolder from '../assets/images/placeHolder.png';
import RedTitle from '../components/RedTitle';
import ButtonCustomizedAction from '../components/ButtonCustomizedAction';

function Profile() {
  const { axiosInstance } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/app-users/self');

        console.log("eeee",response.data)



        setUserData(response.data);
      } catch (err) {
        console.error('Failed to load user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <MainAppSpinner />;
  if (!userData) return <div style={{ color: 'red', textAlign: 'center' }}>Failed to load profile.</div>;

  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#fff',
    border: '1px solid #ff4d4f',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(255, 77, 79, 0.1)',
    fontFamily: 'Segoe UI, sans-serif'
  };

  const avatarCardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2rem 0'
  };

  const avatarImageStyle = {
    width: '140px',
    height: '140px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #ff4d4f'
  };

  const sectionStyle = {
    marginTop: '2rem'
  };

  const sectionTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#ff4d4f',
    borderBottom: '1px solid #ff4d4f',
    paddingBottom: '0.25rem',
    marginBottom: '1rem'
  };

  const fieldStyle = {
    marginBottom: '1.5rem'
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    display: 'block',
    color: '#d32f2f'
  };

  const valueStyle = {
    backgroundColor: '#fffafa',
    borderRadius: '8px',
    padding: '1rem',
    color: '#333',
    boxShadow: '0 1px 3px rgba(255, 77, 79, 0.1)',
    width: '100%'
  };

  const flagValueStyle = {
    ...valueStyle,
    fontWeight: '600',
    color: '#d32f2f'
  };


  const labelMap = {
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
  language: 'Language',
  timezone: 'Timezone',
  
};

const getLabel = (field) =>
  labelMap[field] ||
  field
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
  return (
    <div style={containerStyle}>
      <RedTitle title={`Profile: ${userData.username}`} />

      <ButtonCustomizedAction
        onClick={() => navigate('/editprofile')}
        label="Edit Profile"
        action="edit"
        icon={<MdEdit />}
      />

      <div style={avatarCardStyle}>
        <img
          src={userData.avatarUrl || placeHolder}
          onError={(e) => (e.target.src = placeHolder)}
          alt="Avatar"
          style={avatarImageStyle}
        />
      </div>

      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>User Details</div>

        {[
          "email", "username", "firstName", "middleName", "lastName",
          "secondLastName", "phone", "address", "city", "state", "zip",
          "country", "language", "timezone"
        ].map((field) => (
          <div key={field} style={fieldStyle}>
          <label style={labelStyle}>{getLabel(field)}</label>
            <div style={valueStyle}>{userData[field] || <em>Not set</em>}</div>
          </div>
        ))}


     
       
      </div>



    </div>
  );
}

export default Profile;
