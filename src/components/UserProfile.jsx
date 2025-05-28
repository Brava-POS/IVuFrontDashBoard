import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { FiEdit, FiKey, FiCreditCard, FiLogOut } from 'react-icons/fi';
import avatarPlaceholder from '../assets/images/avataruser.png';

const UserProfile = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const { logout, user } = useAuth();

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

  const isMerchant = user.role === 'ROLE_MERCHANT';

  return (
<div className="userprofilev4-user-profile">
  <div className="userprofilev4-user-info">
    <span className="userprofilev4-username">{user.username}</span>
    <div className="userprofilev4-avatar-wrapper" ref={dropdownRef}>
      <img
        src={user.avatarUrl || avatarPlaceholder}
        alt="User Avatar"
        className="userprofilev4-avatar-img"
        onClick={toggleDropdown}
      />
      {dropdownOpen && (
        <div className="userprofilev4-dropdown-menu">
          <NavLink to="/profile" className="userprofilev4-dropdown-item">
            <FiEdit style={{ marginRight: '8px' }} />
            Profile
          </NavLink>
          <NavLink to="/changeprofilepassword" className="userprofilev4-dropdown-item">
            <FiKey style={{ marginRight: '8px' }} />
            Change Password
          </NavLink>
          {isMerchant && (
            <NavLink to="/billing" className="userprofilev4-dropdown-item">
              <FiCreditCard style={{ marginRight: '8px' }} />
              Billing
            </NavLink>
          )}
          <div className="userprofilev4-dropdown-item" onClick={logout}>
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
