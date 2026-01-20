import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminPanel from './Components/AdminPanel';
import RegistrationForm from './Components/RegistrationForm';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const handleAdminLogin = () => {
    // Simple admin key check
    if (adminKey === 'webreich2026') {
      setIsAdmin(true);
      setShowAdminLogin(false);
    } else {
      alert('Invalid admin key');
      setAdminKey('');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setAdminKey('');
  };

  if (showAdminLogin) {
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
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 text-sm font-medium">Admin Key</label>
              <div className="relative">
                <input
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  className="w-full p-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter webreich2026"
                  onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                />
                <div className="absolute right-3 top-3">
                  <span className="text-gray-500">🔑</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleAdminLogin}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Login to Dashboard
            </button>
            
            <button
              onClick={() => setShowAdminLogin(false)}
              className="w-full text-gray-600 hover:text-orange-700 py-3 rounded-lg border border-gray-300 hover:border-orange-500 hover:bg-orange-50 transition-colors"
            >
              ← Back to Registration
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-500 text-sm">
              Hackathon Admin Panel v1.0<br />
              WebReich Solutions × Shivaji College
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div>
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
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        {/* Navigation Bar */}
        <nav className="bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                    <span className="text-orange-600 font-bold text-xl">WR</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">WebReich Hackathon 2026</h1>
                    <p className="text-sm text-orange-100">Shivaji College, Akola</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Link to="/" className="hover:text-orange-200 transition-colors px-3 py-2 rounded-lg hover:bg-white/10">
                  Home
                </Link>
                <Link to="/about" className="hover:text-orange-200 transition-colors px-3 py-2 rounded-lg hover:bg-white/10">
                  About
                </Link>
                <Link to="/prizes" className="hover:text-orange-200 transition-colors px-3 py-2 rounded-lg hover:bg-white/10">
                  Prizes
                </Link>
                <button
                  onClick={() => setShowAdminLogin(true)}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <span>👑</span>
                  <span>Admin Panel</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/prizes" element={<PrizesPage />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-orange-800 to-amber-900 text-white py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">WebReich Solutions</h3>
                <p className="text-orange-100">
                  Organizing innovative hackathons to foster creativity and technical excellence.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Event Details</h3>
                <ul className="text-orange-100 space-y-2">
                  <li>📅 3rd February 2026</li>
                  <li>⏰ 12 Hours (9 AM - 9 PM)</li>
                  <li>📍 Shivaji College, Akola</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Contact</h3>
                <ul className="text-orange-100 space-y-2">
                  <li>📧 hackathon@webreich.com</li>
                  <li>📞 +91 9876543210</li>
                  <li>🌐 www.webreich.com</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-orange-700 mt-8 pt-8 text-center text-orange-300">
              <p>© 2026 WebReich Solutions. All rights reserved.</p>
              <p className="mt-2">In association with Shivaji College of Art and Science, Akola</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

// Additional Pages
function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About the Hackathon</h1>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl border-l-4 border-orange-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">🚀 Event Overview</h2>
            <p className="text-gray-700">
              Join us for an exhilarating 12-hour hackathon organized by WebReich Solutions in collaboration 
              with Shivaji College of Art and Science, Akola. This event brings together the brightest minds 
              to solve real-world problems through innovative technology solutions.
            </p>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border-l-4 border-amber-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">🎯 Theme & Focus</h2>
            <p className="text-gray-700">
              While participants are free to work on any project of their choice, we encourage solutions 
              that address local community challenges, educational technology, healthcare innovations, 
              sustainable development, and digital transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <span className="w-2 h-6 bg-orange-500 rounded-full mr-3"></span>
                📋 Rules & Guidelines
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  Team size: 2-4 members (including captain)
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  All code must be written during the event
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  Open source libraries allowed
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  Internet access provided
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  Food and beverages provided
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <span className="w-2 h-6 bg-amber-500 rounded-full mr-3"></span>
                👥 Judging Criteria
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Innovation & Creativity (30%)
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Technical Implementation (30%)
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Practicality & Impact (20%)
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Presentation & Demo (20%)
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center pt-6">
            <Link to="/" className="inline-block bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg">
              ← Back to Registration
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrizesPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">🏆 Hackathon Prizes</h1>
      
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {/* First Prize */}
        <div className="relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
              1st Prize
            </span>
          </div>
          <div className="bg-white border-2 border-orange-300 rounded-2xl p-8 pt-12 text-center transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl">
            <div className="text-6xl mb-4">🥇</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">₹7,000</h2>
            <div className="text-5xl mb-4 text-orange-500">💰</div>
            <p className="text-gray-700 mb-6 font-medium">Cash Prize + Trophy + Certificates</p>
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">And exclusive internship opportunities</p>
            </div>
          </div>
        </div>

        {/* Second Prize */}
        <div className="relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-gradient-to-r from-orange-400 to-amber-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
              2nd Prize
            </span>
          </div>
          <div className="bg-white border-2 border-amber-300 rounded-2xl p-8 pt-12 text-center transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl">
            <div className="text-6xl mb-4">🥈</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">₹5,000</h2>
            <div className="text-5xl mb-4 text-amber-500">💰</div>
            <p className="text-gray-700 mb-6 font-medium">Cash Prize + Trophy + Certificates</p>
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Plus swag pack and goodies</p>
            </div>
          </div>
        </div>

        {/* Third Prize */}
        <div className="relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
              3rd Prize
            </span>
          </div>
          <div className="bg-white border-2 border-yellow-300 rounded-2xl p-8 pt-12 text-center transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl">
            <div className="text-6xl mb-4">🥉</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">₹3,000</h2>
            <div className="text-5xl mb-4 text-yellow-500">💰</div>
            <p className="text-gray-700 mb-6 font-medium">Cash Prize + Trophy + Certificates</p>
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">And certificate of excellence</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 mb-12 border border-orange-100">
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">✨ Additional Perks for All Participants</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white rounded-lg border border-orange-100">
            <div className="text-3xl mb-2">📜</div>
            <p className="text-gray-700 font-medium">Participation Certificates</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-orange-100">
            <div className="text-3xl mb-2">🎁</div>
            <p className="text-gray-700 font-medium">Swag Kits</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-orange-100">
            <div className="text-3xl mb-2">🍕</div>
            <p className="text-gray-700 font-medium">Food & Beverages</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-orange-100">
            <div className="text-3xl mb-2">🤝</div>
            <p className="text-gray-700 font-medium">Networking Opportunities</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link to="/" className="inline-block bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg">
          ← Back to Registration
        </Link>
      </div>
    </div>
  );
}

export default App;