import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-black border-b border-orange-500/30 text-white shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <div className="absolute -inset-1 opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative w-12 h-12  flex items-center justify-center ">
               <img src="https://webreich.vercel.app/logo.png" alt="logo" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                VIKRAMA CODE
CARNIVAL 2026
              </h1>
              <p className="text-xs text-gray-400">सृजनं विजयते</p>
            </div>
          </div>

          {/* Desktop Info */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2 rounded-full border border-orange-500/20">
                <span className="text-orange-400 mr-2">📅</span>
                <span className="text-white text-sm font-medium">3rd Feb 2026</span>
              </div>
              
              <div className="flex items-center bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2 rounded-full border border-orange-500/20">
                <span className="text-orange-400 mr-2">⏰</span>
                <span className="text-white text-sm font-medium">8 Hours</span>
              </div>
              
              <div className="flex items-center bg-gradient-to-r from-orange-600 to-amber-500 px-4 py-2 rounded-full shadow-lg">
                <span className="mr-2">🏆</span>
                <span className="text-white text-sm font-bold">₹15,000+ Prizes</span>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 border border-orange-500/20 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="pt-4 pb-6 border-t border-orange-500/20">
              <div className="space-y-4">
                {/* Event Info Cards */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-4 border border-orange-500/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-orange-400 mr-3">📅</span>
                      <div>
                        <p className="text-sm text-gray-400">Date</p>
                        <p className="text-white font-medium">3rd February 2026</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-4 border border-orange-500/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-orange-400 mr-3">⏰</span>
                      <div>
                        <p className="text-sm text-gray-400">Time</p>
                        <p className="text-white font-medium">9:00 AM - 9:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-600 to-amber-500 rounded-xl p-4 shadow-lg">
                  <div className="flex items-center">
                    <span className="text-white text-2xl mr-3">🏆</span>
                    <div>
                      <p className="text-sm text-orange-100">Total Prize Pool</p>
                      <p className="text-white font-bold text-lg">₹15,000+</p>
                    </div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-4 border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-2 text-sm">Quick Info</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="text-gray-400 w-32">Duration:</span>
                      <span className="text-white">12 Hours</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-gray-400 w-32">Team Size:</span>
                      <span className="text-white">2-4 Members</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-gray-400 w-32">Venue:</span>
                      <span className="text-white">Shivaji College</span>
                    </div>
                  </div>
                </div>

                {/* Mobile Logo Info */}
                <div className="flex items-center justify-center pt-4 border-t border-orange-500/20">
                  <div className="text-center">
                    <h2 className="text-lg font-bold text-orange-400">WebReich Solutions</h2>
                    <p className="text-gray-400 text-sm">Hackathon 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;