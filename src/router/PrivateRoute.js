import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ isAuthenticated, children }) => {
    return isAuthenticated ? <Navigate to="/" /> : children;
};