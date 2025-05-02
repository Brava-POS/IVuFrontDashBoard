import React from 'react';
import { Outlet } from 'react-router-dom';
import logo from '../assets/images/brava.png';
import SearchComponent from './SearchComponent';

const MainContent = () => {
  return (
    <div className="main-content">
      
      <header className="main-header elevation">
        <div className="user-name">Hi, John Doe</div>
        <div className="avatar">
          <img src={logo} alt="User Avatar" />
        </div>
      </header>

      <section className="page-title elevation">
        <SearchComponent />
      </section>

      <main className="content-body">
 
        <Outlet />
      </main>

      <footer className="main-footer elevation">
        &copy; {new Date().getFullYear()} Brava Control. All rights reserved.
      </footer>
    </div>
  );
};

export default MainContent;
