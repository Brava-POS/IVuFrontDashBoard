

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import './app-css/table.css';
import './app-css/pagination.css';
import './app-css/custom-swal.css';
import './app-css/BackButton.css';
import './app-css/RedTitle.css';
import './app-css/FormCrud.css';
import './app-css/Input.css';
import './app-css/EditButton.css';
import './app-css/CustomizedButton.css';
import './app-css/AdditionalAmountModal.css';
import './app-css/AddingItem.css';
import './app-css/DateInput.css';
import './app-css/TimeInput.css';
import './app-css/FilterBlock.css';
import './app-css/MerchantDropdownSelector.css';
import './app-css/MerchantCreatePage.css';
import './app-css/AppuserSelector.css';
import './app-css/UpdateMerchantPage.css';
import './app-css/UpdateMerchantPage.css';

 import './app-css/RoleToggle.css';
// import './app-css/UpdateMerchantPage.css';
// import './app-css/UpdateMerchantPage.css';
// import './app-css/UpdateMerchantPage.css';
// import './app-css/UpdateMerchantPage.css';
// import './app-css/UpdateMerchantPage.css';
// import './app-css/UpdateMerchantPage.css';
// import './app-css/UpdateMerchantPage.css';
// import './app-css/UpdateMerchantPage.css';
// import './app-css/UpdateMerchantPage.css';
// import './app-css/UpdateMerchantPage.css';








import App from './App';
import DashBoardLayout from './layouts/DashBoardLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PublicLayout from './layouts/PublicLayout';
import DefaultLanding from './pages/DefaultLanding';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './middlewares/ProtectedRoute';


import AdminRoutes from './routes/AdminRoutes.jsx';
import AdminMerchantRoutes from './routes/AdminMerchantRoutes.jsx';
import GuestRoutes from './routes/GuestRoutes.jsx';
import TopLevelLayout from './layouts/TopLevelLayout';
import ForgetPasswordPage from './pages/ForgetPasswordPage.jsx';
import ResetForgottenPaswordPage from './pages/ResetForgottenPaswordPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>





      <Router>
        <Routes>
  <Route path="/" element={<App />}>

          <Route path="/" element={<TopLevelLayout />}>


            <Route path="" element={<DashBoardLayout />}>

         
              <Route
                index
                element={
                  <ProtectedRoute allowedRoles={['guest', 'admin', 'merchant']}>
                    <DefaultLanding />
                  </ProtectedRoute>
                }
              />

           
              {GuestRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <ProtectedRoute allowedRoles={['guest', 'admin', 'merchant']}>
                      {route.element}
                    </ProtectedRoute>
                  }
                />
              ))}

           
              {AdminMerchantRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'merchant']}>
                      {route.element}
                    </ProtectedRoute>
                  }
                />
              ))}

       
              {AdminRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      {route.element}
                    </ProtectedRoute>
                  }
                />
              ))}
            </Route>
            <Route element={<PublicLayout />}>



           <Route path="resetforgottenpassword" element={<ResetForgottenPaswordPage />} />
                <Route path="forgetpassword" element={<ForgetPasswordPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
          </Route>


</Route>



        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);



























// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import './index.css';
// import App from './App';
// import DashBoardLayout from './layouts/DashBoardLayout';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import PublicLayout from './layouts/PublicLayout';
// import DefaultLanding from './pages/DefaultLanding';

// import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './middlewares/ProtectedRoute';


// import AdminRoutes from './routes/AdminRoutes.jsx';
// import AdminMerchantRoutes from './routes/AdminMerchantRoutes.jsx';
// import GuestRoutes from './routes/GuestRoutes.jsx';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<App />}>
//             <Route path="" element={<DashBoardLayout />}>

         
//               <Route
//                 index
//                 element={
//                   <ProtectedRoute allowedRoles={['guest', 'admin', 'merchant']}>
//                     <DefaultLanding />
//                   </ProtectedRoute>
//                 }
//               />

//               {/* Guest Routes */}
//               {GuestRoutes.map((route) => (
//                 <Route
//                   key={route.path}
//                   path={route.path}
//                   element={
//                     <ProtectedRoute allowedRoles={['guest', 'admin', 'merchant']}>
//                       {route.element}
//                     </ProtectedRoute>
//                   }
//                 />
//               ))}

//               {/* Admin + Merchant Routes */}
//               {AdminMerchantRoutes.map((route) => (
//                 <Route
//                   key={route.path}
//                   path={route.path}
//                   element={
//                     <ProtectedRoute allowedRoles={['admin', 'merchant']}>
//                       {route.element}
//                     </ProtectedRoute>
//                   }
//                 />
//               ))}

//               {/* Admin-only Routes */}
//               {AdminRoutes.map((route) => (
//                 <Route
//                   key={route.path}
//                   path={route.path}
//                   element={
//                     <ProtectedRoute allowedRoles={['admin']}>
//                       {route.element}
//                     </ProtectedRoute>
//                   }
//                 />
//               ))}
//             </Route>

//             {/* Public Routes */}
//             <Route element={<PublicLayout />}>
//               <Route path="login" element={<LoginPage />} />
//               <Route path="register" element={<RegisterPage />} />
//             </Route>
//           </Route>
//         </Routes>
//       </Router>
//     </AuthProvider>
//   </React.StrictMode>
// );




// Resulting Structure
// TopLevelLayout
// │
// ├── [TopBar]    ← always rendered (shows login/register or user menu/avatar)
// │
// └─[Dashboard Area]
//     ├── DashBoardLayout
//     │    ├─ Sidebar
//     │    └─ MainContent
//     │         └─ [protected routes via Outlet]
//     │
//     └── PublicLayout
//           └─ LoginPage/RegisterPage (no sidebar/main; fills whole area below TopBar)