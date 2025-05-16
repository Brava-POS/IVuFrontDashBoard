// src/layouts/DashBoardLayout.jsx
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import { useResponsive } from '../context/ResponsiveContext';







const DashBoardLayout= () => {


  const {
    isCollapsed,
    isMobileOpen,
    isMobile,
    toggleSidebar,
    closeMobileSidebar,
    setIsMobileOpen
  } = useResponsive();

  return (
    <div className={`dashboard-layout ${isMobile ? 'mobile' : ''}`}>
      <Sidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        isMobile={isMobile}
        toggleSidebar={toggleSidebar}
        closeMobileSidebar={() => setIsMobileOpen(false)}
      />
      <MainContent toggleSidebar={toggleSidebar} />
    
    </div>
  );
};

export default DashBoardLayout;


