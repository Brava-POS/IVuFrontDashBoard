import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { loading, register } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required";
      }
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
      if (!formData.state.trim()) {
        newErrors.state = "State is required";
      }
      if (!formData.zip.trim()) {
        newErrors.zip = "Zip code is required";
      } else if (!/^\d{5}(-\d{4})?$/.test(formData.zip.trim())) {
        newErrors.zip = "Invalid zip code format";
      }
      if (!formData.country.trim()) {
        newErrors.country = "Country is required";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all steps on submit to be safe
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
    if (!formData.state.trim()) validationErrors.state = "State is required";
    if (!formData.zip.trim()) validationErrors.zip = "Zip code is required";
    else if (!/^\d{5}(-\d{4})?$/.test(formData.zip.trim())) validationErrors.zip = "Invalid zip code format";
    if (!formData.country.trim()) validationErrors.country = "Country is required";

    // Step 3 validation
    if (!formData.username.trim()) validationErrors.username = "Username is required";
    else if (formData.username.trim().length < 8) validationErrors.username = "Username must be at least 8 characters";
    if (!formData.password.trim()) validationErrors.password = "Password is required";
    else if (formData.password.trim().length < 8) validationErrors.password = "Password must be at least 8 characters";
    if (!formData.confirmPassword.trim()) validationErrors.confirmPassword = "Please confirm your password";
    else if (formData.password.trim() !== formData.confirmPassword.trim()) validationErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStep(1); // Optionally reset to first step if error exists
      return;
    }

    const { success, error } = await register(formData);

    if (success) {
      navigate('/nonbravaclients');
    } else {
      setStatus(error || 'Registration failed');
    }
  };

  return (
    <div className="stepper-form-container">
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
            />
            {errors.firstName && <p className="stepper-error">{errors.firstName}</p>}

            <input
              className="stepper-input"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p className="stepper-error">{errors.lastName}</p>}

            <input
              className="stepper-input"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="stepper-error">{errors.email}</p>}

            <input
              className="stepper-input"
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="stepper-error">{errors.phone}</p>}
          </>
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
            />
            {errors.address && <p className="stepper-error">{errors.address}</p>}

            <input
              className="stepper-input"
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
            {errors.city && <p className="stepper-error">{errors.city}</p>}

            <input
              className="stepper-input"
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
            />
            {errors.state && <p className="stepper-error">{errors.state}</p>}

            <input
              className="stepper-input"
              type="text"
              name="zip"
              placeholder="Zip Code"
              value={formData.zip}
              onChange={handleChange}
            />
            {errors.zip && <p className="stepper-error">{errors.zip}</p>}

            <input
              className="stepper-input"
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
            />
            {errors.country && <p className="stepper-error">{errors.country}</p>}
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
            />
            {errors.username && <p className="stepper-error">{errors.username}</p>}

            <input
              className="stepper-input"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
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
    </div>
  );
};

export default Register;
