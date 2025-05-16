import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { iconMap } from '../assets/icons/iconMap';


const Sidebar = ({
  isMobile = false,
  isMobileOpen = false,
  isCollapsed = false,
  toggleSidebar,
  closeMobileSidebar
}) => {
  const { menu } = useAuth();

  const sidebarClass = `
    sidebar 
    ${isCollapsed ? 'collapsed' : ''} 
    ${isMobile ? 'mobile' : ''} 
    ${isMobile && isMobileOpen ? 'mobile-open' : ''}
  `;

  return (
    <>
     

      <div className={sidebarClass.trim()}>
      

        <nav>
          <ul>
            {menu.map((item, idx) => {
              const Icon = iconMap[item.label] || null;
              const path = item.path ? `/${item.path}` : '/';

              return (
                <li key={idx}>
                  <NavLink
                    to={path}
                    className="nav-link"
                    onClick={isMobile ? closeMobileSidebar : undefined}
                  >
                    {Icon && <span className="icon"><Icon size={20} /></span>}
                    {!isCollapsed && item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
