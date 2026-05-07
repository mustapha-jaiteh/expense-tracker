import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/userContext';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import {Toaster} from "react-hot-toast"

/**
 * A wrapper component to protect private routes.
 * It checks for a token and redirects to login if not found.
 */
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <UserProvider>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} /> 

        {/* Private / Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute> 
          } 
        />
        <Route 
          path="/income" 
          element={
            <ProtectedRoute>
              <Income />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/expense" 
          element={
            <ProtectedRoute>
              <Expense />
            </ProtectedRoute>
          } 
        />

        {/* Root Redirect Logic */}
        <Route path="/" element={<RootRedirect />} />

        {/* Catch-all: Redirect unknown paths to dashboard or login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>

    <Toaster 
    toastOptions={{
      className: "",
      style: {
        fontSize: "13px"
      }
    }}
    />
    </UserProvider>
  );
};

// Logic for the base URL (/)
const RootRedirect = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

export default App;