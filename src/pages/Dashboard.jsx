
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import UserProfile from '../components/UserProfile';

const Dashboard = () => {
  const { user } = useAuth();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 640;
      setIsMobile(mobile);
      if (!mobile) setIsMobileOpen(false);
    };

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

  const closeMobileSidebar = () => {
    if (isMobile) setIsMobileOpen(false);
  };

  return (
    <div className="dashboard">
      <Sidebar
        isMobile={isMobile}
        isMobileOpen={isMobileOpen}
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        closeMobileSidebar={closeMobileSidebar}
      />
      <div className="main-content">
        {user && <UserProfile user={user} />}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;











// import React, { useEffect, useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import MainContent from '../components/MainContent';
// import { Outlet } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; 
// import UserProfile from '../components/UserProfile';

// const Dashboard = () => {
//   const {user } = useAuth();

//  const [isCollapsed, setIsCollapsed] = useState(false);
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);











//   return (
//     <div className="dashboard">
//       <Sidebar />
//       <div className="main-content">

//        {user && <UserProfile user={user} />} 
//         <Outlet /> 
//       </div>
//     </div>
//   );
// };

// export default Dashboard;