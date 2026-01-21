import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Home = () => {
  const [activeSection, setActiveSection] = useState('registration');
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Navigation tabs data
  const navTabs = [
    { id: 'registration', label: 'Registration', icon: '📋', color: 'from-orange-500 to-amber-500' },
    { id: 'overview', label: 'Overview', icon: '👁️', color: 'from-blue-500 to-cyan-500' },
    { id: 'problem-statements', label: 'Problem Statements', icon: '💡', color: 'from-green-500 to-emerald-500' },
    { id: 'prizes', label: 'Prizes', icon: '🏆', color: 'from-yellow-500 to-amber-500' },
    { id: 'rules', label: 'Rules', icon: '📜', color: 'from-purple-500 to-pink-500' },
    { id: 'about', label: 'About', icon: '🏢', color: 'from-red-500 to-orange-500' },
  ];

  const sections = {
    registration: {
      title: "Team Registration",
      subtitle: "Secure your spot in Maharashtra's premier coding event",
      content: (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto mb-8">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
              <span className="text-6xl">📋</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Register?</h3>
            <p className="text-gray-300 mb-6">
              Click the button below to access our detailed registration form with team information, 
              member details, and project preferences.
            </p>
            <button
              onClick={() => navigate('/register')}
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg w-full"
            >
              Go to Registration Form
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
              <div className="text-orange-400 font-bold mb-1">Step 1</div>
              <div className="text-white">Fill Team Details</div>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
              <div className="text-amber-400 font-bold mb-1">Step 2</div>
              <div className="text-white">Add Member Information</div>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
              <div className="text-orange-300 font-bold mb-1">Step 3</div>
              <div className="text-white">Choose Problem Statement</div>
            </div>
          </div>
        </div>
      )
    },
    overview: {
      title: "Event Overview",
      subtitle: "Everything you need to know about VIKRAMA CODE CARNIVAL 2026",
      content: (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-6">Event Details</h3>
              <div className="space-y-6">
                {[
                  { icon: '📅', label: 'Date', value: '3 February 2026' },
                  { icon: '⏰', label: 'Duration', value: '8 Hours (9:00 AM - 5:00 PM)' },
                  { icon: '📍', label: 'Venue', value: 'Shivaji College Campus, Akola' },
                  { icon: '👥', label: 'Team Size', value: '2-4 Members' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-800/50 rounded-xl">
                    <div className="text-2xl mr-4">{item.icon}</div>
                    <div>
                      <div className="text-gray-400 text-sm">{item.label}</div>
                      <div className="text-white font-semibold">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-6">Eligibility</h3>
              <ul className="space-y-4">
                {[
                  'Engineering Students (All Branches)',
                  'MCA / BCA / BSc (Computer Science / IT) Students',
                  'Final Year & Pre-Final Year Students',
                  'Tech Enthusiasts from across Maharashtra',
                  'Cross-college teams allowed',
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-900 to-gray-950 rounded-2xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6">Why Participate?</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                'Enhance problem-solving skills',
                'Gain real-time development experience',
                'Learn collaboration under pressure',
                'Build portfolio-worthy projects',
                'Win exciting cash prizes & certificates',
                'Network with industry professionals',
              ].map((item, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-amber-500 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    'problem-statements': {
      title: "Problem Statements",
      subtitle: "Choose from these real-world challenges or bring your innovative idea",
      content: (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Smart City Solutions',
                description: 'Develop IoT-based systems for waste management, traffic control, or energy optimization in urban areas.',
                category: 'IoT & Smart Cities',
                icon: '🏙️'
              },
              {
                title: 'Education Technology',
                description: 'Create platforms for personalized learning, virtual labs, or skill gap analysis for students.',
                category: 'EdTech',
                icon: '📚'
              },
              {
                title: 'Healthcare Innovation',
                description: 'Build telemedicine platforms, health monitoring systems, or AI-powered diagnosis tools.',
                category: 'HealthTech',
                icon: '🏥'
              },
              {
                title: 'Agriculture Technology',
                description: 'Develop solutions for crop monitoring, yield prediction, or supply chain optimization.',
                category: 'AgriTech',
                icon: '🌾'
              },
              {
                title: 'Financial Inclusion',
                description: 'Create tools for digital banking, microfinance, or financial literacy for rural areas.',
                category: 'FinTech',
                icon: '💰'
              },
              {
                title: 'Sustainable Development',
                description: 'Build solutions for water conservation, renewable energy, or carbon footprint tracking.',
                category: 'Green Tech',
                icon: '🌱'
              },
            ].map((problem, index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-green-500/50 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 bg-gray-800 text-green-400 text-sm font-medium rounded-full">
                    {problem.category}
                  </span>
                  <span className="text-3xl">{problem.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{problem.title}</h3>
                <p className="text-gray-400">{problem.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="text-sm text-gray-500">Difficulty: <span className="text-yellow-400">Intermediate</span></div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-2xl p-8 border border-green-500/30">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Innovative Track</h3>
                <p className="text-gray-400">Bring your own groundbreaking idea</p>
              </div>
            </div>
            <p className="text-gray-300">
              Participants are encouraged to work on their own innovative ideas beyond the listed problem statements. 
              We welcome disruptive solutions that address emerging challenges in technology, society, or business.
            </p>
          </div>
        </div>
      )
    },
    prizes: {
      title: "Prize Pool & Rewards",
      subtitle: "Win exciting prizes and recognition",
      content: (
        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                rank: 'First Prize',
                amount: '₹7,000',
                gradient: 'from-orange-600 to-amber-500',
                perks: ['Cash Prize', 'Trophy', 'Certificates', 'Internship Opportunity'],
                icon: '🥇'
              },
              {
                rank: 'Second Prize',
                amount: '₹5,000',
                gradient: 'from-orange-500 to-amber-400',
                perks: ['Cash Prize', 'Trophy', 'Certificates', 'Swag Pack'],
                icon: '🥈'
              },
              {
                rank: 'Third Prize',
                amount: '₹3,000',
                gradient: 'from-amber-500 to-orange-400',
                perks: ['Cash Prize', 'Trophy', 'Certificates'],
                icon: '🥉'
              },
            ].map((prize, index) => (
              <div key={index} className="relative group">
                <div className={`absolute -inset-1 bg-gradient-to-r ${prize.gradient} rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity`}></div>
                <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-800">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-4">{prize.icon}</div>
                    <div className={`inline-block bg-gradient-to-r ${prize.gradient} text-white px-6 py-2 rounded-full font-bold text-lg mb-4`}>
                      {prize.rank}
                    </div>
                    <div className="text-5xl font-bold text-white mb-2">{prize.amount}</div>
                    <div className="text-gray-400">Cash Prize</div>
                  </div>
                  <ul className="space-y-3">
                    {prize.perks.map((perk, idx) => (
                      <li key={idx} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-300">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6">All Participants Receive</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: 'Certificate', desc: 'Participation Certificate', icon: '📜' },
                { title: 'Swag Kit', desc: 'Event Merchandise', icon: '🎁' },
                { title: 'Meals', desc: 'Complimentary Food', icon: '🍽️' },
                { title: 'Networking', desc: 'Industry Connections', icon: '🤝' },
              ].map((item, index) => (
                <div key={index} className="bg-gray-800/30 p-6 rounded-xl text-center hover:bg-gray-800/50 transition-colors">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <div className="font-semibold text-white mb-1">{item.title}</div>
                  <div className="text-sm text-gray-400">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    rules: {
      title: "Competition Rules & Guidelines",
      subtitle: "Important information for all participants",
      content: (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6">Competition Rules</h3>
            <ul className="space-y-4">
              {[
                'Team size must be between 2-4 members (including captain)',
                'All code must be written during the 8-hour hackathon duration',
                'Use of open-source libraries and APIs is allowed',
                'Teams must present their working solution to judges',
                'All team members must be present during the entire event',
                'Plagiarism will result in immediate disqualification',
              ].map((rule, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-gray-400 text-sm">{index + 1}</span>
                  </div>
                  <span className="text-gray-300">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6">Judging Criteria</h3>
            <div className="space-y-6">
              {[
                { criterion: 'Innovation & Creativity', weight: '30%' },
                { criterion: 'Technical Implementation', weight: '30%' },
                { criterion: 'Practicality & Real-World Impact', weight: '20%' },
                { criterion: 'Presentation & Demo', weight: '20%' },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 font-medium">{item.criterion}</span>
                    <span className="text-purple-400 font-bold">{item.weight}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-pink-500 h-2 rounded-full"
                      style={{ width: item.weight }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-gray-800/30 rounded-xl">
              <h4 className="text-white font-semibold mb-2">Additional Notes</h4>
              <p className="text-gray-400 text-sm">
                Judges' decisions are final. All projects will be evaluated based on completeness, 
                functionality, and adherence to the problem statement.
              </p>
            </div>
          </div>
        </div>
      )
    },
    about: {
      title: "About the Event",
      subtitle: "Learn more about VIKRAMA CODE CARNIVAL 2026 and its organizers",
      content: (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-500 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">WebReich Solutions</h3>
                  <p className="text-gray-400">Organizer</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                WebReich Solutions is a technology and innovation partner dedicated to empowering students 
                through practical learning, cutting-edge technology, and real-world problem-solving experiences.
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl">🏫</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Shivaji College, Akola</h3>
                  <p className="text-gray-400">Academic Partner</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Shivaji College of Arts, Commerce & Science, Akola is a premier educational institution 
                committed to academic excellence and holistic development of students.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-900 to-gray-950 rounded-2xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6">Hackathon Highlights</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800/30 p-6 rounded-xl hover:bg-gray-800/50 transition-colors">
                <div className="text-3xl text-orange-400 mb-4">🚀</div>
                <h4 className="text-lg font-semibold text-white mb-2">Real-World Challenges</h4>
                <p className="text-gray-400">Solve practical problems with technology solutions</p>
              </div>
              <div className="bg-gray-800/30 p-6 rounded-xl hover:bg-gray-800/50 transition-colors">
                <div className="text-3xl text-amber-400 mb-4">💻</div>
                <h4 className="text-lg font-semibold text-white mb-2">Skill Development</h4>
                <p className="text-gray-400">Enhance coding, teamwork and problem-solving skills</p>
              </div>
              <div className="bg-gray-800/30 p-6 rounded-xl hover:bg-gray-800/50 transition-colors">
                <div className="text-3xl text-orange-300 mb-4">🏆</div>
                <h4 className="text-lg font-semibold text-white mb-2">Competitive Environment</h4>
                <p className="text-gray-400">Test your skills against top talent from Maharashtra</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="min-h-screen">
      {/* Background with gradient and subtle pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 -z-10"></div>
      <div 
        className="fixed inset-0 -z-10 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>

      {/* Hero Section with background image */}
      <div 
        className="relative overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-950/90 py-16 md:py-24"
        style={{
          backgroundImage: `linear-gradient(rgba(3, 7, 18, 0.9), rgba(3, 7, 18, 0.9)), url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=2068&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Hackathon Badge */}
            <div className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full mb-6 animate-pulse">
              <span className="text-white font-semibold uppercase text-sm tracking-wider">
                State Level Hackathon
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-clip-text text-transparent animate-gradient">
                VIKRAMA CODE
              </span>
              <br />
              <span className="text-white">CARNIVAL 2026</span>
            </h1>

            {/* Tagline */}
            <p className="text-2xl md:text-3xl text-gray-300 font-light mb-8 italic">
              "Creativity Always Wins."
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
              {[
                { value: '8 HOURS', label: 'Non-Stop Coding Challenge', color: 'text-orange-400' },
                { value: 'STATE LEVEL', label: 'Maharashtra Participants', color: 'text-amber-400' },
                { value: 'OFFLINE', label: 'On-Campus Experience', color: 'text-orange-300' },
              ].map((metric, index) => (
                <div 
                  key={index} 
                  className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`text-3xl font-bold ${metric.color} mb-2`}>{metric.value}</div>
                  <p className="text-gray-400">{metric.label}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Register Now
              </button>
              <button
                onClick={() => setActiveSection('overview')}
                className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl border border-gray-700 hover:border-orange-500 transition-all duration-300 hover:bg-gray-800"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Vertical Navigation Tabs */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Vertical Tabs */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-800">
              <h3 className="text-white font-bold text-lg mb-4 px-2">Event Sections</h3>
              <div className="space-y-2">
                {navTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSection(tab.id)}
                    className={`w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 ${
                      activeSection === tab.id
                        ? 'bg-gradient-to-r from-gray-800 to-gray-900 border-l-4 border-orange-500'
                        : 'hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{tab.icon}</span>
                      <span className={`font-medium ${
                        activeSection === tab.id ? 'text-white' : 'text-gray-400'
                      }`}>
                        {tab.label}
                      </span>
                    </div>
                    {activeSection === tab.id && (
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${tab.color}`}></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Register Button in Sidebar */}
              <div className="mt-6 p-4 bg-gradient-to-r from-orange-900/20 to-amber-900/20 rounded-xl border border-orange-500/30">
                <h4 className="text-white font-semibold mb-2">Ready to Compete?</h4>
                <button
                  onClick={() => navigate('/register')}
                  className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-amber-600 transition-all duration-300"
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:w-3/4">
            {/* Section Header */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className={`w-1 h-12 bg-gradient-to-b ${navTabs.find(t => t.id === activeSection)?.color || 'from-orange-500 to-amber-500'} rounded-full mr-4`}></div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{sections[activeSection].title}</h2>
                  <p className="text-gray-400">{sections[activeSection].subtitle}</p>
                </div>
              </div>
            </div>

            {/* Section Content */}
            <div className={`animate-fade-in ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-500`}>
              {sections[activeSection].content}
            </div>

            {/* Call to Action at Bottom */}
            <div className="mt-12">
              <div className="bg-gradient-to-r from-orange-900/20 to-amber-900/20 rounded-2xl p-8 border border-orange-500/30">
                <h2 className="text-2xl font-bold text-white mb-4 text-center">Ready to Showcase Your Skills?</h2>
                <p className="text-gray-300 mb-6 text-center max-w-2xl mx-auto">
                  Join Maharashtra's premier coding competition and compete for exciting prizes, 
                  recognition, and career opportunities.
                </p>
                <div className="text-center">
                  <button
                    onClick={() => navigate('/register')}
                    className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
                  >
                    Register Your Team Now
                  </button>
                  <p className="text-gray-400 mt-4 text-sm">
                    Limited slots available • Registration closes on 31 January 2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Custom Styles for Animation */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;