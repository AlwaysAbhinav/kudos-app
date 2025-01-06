import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
        // Show a loading indicator while checking authentication state
        return <div>Loading...</div>;
  }

  if (!user) {
        // Pass the current location to the login page so the user can be redirected back
        return <Navigate to="/login" state={{ from: location }} />;
  }

        // Render the protected content if the user is authenticated
        return children;
};

export default ProtectedRoute;
