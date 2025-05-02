import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/brava.png';

const Login = () => {
  const { loading, login} = useAuth(); 
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
 

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const { success, error } = await login(email, password);
    if (success) {
  navigate('/'); 
    } else {
      setErrorMsg(error || 'Login failed');
    }
  };




  

  return (
    <div className="ivu-login-container">

<div className="ivu-login-form">
        <div className="login-logo-wrapper">
          <img src={logo} alt="Brava Logo" className="login-logo" />
          <h1 className="login-title">Brava Control</h1>
        </div>

    
   



        <form onSubmit={handleLogin} className="ivu-form">
          <input
            className="ivu-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="ivu-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" className="ivu-button ivu-button-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {errorMsg && <p className="ivu-status error">{errorMsg}</p>}

      
      </div>
    </div>
  );
};

export default Login;
