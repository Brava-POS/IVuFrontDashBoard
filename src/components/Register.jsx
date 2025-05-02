import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/brava.png';

const Register = () => {

  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const { success, error, data } = await register(formData);

    if (success) {
      console.log("Registration successful ", data);
      setStatus("Registration successful ");
    } else {
      console.error("Registration failed ", error);
      setStatus("Registration failed ");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="ivu-login-container">
      <div className="ivu-login-form">
        <div className="login-logo-wrapper">
          <img src={logo} alt="Brava Logo" className="login-logo" />
          <h1 className="login-title">Brava Control</h1>
        </div>

        <form onSubmit={handleSubmit} className="ivu-form">
          <input
            className="ivu-input"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="ivu-input"
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            className="ivu-input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            minLength={8}
            required
          />
          <input
            className="ivu-input"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            className="ivu-input"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            className="ivu-input"
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            className="ivu-input"
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            className="ivu-input"
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          <input
            className="ivu-input"
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
          />
          <input
            className="ivu-input"
            type="text"
            name="zip"
            placeholder="Zip Code"
            value={formData.zip}
            onChange={handleChange}
          />
          <input
            className="ivu-input"
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="ivu-button ivu-button-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        {status && (
          <p className={`ivu-status ${status.includes("") ? "error" : ""}`}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
