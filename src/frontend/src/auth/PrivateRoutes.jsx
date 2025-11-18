import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const PrivateRoutes = () => {
    const { user } = useAuth();

    return (
        user && user.isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;