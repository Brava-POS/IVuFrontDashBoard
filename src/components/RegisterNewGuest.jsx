
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/brava.png';
import { MdClose } from 'react-icons/md';
import zxcvbn from 'zxcvbn';
import BackButton from '../components/BackButton';
import { showAlert } from '../components/SweetAlertComponent';
import  placeHolder  from '../assets/images/placeHolder.png';
import ButtonCustomizedAction from './ButtonCustomizedAction';
import Select from "react-select";


const RegisterNewGuest = () => {
  const { loading,registerByAdmin  } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [avatar, setAvatar] = useState(null);
 
  const [formData, setFormData] = useState({
    username: '',
    role: 'ROLE_GUEST',
    password: '',
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
     language:'',
      avatar:'',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) { newErrors.firstName = "First name is required";}
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
        newErrors.email = "Invalid email address";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone is required";
      } else if (!/^\d+$/.test(formData.phone.trim())) {
        newErrors.phone = "Phone must contain only numbers";
      }
    } else if (step === 2) {
      if (!formData.address.trim()) {
        newErrors.address = "Address is required";
      }
      if (!formData.city.trim()) {
        newErrors.city = "City is required";
      }
     
      if (!formData.zip.trim()) {
        newErrors.zip = "Zip code is required";
      } else if (!/^\d{5}(-\d{4})?$/.test(formData.zip.trim())) {
        newErrors.zip = "Invalid zip code format";
      }
     
    } else if (step === 3) {
      if (!formData.username.trim()) {
        newErrors.username = "Username is required";
      } else if (formData.username.trim().length < 8) {
        newErrors.username = "Username must be at least 8 characters";
      }
      if (!formData.password.trim()) {
        newErrors.password = "Password is required";
      } else if (formData.password.trim().length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password.trim() !== formData.confirmPassword.trim()) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleNext = () => {
    const validationErrors = validateStep();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setErrors({});
    setStep(prev => prev - 1);
  };
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};
  const handleSubmit = async (e) => {
    e.preventDefault();

 
    const validationErrors = {};



    // Step 1 validation
    if (!formData.firstName.trim()) validationErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) validationErrors.lastName = "Last name is required";
    if (!formData.email.trim()) validationErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) validationErrors.email = "Invalid email address";
    if (!formData.phone.trim()) validationErrors.phone = "Phone is required";
    else if (!/^\d+$/.test(formData.phone.trim())) validationErrors.phone = "Phone must contain only numbers";

    // Step 2 validation
    if (!formData.address.trim()) validationErrors.address = "Address is required";
    if (!formData.city.trim()) validationErrors.city = "City is required";
   
    if (!formData.zip.trim()) validationErrors.zip = "Zip code is required";
    else if (!/^\d{5}(-\d{4})?$/.test(formData.zip.trim())) validationErrors.zip = "Invalid zip code format";


    // Step 3 validation
    if (!formData.username.trim()) validationErrors.username = "Username is required";
    else if (formData.username.trim().length < 8) validationErrors.username = "Username must be at least 8 characters";
    if (!formData.password.trim()) validationErrors.password = "Password is required";
    else if (formData.password.trim().length < 8) validationErrors.password = "Password must be at least 8 characters";
    if (!formData.confirmPassword.trim()) validationErrors.confirmPassword = "Please confirm your password";
    else if (formData.password.trim() !== formData.confirmPassword.trim()) validationErrors.confirmPassword = "Passwords do not match";




    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  let avatarBase64 = null;

if (avatar) {
    avatarBase64 = await fileToBase64(avatar);
  }



  const fullFormData = {
    ...formData,
    avatar: avatarBase64, 
  };




const { success, error } = await registerByAdmin (fullFormData);  



if (success) {
  showAlert('success', 'User added successfully');
//  navigate("/users");
} else {
  if (typeof error === 'object' && error !== null) {
    setErrors(error);

    // Show all error messages (including `.general`)
    const fieldErrors = Object.values(error).filter(Boolean).join(' | ');
    showAlert('error', fieldErrors || 'Registration failed');
  } else {
    showAlert('error', error || 'Registration failed');
  }
}
  };



 const passwordStrength = zxcvbn(formData.password);
const score = passwordStrength.score;
const strengthColors = ['#f8d7da', '#f5c6cb', '#f1a1a5', '#d9534f', '#b30000'];
const strengthWidths = ['10%', '30%', '60%', '85%', '100%'];
const strengthLabel = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

// select


