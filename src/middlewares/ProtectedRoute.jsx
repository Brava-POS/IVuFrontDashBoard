import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Helper to normalize backend role format
const mapBackendRole = (backendRole) => {
  if (!backendRole) return '';
  return backendRole.replace('ROLE_', '').toLowerCase(); // e.g. ROLE_GUEST → guest
};

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const normalizedRole = mapBackendRole(user?.role);

  if (!allowedRoles.includes(normalizedRole)) {
    return <Navigate to="/login" replace />; // or to /forbidden
  }

  return children;
};

export default ProtectedRoute;
