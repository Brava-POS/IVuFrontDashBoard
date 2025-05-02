import React from 'react';
import Title from '../components/Title';
import Register from '../components/Register';

const RegisterPage = () => {
  return (
    <div className="auth-page">
      <Title text="Create your account" />
      <Register />
      <p className="auth-footer">
        Already have an account? <a href="/login">Sign in</a>
      </p>
    </div>
  );
};

export default RegisterPage;