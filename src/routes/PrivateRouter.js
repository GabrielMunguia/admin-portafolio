import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../auth/authContext';



export const PrivateRoute = ({ children }) => {

    const { user } = useContext(AuthContext);

    

    
    return (user.logged||user===null)
        ? children
        : <Navigate to="/login" />
}