const cities = [
  { value: "AD", label: "Adjuntas" },
  { value: "AG", label: "Aguada" },
  { value: "AI", label: "Aguadilla" },
  { value: "AB", label: "Aguas Buenas" },
  { value: "AN", label: "Añasco" },
  { value: "AR", label: "Arecibo" },
  { value: "AY", label: "Arroyo" },
  { value: "BQ", label: "Barranquitas" },
  { value: "BA", label: "Barceloneta" },
  { value: "BY", label: "Bayamón" },
  { value: "CR", label: "Cabo Rojo" },
  { value: "CG", label: "Caguas" },
  { value: "CU", label: "Camuy" },
  { value: "CN", label: "Canóvanas" },
  { value: "CA", label: "Carolina" },
  { value: "CT", label: "Cataño" },
  { value: "CY", label: "Cayey" },
  { value: "CE", label: "Ceiba" },
  { value: "CI", label: "Ciales" },
  { value: "CD", label: "Cidra" },
  { value: "CO", label: "Coamo" },
  { value: "CM", label: "Comerío" },
  { value: "CZ", label: "Corozal" },
  { value: "CL", label: "Culebra" },
  { value: "DO", label: "Dorado" },
  { value: "FA", label: "Fajardo" },
  { value: "FL", label: "Florida" },
  { value: "GN", label: "Guánica" },
  { value: "GT", label: "Guayama" },
  { value: "GV", label: "Guayanilla" },
  { value: "GY", label: "Guaynabo" },
  { value: "GD", label: "Gurabo" },
  { value: "HR", label: "Hatillo" },
  { value: "HO", label: "Hormigueros" },
  { value: "HU", label: "Humacao" },
  { value: "IS", label: "Isabela" },
  { value: "JR", label: "Jayuya" },
  { value: "JU", label: "Juana Díaz" },
  { value: "LA", label: "Lares" },
  { value: "LV", label: "Las Marías" },
  { value: "LM", label: "Las Piedras" },
  { value: "LO", label: "Loíza" },
  { value: "LU", label: "Luquillo" },
  { value: "MN", label: "Manatí" },
  { value: "MA", label: "Maricao" },
  { value: "ME", label: "Maunabo" },
  { value: "MO", label: "Mayagüez" },
  { value: "MD", label: "Moca" },
  { value: "NO", label: "Morovis" },
  { value: "NB", label: "Naguabo" },
  { value: "NV", label: "Naranjito" },
  { value: "OR", label: "Orocovis" },
  { value: "PA", label: "Patillas" },
  { value: "PE", label: "Peñuelas" },
  { value: "PI", label: "Ponce" },
  { value: "QU", label: "Quebradillas" },
  { value: "RG", label: "Rincón" },
  { value: "RN", label: "Río Grande" },
  { value: "SA", label: "Sabana Grande" },
  { value: "SC", label: "Salinas" },
  { value: "SB", label: "San Germán" },
  { value: "SL", label: "San Juan" },
  { value: "SR", label: "San Lorenzo" },
  { value: "SV", label: "San Sebastián" },
  { value: "SI", label: "Santa Isabel" },
  { value: "TA", label: "Toa Alta" },
  { value: "TB", label: "Toa Baja" },
  { value: "TR", label: "Trujillo Alto" },
  { value: "UR", label: "Utuado" },
  { value: "VA", label: "Vega Alta" },
  { value: "VB", label: "Vega Baja" },
  { value: "VE", label: "Vieques" },
  { value: "VI", label: "Villalba" },
  { value: "YB", label: "Yabucoa" },
  { value: "YA", label: "Yauco" }
];

const redTheme = {
  control: (styles, { isFocused }) => ({
    ...styles,
    borderColor: isFocused ? "#dc2626" : "#f87171",
    boxShadow: isFocused ? "0 0 0 1pxrgb(151, 76, 76)" : "none",
    "&:hover": { borderColor: "#dc2626" }
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected
      ? "#b91c1c"
      : isFocused
      ? "#fecaca"
      : "white",
    color: isSelected ? "white" : "#b91c1c"
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "#b91c1c"
  })
};







const handleSelectChange = (selectedOption) => {
  setFormData((prev) => ({
    ...prev,
    city: selectedOption?.value || ''
  }));

  setErrors((prev) => ({
    ...prev,
    city: ''
  }));
};







