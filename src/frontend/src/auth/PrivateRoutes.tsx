import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoutes = () => {
    const { user, loading } = useAuth();
    if (loading) {
      return null
    }
    return (
        user && user.isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;
