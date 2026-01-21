import React, { useState } from 'react';
import Navbar from './Navbar';
import RegistrationForm from './RegistrationForm';
import Footer from './Footer';

const Home = ({ setShowAdminLogin }) => {
  const [activeSection, setActiveSection] = useState('registration');

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
     <div className="relative overflow-hidden">
  {/* Background Image and Gradients */}
  <div className="absolute inset-0">
    {/* Background Image */}
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      <div className="absolute inset-0 "></div>
    </div>
    
    {/* Decorative Elements */}
    <div className="absolute top-0 left-0 w-full h-full">
      {/* Animated Background Pattern */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-orange-500 to-transparent rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-amber-500 to-transparent rounded-full blur-3xl opacity-20 animate-pulse animation-delay-1000"></div>
    </div>
  </div>
  
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
    <div className="text-center">
      {/* Logo with Image Background */}
      <div className="relative inline-block mb-8 group">
        <div className="absolute -inset-4 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-400 rounded-full blur-xl opacity-70 group-hover:opacity-90 transition duration-500"></div>
        <div className="relative w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-black to-gray-900 rounded-full flex items-center justify-center shadow-2xl border-4 border-orange-500/50 overflow-hidden">
          {/* Logo Image with Fallback */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-amber-500 opacity-20"></div>
          <img 
            src="https://webreich.vercel.app/logo.png" 
            alt="WebReich Logo"
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'block';
            }}
          />
          <span className="text-3xl md:text-4xl font-bold text-orange-500 hidden">WR</span>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-400 to-amber-300 rounded-full animate-bounce"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-300 rounded-full animate-bounce animation-delay-300"></div>
      </div>
      
      {/* Main Title */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white tracking-tight">
        <span className="bg-gradient-to-r from-white via-orange-100 to-amber-100 bg-clip-text text-transparent">
          WebReich Solutions
        </span>
        <br />
        <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
          Hackathon 2026
        </span>
      </h1>
      
      {/* Subtitle with College Logo */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
        <p className="text-xl md:text-2xl text-orange-100 font-medium">
          In association with
        </p>
        <div className="flex items-center space-x-3 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-500/30">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2784/2784459.png" 
              alt="College Logo"
              className="w-6 h-6 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'block';
              }}
            />
            <span className="text-black text-xs font-bold hidden">SC</span>
          </div>
          <span className="text-white font-semibold">Shivaji College, Akola</span>
        </div>
      </div>
      
      {/* Prize Cards with Icons */}
      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {[
          { amount: "₹7,000", rank: "First Prize", icon: "🥇", gradient: "from-orange-600 to-amber-500" },
          { amount: "₹5,000", rank: "Second Prize", icon: "🥈", gradient: "from-orange-500 to-amber-400" },
          { amount: "₹3,000", rank: "Third Prize", icon: "🥉", gradient: "from-amber-500 to-orange-400" }
        ].map((prize, index) => (
          <div key={index} className="relative group">
            {/* Glow Effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${prize.gradient} rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-500`}></div>
            
            {/* Card */}
            <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm p-6 rounded-2xl transform group-hover:-translate-y-2 transition-all duration-300 border border-orange-500/30 min-w-[160px] md:min-w-[180px]">
              <div className="flex flex-col items-center">
                {/* Prize Icon */}
                <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {prize.icon}
                </div>
                
                {/* Prize Amount */}
                <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-orange-300 to-amber-200 bg-clip-text text-transparent">
                  {prize.amount}
                </div>
                
                {/* Prize Rank */}
                <div className="text-sm font-semibold text-orange-300">
                  {prize.rank}
                </div>
                
                {/* Decorative Line */}
                <div className={`w-16 h-1 bg-gradient-to-r ${prize.gradient} rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Event Details with Icons */}
      <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-orange-500/20 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: "📅", label: "3rd February 2026", bg: "from-orange-900/50 to-orange-800/30" },
            { icon: "⏰", label: "9:00 AM - 9:00 PM", bg: "from-amber-900/50 to-amber-800/30" },
            { icon: "📍", label: "12 Hours Duration", bg: "from-orange-800/50 to-amber-800/30" },
            { icon: "👥", label: "Team Size: 2-4", bg: "from-amber-800/50 to-orange-800/30" }
          ].map((detail, index) => (
            <div 
              key={index}
              className={`flex items-center justify-center bg-gradient-to-r ${detail.bg} px-4 py-3 rounded-xl border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 hover:scale-105 cursor-default`}
            >
              <span className="text-2xl mr-3 text-orange-300">{detail.icon}</span>
              <span className="text-white font-medium text-sm md:text-base">{detail.label}</span>
            </div>
          ))}
        </div>
        
        {/* Additional Info Banner */}
        <div className="mt-6 pt-4 border-t border-orange-500/20">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
                alt="Participants Icon"
                className="w-6 h-6 mr-2"
              />
              <span className="text-orange-200 text-sm">Expected Participants: 200+</span>
            </div>
            <div className="hidden md:block text-orange-500">•</div>
            <div className="hidden md:flex items-center">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/2917/2917995.png" 
                alt="Mentors Icon"
                className="w-6 h-6 mr-2"
              />
              <span className="text-orange-200 text-sm">Expert Mentors: 20+</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Decorative Elements */}
      <div className="absolute top-10 right-10 w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full animate-bounce hidden lg:block"></div>
      <div className="absolute bottom-10 left-10 w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full animate-bounce animation-delay-500 hidden lg:block"></div>
    </div>
  </div>
</div>
      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-12 relative z-10">
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl shadow-2xl border border-orange-500/20 p-2">
          <div className="flex flex-col sm:flex-row justify-center gap-2">
            <button
              onClick={() => setActiveSection('registration')}
              className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex-1 sm:flex-none ${
                activeSection === 'registration' 
                  ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-lg' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className="flex items-center justify-center">
                <span className="mr-2">📝</span>
                Register Now
              </span>
            </button>
            <button
              onClick={() => setActiveSection('about')}
              className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex-1 sm:flex-none ${
                activeSection === 'about' 
                  ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-lg' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className="flex items-center justify-center">
                <span className="mr-2">ℹ️</span>
                About Event
              </span>
            </button>
            <button
              onClick={() => setActiveSection('prizes')}
              className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex-1 sm:flex-none ${
                activeSection === 'prizes' 
                  ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-lg' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className="flex items-center justify-center">
                <span className="mr-2">🏆</span>
                Prizes & Perks
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Registration Section */}
        {activeSection === 'registration' && (
          <div className="mb-16 animate-fade-in">
            <div className="flex items-center mb-8">
              <div className="w-2 h-12 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-white">Register Your Team</h2>
            </div>
            <RegistrationForm />
          </div>
        )}

        {/* About Section */}
        {activeSection === 'about' && (
          <div className="mb-16 animate-fade-in">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-6 md:p-8 border border-orange-500/20">
              <div className="flex items-center mb-8">
                <div className="w-2 h-12 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full mr-4"></div>
                <h2 className="text-3xl font-bold text-white">About the Hackathon</h2>
              </div>
              
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 md:p-8 rounded-2xl border-l-4 border-orange-500">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-xl">🚀</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Event Overview</h3>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Join us for an exhilarating 12-hour hackathon organized by WebReich Solutions in collaboration 
                    with Shivaji College of Art and Science, Akola. This event brings together the brightest minds 
                    to solve real-world problems through innovative technology solutions.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 md:p-8 rounded-2xl border-l-4 border-amber-500">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-xl">🎯</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Theme & Focus</h3>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    While participants are free to work on any project of their choice, we encourage solutions 
                    that address local community challenges, educational technology, healthcare innovations, 
                    sustainable development, and digital transformation.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-gray-900 to-black p-6 md:p-8 rounded-2xl border border-orange-500/30">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-xl">📋</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">Rules & Guidelines</h3>
                    </div>
                    <ul className="text-gray-300 space-y-4">
                      {[
                        "Team size: 2-4 members (including captain)",
                        "All code must be written during the event",
                        "Open source libraries allowed",
                        "High-speed internet access provided",
                        "Food and beverages provided"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-orange-500 mr-3">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-gray-900 to-black p-6 md:p-8 rounded-2xl border border-amber-500/30">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-amber-500 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-xl">👥</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">Judging Criteria</h3>
                    </div>
                    <ul className="text-gray-300 space-y-4">
                      {[
                        "Innovation & Creativity: 30%",
                        "Technical Implementation: 30%",
                        "Practicality & Impact: 20%",
                        "Presentation & Demo: 20%"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-amber-500 mr-3">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="text-center pt-8">
                  <button
                    onClick={() => setActiveSection('registration')}
                    className="bg-gradient-to-r from-orange-600 to-amber-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-700 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg transform hover:-translate-y-1"
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
              <h2 className="text-3xl font-bold text-white">Prizes & Rewards</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { rank: "1st", prize: "₹7,000", color: "from-orange-600 to-amber-500", icon: "🥇", extra: "And exclusive internship opportunities" },
                { rank: "2nd", prize: "₹5,000", color: "from-orange-500 to-amber-400", icon: "🥈", extra: "Plus swag pack and goodies" },
                { rank: "3rd", prize: "₹3,000", color: "from-amber-500 to-orange-400", icon: "🥉", extra: "And certificate of excellence" }
              ].map((item, index) => (
                <div key={index} className="relative group">
                  <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-300`}></div>
                  <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-orange-500/30 transform group-hover:-translate-y-2 transition-all duration-300 h-full">
                    <div className="text-center">
                      <div className="text-6xl mb-4">{item.icon}</div>
                      <div className={`inline-block bg-gradient-to-r ${item.color} text-white px-6 py-2 rounded-full font-bold text-lg mb-4`}>
                        {item.rank} Prize
                      </div>
                      <h3 className="text-4xl font-bold text-white mb-4">{item.prize}</h3>
                      <p className="text-gray-300 mb-6 font-medium">Cash Prize + Trophy + Certificates</p>
                      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-xl">
                        <p className="text-gray-400 text-sm">{item.extra}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 md:p-8 mb-12 border border-orange-500/20">
              <h3 className="text-2xl font-bold text-center text-white mb-8">✨ Additional Perks for All Participants</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: "📜", title: "Certificates", desc: "Participation certificates" },
                  { icon: "🎁", title: "Swag Kits", desc: "Exclusive merchandise" },
                  { icon: "🍕", title: "Food", desc: "Complimentary meals" },
                  { icon: "🤝", title: "Networking", desc: "Industry connections" }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-800/50 p-6 rounded-xl border border-orange-500/10 transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="text-3xl mb-3 text-center text-orange-400">{item.icon}</div>
                    <h4 className="text-lg font-bold text-white text-center mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-sm text-center">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setActiveSection('registration')}
                className="bg-gradient-to-r from-orange-600 to-amber-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-700 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg transform hover:-translate-y-1"
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
            <h2 className="text-3xl font-bold text-white">Event Highlights</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🚀", title: "12 Hours of Coding", desc: "Intense coding session with expert mentorship", color: "from-orange-600 to-amber-500" },
              { icon: "👨‍💻", title: "Expert Mentors", desc: "Guidance from industry professionals", color: "from-orange-500 to-amber-400" },
              { icon: "🏆", title: "Winning Opportunities", desc: "Cash prizes and internship opportunities", color: "from-amber-500 to-orange-400" }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300`}></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-orange-500/30 transform group-hover:-translate-y-2 transition-all duration-300">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
     
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;