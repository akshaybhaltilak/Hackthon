import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import AdminPanel from './Components/AdminPanel';
import AboutPage from './Components/AboutPage';
import PrizesPage from './Components/PrizesPage';
import AdminLogin from './Components/AdminLogin';
import Navbar from './Components/Navbar';
import RegistrationForm from './Components/RegistrationForm';
import ScrollToTop from './Components/ScrollToTop';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminKey, setAdminKey] = useState('');

  const handleAdminLogin = (key) => {
    if (key === 'webreich2026') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setAdminKey('');
  };

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isAdmin) {
      return <Navigate to="/admin/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/admin/dashboard" element={null} />
        <Route path="*" element={<Navbar />} />
      </Routes>

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/prizes" element={<PrizesPage />} />
        <Route path="/register" element={<RegistrationForm />} />

        {/* Admin Routes */}
        <Route
          path="/admin/login"
          element={
            <AdminLogin
              adminKey={adminKey}
              setAdminKey={setAdminKey}
              handleAdminLogin={() => handleAdminLogin(adminKey)}
            />
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <div className="relative">
                <AdminPanel />
                <div className="fixed top-4 right-4 z-50">
                  <button
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-lg shadow-lg hover:from-red-700 hover:to-orange-700 transition-all duration-300 font-semibold flex items-center space-x-2"
                  >
                    <span>🚪</span>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Redirects */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;