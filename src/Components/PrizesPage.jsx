import React from 'react';
import { Link } from 'react-router-dom';

const PrizesPage = () => {
  return (
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
              <Link to="/prizes" className="hover:text-orange-200 transition-colors px-3 py-2 rounded-lg hover:bg-white/10 font-semibold">
                Prizes
              </Link>
            </div>
          </div>
        </div>
      </nav>

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
    </div>
  );
};

export default PrizesPage;