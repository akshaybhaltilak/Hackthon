import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-12 border-t border-orange-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-black font-bold text-xl">WR</span>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                  WebReich Solutions
                </h3>
                <p className="text-sm text-gray-400">Innovating the Future</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Organizing innovative hackathons to foster creativity and technical excellence 
              among aspiring developers and problem solvers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-orange-600 hover:to-amber-500 rounded-full flex items-center justify-center transition-all duration-300">
                <span className="text-gray-300 hover:text-white">📧</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-orange-600 hover:to-amber-500 rounded-full flex items-center justify-center transition-all duration-300">
                <span className="text-gray-300 hover:text-white">📱</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-orange-600 hover:to-amber-500 rounded-full flex items-center justify-center transition-all duration-300">
                <span className="text-gray-300 hover:text-white">🌐</span>
              </a>
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center">
              <span className="w-3 h-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mr-3"></span>
              Event Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-orange-500/10">
                <span className="text-orange-400 text-xl mt-1">📅</span>
                <div>
                  <p className="text-gray-400 text-sm">Date</p>
                  <p className="text-white font-medium">3rd February 2026</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-orange-500/10">
                <span className="text-orange-400 text-xl mt-1">⏰</span>
                <div>
                  <p className="text-gray-400 text-sm">Duration</p>
                  <p className="text-white font-medium">12 Hours (9 AM - 9 PM)</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-orange-500/10">
                <span className="text-orange-400 text-xl mt-1">📍</span>
                <div>
                  <p className="text-gray-400 text-sm">Venue</p>
                  <p className="text-white font-medium">Shivaji College, Akola</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center">
              <span className="w-3 h-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mr-3"></span>
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300">
                <span className="text-orange-400 text-xl">📧</span>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a href="mailto:hackathon@webreich.com" className="text-white hover:text-orange-400 transition-colors">
                    hackathon@webreich.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300">
                <span className="text-orange-400 text-xl">📞</span>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <a href="tel:+919876543210" className="text-white hover:text-orange-400 transition-colors">
                    +91 9876543210
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300">
                <span className="text-orange-400 text-xl">🌐</span>
                <div>
                  <p className="text-gray-400 text-sm">Website</p>
                  <a href="https://www.webreich.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-400 transition-colors">
                    www.webreich.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-orange-500/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                © 2026 WebReich Solutions. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm mt-1">
                In association with Shivaji College of Art and Science, Akola
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                Terms & Conditions
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                Code of Conduct
              </a>
            </div>
          </div>
          
          {/* Mobile Only - Quick Links */}
          <div className="mt-8 md:hidden">
            <div className="flex justify-center space-x-8">
              <a href="#" className="text-gray-500 hover:text-orange-400 transition-colors">
                <span className="block text-center">
                  <span className="text-xl">📱</span>
                  <span className="block text-xs mt-1">App</span>
                </span>
              </a>
              <a href="#" className="text-gray-500 hover:text-orange-400 transition-colors">
                <span className="block text-center">
                  <span className="text-xl">📰</span>
                  <span className="block text-xs mt-1">Blog</span>
                </span>
              </a>
              <a href="#" className="text-gray-500 hover:text-orange-400 transition-colors">
                <span className="block text-center">
                  <span className="text-xl">👥</span>
                  <span className="block text-xs mt-1">Community</span>
                </span>
              </a>
              <a href="#" className="text-gray-500 hover:text-orange-400 transition-colors">
                <span className="block text-center">
                  <span className="text-xl">📋</span>
                  <span className="block text-xs mt-1">FAQs</span>
                </span>
              </a>
            </div>
          </div>
          
          {/* Back to Top Button */}
          <div className="text-center mt-8">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-orange-600 hover:to-amber-500 text-white rounded-full text-sm font-medium transition-all duration-300 border border-orange-500/20 hover:border-transparent"
            >
              <span>↑</span>
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;