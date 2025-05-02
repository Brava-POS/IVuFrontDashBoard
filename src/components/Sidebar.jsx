import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaSignOutAlt, FaMoneyBill, FaCog } from 'react-icons/fa';
import { HiHome } from "react-icons/hi2";
import { FaUsersGear } from "react-icons/fa6";
import { VscFileSubmodule } from "react-icons/vsc";
import { TbCashRegister } from "react-icons/tb";
import logo from '../assets/images/brava.png';
import { useAuth } from '../context/AuthContext';
import UserProfile from './UserProfile';

const Sidebar = () => {
  const { user,menu } = useAuth();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);


  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 640;
      setIsMobile(mobile);
      if (!mobile) setIsMobileOpen(false);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(prev => !prev);
    } else {
      setIsCollapsed(prev => !prev);
    }
  };

  const iconMap = {
    Home: <HiHome />,
    Merchants: <FaUsersGear />,
    'Informative Files': <VscFileSubmodule />,
    Transactions: <FaMoneyBill />,
    Taxes: <TbCashRegister />,
    Settings: <FaCog />,
    Logout: <FaSignOutAlt />
  };

  return (
    <>
     
    
        <div className="hamburger-wrapper">
          <button className="hamburger-button" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>
     


 
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>


        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="logo-image" />
          {!isCollapsed && <div className="sidebar-title">Brava Control</div>}
        </div>

        <nav>
          <ul>
            {menu.map((item, idx) => (
              <li key={idx}>
                <NavLink
                  to={`/${item.path}`}
                  className="nav-link"
                  onClick={() => isMobile && setIsMobileOpen(false)}
                >
                  <span className="icon">{iconMap[item.label]}</span>
                  {!isCollapsed && item.label}
                </NavLink>
              </li>
            ))}





          </ul>
        </nav>



        
      </div>
    </>
  );
};

export default Sidebar;

