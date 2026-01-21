import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ adminKey, setAdminKey, handleAdminLogin }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleAdminLogin()) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin key');
      setAdminKey('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-amber-900 to-orange-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-orange-200">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full mb-4 shadow-lg">
            <span className="text-2xl font-bold text-white">🔒</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h2>
          <p className="text-gray-600">Enter admin key to access dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">Admin Key</label>
            <div className="relative">
              <input
                type="password"
                value={adminKey}
                onChange={(e) => {
                  setAdminKey(e.target.value);
                  setError('');
                }}
                className={`w-full p-4 bg-white border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                placeholder="Enter admin key"
              />
              <div className="absolute right-3 top-3">
                <span className="text-gray-500">🔑</span>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Login to Dashboard
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full text-gray-600 hover:text-orange-700 py-3 rounded-lg border border-gray-300 hover:border-orange-500 hover:bg-orange-50 transition-colors"
          >
            ← Back to Registration
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            Hackathon Admin Panel v1.0<br />
            WebReich Solutions × Shivaji College
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;