const roleOptions = [
  { value: 'ROLE_GUEST', label: 'Guest' },
  { value: 'ROLE_ADMIN', label: 'Admin' },
];








  return (


<>
 <ButtonCustomizedAction
        onClick={() => navigate(-1)}  
        label="Back"
        action="back" 
      />





    <div >


        
      <div className="stepper-header">
        <div className={`stepper-header-step ${step === 1 ? 'active' : ''}`}>Step 1</div>
        <div className={`stepper-header-step ${step === 2 ? 'active' : ''}`}>Step 2</div>
        <div className={`stepper-header-step ${step === 3 ? 'active' : ''}`}>Step 3</div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {step === 1 && (
          <>

          
            <input
              className="stepper-input"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              maxLength={25}
            />
            {errors.firstName && <p className="stepper-error">{errors.firstName}</p>}

            <input
              className="stepper-input"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              maxLength={25}
            />
            {errors.lastName && <p className="stepper-error">{errors.lastName}</p>}

            <input
              className="stepper-input"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
               maxLength={255}
            />
            {errors.email && <p className="stepper-error">{errors.email}</p>}

            <input
              className="stepper-input"
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              maxLength={25}
            />
            {errors.phone && <p className="stepper-error">{errors.phone}</p>}
          </>
        )}


{step === 2 && (
<div className="avatar-preview-card">
  <div className="avatar-preview-wrapper">
    {avatar && (
      <span className="avatar-remove-icon" onClick={() => setAvatar(null)}>
        <MdClose />
      </span>
    )}
    <img
      src={avatar ? URL.createObjectURL(avatar) : placeHolder}
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

)}










        {step === 2 && (
          <>
            <input
              className="stepper-input"
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              maxLength={255}
            />
            {errors.address && <p className="stepper-error">{errors.address}</p>}






              <div className="stepper-input-wrapper">
              
                <Select
                
                  id="city"
                  name="city"
                  options={cities}
                  value={cities.find((m) => m.value === formData.city)}
                  onChange={handleSelectChange}
                  placeholder="Select a city"
                 styles={{
                      ...redTheme,
                      container: (provided) => ({
                        ...provided,
                        marginBottom: 10,  
                      }),
                    }}
                />





                {errors.city && <p className="stepper-error">{errors.city}</p>}
              </div>


              <input
              className="stepper-input"
              type="text"
              name="zip"
              placeholder="Zip Code"
              value={formData.zip}
              onChange={handleChange}
              maxLength={5}
            />
            {errors.zip && <p className="stepper-error">{errors.zip}</p>}

          
            
          </>
        )}

        {step === 3 && (
          <>
            <input
              className="stepper-input"
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
               maxLength={25}
            />
            {errors.username && <p className="stepper-error">{errors.username}</p>}




<div className="stepper-input-wrapper">
  <label htmlFor="role" className="stepper-label">Select Role</label>
  <Select
    id="role"
    name="role"
    options={roleOptions}
    value={roleOptions.find(option => option.value === formData.role)}
    onChange={(selectedOption) => {
      handleChange({ target: { name: 'role', value: selectedOption.value } });
    }}
    classNamePrefix="stepper-select"
    placeholder="Select a role"
     styles={{
                      ...redTheme,
                      container: (provided) => ({
                        ...provided,
                        marginBottom: 10,  
                      }),
                    }}
  />
</div>








<div  style={{ marginTop: 20,}}></div>
            <input
              className="stepper-input"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

 {formData.password && (
      <>
        <div style={{
          height: 6,
          backgroundColor: '#f8d7da',
          borderRadius: 3,
          overflow: 'hidden',
          marginTop: 8,
        }}>
          <div style={{
            height: '100%',
            width: strengthWidths[score],
            backgroundColor: strengthColors[score],
            transition: 'width 0.3s ease',
          }} />
        </div>
        <div style={{
          marginTop: 6,
          color: strengthColors[score],
          fontSize: 14,
          fontWeight: 'bold'
        }}>
          Strength: {strengthLabel[score]}
        </div>
      </>
    )}

<div  style={{ marginTop: 20,}}></div>
            
            {errors.password && <p className="stepper-error">{errors.password}</p>}

            <input
              className="stepper-input"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="stepper-error">{errors.confirmPassword}</p>}
          </>
        )}

        <div className="stepper-buttons">
          {step > 1 && (
            <button type="button" className="stepper-button" onClick={handlePrev}>
              Back
            </button>
          )}
          {step < 3 && (
            <button type="button" className="stepper-button" onClick={handleNext}>
              Next
            </button>
          )}
          {step === 3 && (
            <button type="submit" className="stepper-button" disabled={loading}>
              Register
            </button>
          )}
        </div>
      </form>

      {status && (
        <p className={`stepper-status ${status.toLowerCase().includes('failed') ? 'error' : 'success'}`}>
          {status}
        </p>
      )}

      <p className="stepper-footer">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div></>
  );
};

export default RegisterNewGuest;
