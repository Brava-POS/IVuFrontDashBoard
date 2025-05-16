import React from 'react';
import { useNavigate , useLocation} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/brava.png';
import UserProfile from './UserProfile'; 
import { LuSquareMenu } from "react-icons/lu";
import { useResponsive } from '../context/ResponsiveContext';
import { BsArrowsFullscreen } from "react-icons/bs";



const TopBar = () => {
const location = useLocation();
const currentPath = location.pathname;

const {
    isCollapsed,
    isMobileOpen,
    isMobile,
    toggleSidebar,
    closeMobileSidebar,
    setIsMobileOpen
  } = useResponsive()



  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  return (












    <nav className="top-bar">


 

      <div className="top-bar__branding">

<button className="hamburger-button" onClick={toggleSidebar}>
      <LuSquareMenu />
      </button>
        <img className="top-bar__logo" src={logo} alt="Brava logo" />
        <div className="sidebar-title">Brava Control</div>
      </div>






     
      <div className="top-bar__actions">
        {!isAuthenticated ? (
          <>
          <button
  className={`top-bar__btn ${currentPath === '/login' ? 'active' : ''}`}
  onClick={() => navigate('/login')}
>
  Login
</button>
         <button
  className={`top-bar__btn top-bar__btn--accent ${currentPath === '/register' ? 'active' : ''}`}
  onClick={() => navigate('/register')}
>
  Register
</button>
          </>
        ) : (
          <UserProfile user={user} />
        )}
      </div>
    </nav>
  );
};

export default TopBar;