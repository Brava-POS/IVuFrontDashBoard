// src/layouts/PublicLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
export default function PublicLayout() {
  return (
      <div className="public-layout-container">
      <Outlet />
    </div>
  );
}















// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import logo from '../assets/images/brava.png';

// const PublicLayout = () => {
//   return (
//     <div className="public-layout">
//       <header className="public-header">
//           <h1 className="login-title" > Brava Control</h1>
//         <img src={logo} alt="Brava Logo" className="public-logo" />
//       </header>
//       <main className="public-main">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default PublicLayout;
