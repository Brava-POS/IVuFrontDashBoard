import React from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import UserProfile from '../components/UserProfile';

const Dashboard = () => {
  const {user } = useAuth();


  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">

       {user && <UserProfile user={user} />} 
        <Outlet /> 
      </div>
    </div>
  );
};

export default Dashboard;