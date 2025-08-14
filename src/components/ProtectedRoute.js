// src/components/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
// This function needs to check if the user is logged in.
// You will get this from your authentication state or a function you've written.
import { useAuth } from './AuthContext'; // A hypothetical context for checking auth

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth(); // Check if the user is logged in

  if (!isLoggedIn) {
    // If not logged in, redirect them to the login page
    return <Navigate to="/login" replace />;
  }

  // If logged in, show the requested component (the 'children')
  return children;
};

export default ProtectedRoute;