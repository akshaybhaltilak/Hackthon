import React from 'react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-950 via-black to-gray-950 text-white py-12 border-t border-orange-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Event Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-black font-bold text-xl">V</span>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                  VIKRAMA CODE CARNIVAL
                </h3>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-amber-300 font-medium">सृजनं विजयते</span>
                  <span className="text-xs text-gray-400 ml-2">(Creativity Always Wins)</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Maharashtra's premier state-level coding event bringing together the brightest minds 
              to innovate, create, and solve real-world challenges through technology.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:contact@vikramacode.com" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-orange-600 hover:to-amber-500 rounded-full flex items-center justify-center transition-all duration-300 group">
                <span className="text-gray-300 group-hover:text-white transition-colors">📧</span>
              </a>
              <a href="tel:+919876543210" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-orange-600 hover:to-amber-500 rounded-full flex items-center justify-center transition-all duration-300 group">
                <span className="text-gray-300 group-hover:text-white transition-colors">📱</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-orange-600 hover:to-amber-500 rounded-full flex items-center justify-center transition-all duration-300 group">
                <span className="text-gray-300 group-hover:text-white transition-colors">🌐</span>
              </a>
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center">
              <span className="w-3 h-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mr-3"></span>
              Event Highlights
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300">
                <span className="text-orange-400 text-xl mt-1">📅</span>
                <div>
                  <p className="text-gray-400 text-sm">Date</p>
                  <p className="text-white font-medium">3rd February 2026</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300">
                <span className="text-orange-400 text-xl mt-1">⏰</span>
                <div>
                  <p className="text-gray-400 text-sm">Duration</p>
                  <p className="text-white font-medium">8 Hours (9 AM - 5 PM)</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300">
                <span className="text-orange-400 text-xl mt-1">📍</span>
                <div>
                  <p className="text-gray-400 text-sm">Venue</p>
                  <p className="text-white font-medium">Shivaji College, Akola</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links & Contact */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center">
              <span className="w-3 h-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mr-3"></span>
              Quick Links
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300 group">
                <span className="text-orange-400 text-xl">🏠</span>
                <div>
                  <p className="text-gray-400 text-sm">Home</p>
                  <a href="/" className="text-white hover:text-orange-400 transition-colors">
                    Event Homepage
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300 group">
                <span className="text-orange-400 text-xl">🚀</span>
                <div>
                  <p className="text-gray-400 text-sm">Register</p>
                  <a href="/register" className="text-white hover:text-orange-400 transition-colors">
                    Team Registration
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300 group">
                <span className="text-orange-400 text-xl">🏆</span>
                <div>
                  <p className="text-gray-400 text-sm">Prizes</p>
                  <a href="/prizes" className="text-white hover:text-orange-400 transition-colors">
                    Prize Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Organizers Section */}
        <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-xl p-6 border border-orange-500/20 mb-8">
          <h3 className="text-lg font-bold text-white mb-4 text-center">Organized By</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-orange-500/10">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold">WR</span>
              </div>
              <div>
                <h4 className="font-semibold text-white">WebReich Solutions</h4>
                <p className="text-sm text-gray-400">Technology Partner</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-orange-500/10">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <span className="text-gray-800 font-bold">SC</span>
              </div>
              <div>
                <h4 className="font-semibold text-white">Shivaji College, Akola</h4>
                <p className="text-sm text-gray-400">Academic Partner</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-orange-500/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                © 2026 VIKRAMA CODE CARNIVAL. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm mt-1">
                सृजनं विजयते - Creativity Always Wins
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm hover:underline">
                Terms & Conditions
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm hover:underline">
                Code of Conduct
              </a>
            </div>
          </div>
          
          {/* Mobile Only - Quick Action Links */}
          <div className="mt-8 md:hidden">
            <div className="flex justify-center space-x-8">
              <a href="tel:+919876543210" className="text-gray-500 hover:text-orange-400 transition-colors group">
                <span className="block text-center">
                  <span className="text-xl group-hover:scale-110 transition-transform">📞</span>
                  <span className="block text-xs mt-1">Call Us</span>
                </span>
              </a>
              <a href="/register" className="text-gray-500 hover:text-orange-400 transition-colors group">
                <span className="block text-center">
                  <span className="text-xl group-hover:scale-110 transition-transform">🚀</span>
                  <span className="block text-xs mt-1">Register</span>
                </span>
              </a>
              <button onClick={scrollToTop} className="text-gray-500 hover:text-orange-400 transition-colors group">
                <span className="block text-center">
                  <span className="text-xl group-hover:scale-110 transition-transform">⬆️</span>
                  <span className="block text-xs mt-1">Top</span>
                </span>
              </button>
              <a href="mailto:contact@vikramacode.com" className="text-gray-500 hover:text-orange-400 transition-colors group">
                <span className="block text-center">
                  <span className="text-xl group-hover:scale-110 transition-transform">📧</span>
                  <span className="block text-xs mt-1">Email</span>
                </span>
              </a>
            </div>
          </div>
          
          {/* Back to Top Button */}
          <div className="text-center mt-8">
            <button 
              onClick={scrollToTop}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-orange-600 hover:to-amber-500 text-white rounded-full text-sm font-medium transition-all duration-300 border border-orange-500/20 hover:border-transparent transform hover:-translate-y-0.5 group"
            >
              <span className="group-hover:animate-bounce">↑</span>
              <span>Back to Top</span>
            </button>
            <p className="text-gray-500 text-xs mt-4">
              "सृजनं विजयते" - Where innovation meets opportunity
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;