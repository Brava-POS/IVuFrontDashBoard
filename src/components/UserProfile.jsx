import React, { useState, useRef, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { FiEdit, FiKey, FiCreditCard, FiLogOut } from 'react-icons/fi';
import avatarPlaceholder from '../assets/images/avataruser.png';

const UserProfile = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();


  const {logout ,user } = useAuth();
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);







  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;



  return (
    <div className="user-profile">
      <div className="user-info">
        <span className="username">{user.username}</span>
        <div className="avatar-wrapper" ref={dropdownRef}>
          <img
            src={user.avatarUrl || avatarPlaceholder}
            alt="User Avatar"
            className="avatar-img"
            onClick={toggleDropdown}
          />
          {dropdownOpen && (

            <div className="dropdown-menu">
              <NavLink to="/profile" className="dropdown-item">
                <FiEdit style={{ marginRight: '8px' }} />
                Edit Profile
              </NavLink>
              <NavLink to="/changepassword"  className="dropdown-item">
                <FiKey style={{ marginRight: '8px' }} />
                Change Password
              </NavLink>
              <NavLink to="/billing" className="dropdown-item">
                <FiCreditCard style={{ marginRight: '8px' }} />
                Billing
              </NavLink>
              <div className="dropdown-item" onClick={logout}>
                <FiLogOut style={{ marginRight: '8px' }} />
                Sign Out
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
