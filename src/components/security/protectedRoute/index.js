import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const tokenExpireDate = sessionStorage.getItem('tokenExpireDate');

    function isTokenValid(inputDateString) {
        const inputDate = new Date(inputDateString);
        const currentDate = new Date();
        return currentDate <= inputDate;
    }

    useEffect(() => {
        // Redirect to login if no token or token is invalid
        if (!token || (tokenExpireDate && !isTokenValid(tokenExpireDate))) {
            navigate('/login');
        }
    }, [token, tokenExpireDate, navigate]);

    // Prevent rendering children if there is no token or if token is invalid
    if (!token || (tokenExpireDate && !isTokenValid(tokenExpireDate))) {
        return null;
    }

    return children;
};
