import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { ResponsiveProvider } from '../context/ResponsiveContext';




const TopLevelLayout = () => (
  <ResponsiveProvider>
  <div className="top-level-layout">
    <header className="top-level-header">
      <TopBar/>
    </header>
    <main className="top-level-main">
      <Outlet />
    </main>
  </div>
  </ResponsiveProvider>
);

export default TopLevelLayout;