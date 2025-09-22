import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/utils/LoadingSpinner';
import { Navigate, Outlet } from 'react-router-dom';

const AuthenticatedRoutes = () => {


    const { authState } = useAuth();

    console.log('t5l lel auth route')
    console.log({ authState });

    if (authState.status === 'loading')
        return <LoadingSpinner />;

    if (authState.status === 'unauthenticated')
        return <Navigate to="/login" />


    return <Outlet />;
}

export default AuthenticatedRoutes