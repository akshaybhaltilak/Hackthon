import React, { useState } from 'react';
import Navbar from './Navbar';
import RegistrationForm from './RegistrationForm';
import Footer from './Footer';

const Home = ({ setShowAdminLogin }) => {
  const [activeSection, setActiveSection] = useState('registration');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Navigation Bar */}
      <Navbar 
        setShowAdminLogin={setShowAdminLogin} 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">WebReich Solutions Hackathon 2026</h1>
            <p className="text-xl mb-8 opacity-90">In association with Shivaji College of Art and Science, Akola</p>
            
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              <div className="text-center bg-white/20 backdrop-blur-sm p-6 rounded-xl min-w-[140px] transform hover:scale-105 transition-transform">
                <div className="text-4xl font-bold">₹7000</div>
                <div className="text-sm opacity-90 mt-2">First Prize</div>
              </div>
              <div className="text-center bg-white/20 backdrop-blur-sm p-6 rounded-xl min-w-[140px] transform hover:scale-105 transition-transform">
                <div className="text-4xl font-bold">₹5000</div>
                <div className="text-sm opacity-90 mt-2">Second Prize</div>
              </div>
              <div className="text-center bg-white/20 backdrop-blur-sm p-6 rounded-xl min-w-[140px] transform hover:scale-105 transition-transform">
                <div className="text-4xl font-bold">₹3000</div>
                <div className="text-sm opacity-90 mt-2">Third Prize</div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/30">
              <div className="flex flex-wrap justify-center gap-6 text-lg">
                <span className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                  <span className="mr-2">📅</span> 3rd February 2026
                </span>
                <span className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                  <span className="mr-2">⏰</span> 9:00 AM - 9:00 PM
                </span>
                <span className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                  <span className="mr-2">📍</span> 12 Hours Duration
                </span>
                <span className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                  <span className="mr-2">🏆</span> Team Size: 2-4
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mt-8 mb-12">
          <div className="bg-white rounded-full shadow-lg p-2 flex space-x-2">
            <button
              onClick={() => setActiveSection('registration')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeSection === 'registration' ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md' : 'text-gray-700 hover:text-orange-600'}`}
            >
              Register Now
            </button>
            <button
              onClick={() => setActiveSection('about')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeSection === 'about' ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md' : 'text-gray-700 hover:text-orange-600'}`}
            >
              About Event
            </button>
            <button
              onClick={() => setActiveSection('prizes')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeSection === 'prizes' ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md' : 'text-gray-700 hover:text-orange-600'}`}
            >
              Prizes & Perks
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Registration Section */}
        {activeSection === 'registration' && (
          <div className="mb-16 animate-fade-in">
            <div className="flex items-center mb-8">
              <div className="w-2 h-12 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-gray-900">Register Your Team</h2>
            </div>
            <RegistrationForm />
          </div>
        )}

        {/* About Section */}
        {activeSection === 'about' && (
          <div className="mb-16 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-orange-100">
              <div className="flex items-center mb-8">
                <div className="w-2 h-12 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full mr-4"></div>
                <h2 className="text-3xl font-bold text-gray-900">About the Hackathon</h2>
              </div>
              
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-8 rounded-xl border-l-4 border-orange-500">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">🚀 Event Overview</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Join us for an exhilarating 12-hour hackathon organized by WebReich Solutions in collaboration 
                    with Shivaji College of Art and Science, Akola. This event brings together the brightest minds 
                    to solve real-world problems through innovative technology solutions.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-xl border-l-4 border-amber-500">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">🎯 Theme & Focus</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    While participants are free to work on any project of their choice, we encourage solutions 
                    that address local community challenges, educational technology, healthcare innovations, 
                    sustainable development, and digital transformation.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-8 rounded-xl border border-orange-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="w-2 h-8 bg-orange-500 rounded-full mr-4"></span>
                      📋 Rules & Guidelines
                    </h3>
                    <ul className="text-gray-700 space-y-4">
                      <li className="flex items-start">
                        <span className="text-orange-500 text-2xl mr-3">•</span>
                        <span><strong>Team size:</strong> 2-4 members (including captain)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 text-2xl mr-3">•</span>
                        <span><strong>Code policy:</strong> All code must be written during the event</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 text-2xl mr-3">•</span>
                        <span><strong>Libraries:</strong> Open source libraries allowed</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 text-2xl mr-3">•</span>
                        <span><strong>Internet:</strong> High-speed internet access provided</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 text-2xl mr-3">•</span>
                        <span><strong>Refreshments:</strong> Food and beverages provided</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-xl border border-amber-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="w-2 h-8 bg-amber-500 rounded-full mr-4"></span>
                      👥 Judging Criteria
                    </h3>
                    <ul className="text-gray-700 space-y-4">
                      <li className="flex items-start">
                        <span className="text-amber-500 text-2xl mr-3">•</span>
                        <span><strong>Innovation & Creativity:</strong> 30%</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 text-2xl mr-3">•</span>
                        <span><strong>Technical Implementation:</strong> 30%</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 text-2xl mr-3">•</span>
                        <span><strong>Practicality & Impact:</strong> 20%</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 text-2xl mr-3">•</span>
                        <span><strong>Presentation & Demo:</strong> 20%</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="text-center pt-8">
                  <button
                    onClick={() => setActiveSection('registration')}
                    className="inline-block bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                  >
                    Register Now →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Prizes Section */}
        {activeSection === 'prizes' && (
          <div className="mb-16 animate-fade-in">
            <div className="flex items-center mb-8">
              <div className="w-2 h-12 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-gray-900">Prizes & Rewards</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* First Prize */}
              <div className="relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                    1st Prize
                  </span>
                </div>
                <div className="bg-white border-2 border-orange-300 rounded-2xl p-8 pt-12 text-center transform hover:scale-105 transition-transform duration-300 shadow-xl hover:shadow-2xl h-full">
                  <div className="text-7xl mb-6">🥇</div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">₹7,000</h2>
                  <div className="text-6xl mb-6 text-orange-500">💰</div>
                  <p className="text-gray-700 mb-6 font-medium text-lg">Cash Prize + Trophy + Certificates</p>
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg">
                    <p className="text-gray-600">And exclusive internship opportunities</p>
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
                <div className="bg-white border-2 border-amber-300 rounded-2xl p-8 pt-12 text-center transform hover:scale-105 transition-transform duration-300 shadow-xl hover:shadow-2xl h-full">
                  <div className="text-7xl mb-6">🥈</div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">₹5,000</h2>
                  <div className="text-6xl mb-6 text-amber-500">💰</div>
                  <p className="text-gray-700 mb-6 font-medium text-lg">Cash Prize + Trophy + Certificates</p>
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg">
                    <p className="text-gray-600">Plus swag pack and goodies</p>
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
                <div className="bg-white border-2 border-yellow-300 rounded-2xl p-8 pt-12 text-center transform hover:scale-105 transition-transform duration-300 shadow-xl hover:shadow-2xl h-full">
                  <div className="text-7xl mb-6">🥉</div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">₹3,000</h2>
                  <div className="text-6xl mb-6 text-yellow-500">💰</div>
                  <p className="text-gray-700 mb-6 font-medium text-lg">Cash Prize + Trophy + Certificates</p>
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg">
                    <p className="text-gray-600">And certificate of excellence</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 mb-12 border border-orange-100">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">✨ Additional Perks for All Participants</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-white rounded-xl border border-orange-100 transform hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-4xl mb-4">📜</div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Participation Certificates</h4>
                  <p className="text-gray-600">For all registered participants</p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl border border-orange-100 transform hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-4xl mb-4">🎁</div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Swag Kits</h4>
                  <p className="text-gray-600">Exclusive hackathon merchandise</p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl border border-orange-100 transform hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-4xl mb-4">🍕</div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Food & Beverages</h4>
                  <p className="text-gray-600">Complimentary meals and snacks</p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl border border-orange-100 transform hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-4xl mb-4">🤝</div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Networking</h4>
                  <p className="text-gray-600">Connect with industry professionals</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setActiveSection('registration')}
                className="inline-block bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
              >
                Register Now →
              </button>
            </div>
          </div>
        )}

        {/* Event Highlights Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-2 h-12 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-gray-900">Event Highlights</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white p-8 rounded-2xl shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3">12 Hours of Coding</h3>
              <p className="opacity-90">Intense coding session from 9 AM to 9 PM with expert mentorship</p>
            </div>
            <div className="bg-gradient-to-br from-orange-600 to-amber-700 text-white p-8 rounded-2xl shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl mb-4">👨‍💻</div>
              <h3 className="text-xl font-bold mb-3">Expert Mentors</h3>
              <p className="opacity-90">Guidance from industry professionals and experienced developers</p>
            </div>
            <div className="bg-gradient-to-br from-orange-700 to-amber-800 text-white p-8 rounded-2xl shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-3">Winning Opportunities</h3>
              <p className="opacity-90">Cash prizes, trophies, certificates, and internship opportunities</p>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-2 h-12 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-gray-900">Event Timeline</h2>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold mr-6 flex-shrink-0">
                  9:00 AM
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Opening Ceremony & Registration</h3>
                  <p className="text-gray-600">Welcome note, rules briefing, and team registration confirmation</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold mr-6 flex-shrink-0">
                  10:00 AM
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Hackathon Begins</h3>
                  <p className="text-gray-600">Coding starts! Teams begin working on their projects</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold mr-6 flex-shrink-0">
                  1:00 PM
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Lunch Break</h3>
                  <p className="text-gray-600">Networking lunch with fellow participants and mentors</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold mr-6 flex-shrink-0">
                  7:00 PM
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Project Submission Deadline</h3>
                  <p className="text-gray-600">Final submissions must be completed</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold mr-6 flex-shrink-0">
                  8:00 PM
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Final Presentations & Judging</h3>
                  <p className="text-gray-600">Teams present their projects to the judging panel</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold mr-6 flex-shrink-0">
                  9:00 PM
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Award Ceremony & Closing</h3>
                  <p className="text-gray-600">Winner announcement and closing remarks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;