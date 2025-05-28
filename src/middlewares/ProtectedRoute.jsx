import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const mapBackendRole = (backendRole) => {
  if (!backendRole) return '';
  return backendRole.replace('ROLE_', '').toLowerCase();
};

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const normalizedRole = mapBackendRole(user?.role);

  if (!allowedRoles.includes(normalizedRole)) {
    return <Navigate to="/login" replace />; // To Do navigate to Forbidden Page
  }

  return children;
};

export default ProtectedRoute;
