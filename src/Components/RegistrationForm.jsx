import React, { useState, useEffect } from 'react';
import { database, ref, push, set } from '../firebase';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const RegistrationForm = () => {
  const [user, setUser] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [teamCaptain, setTeamCaptain] = useState({
    name: '',
    email: '',
    phone: '',
    college: 'Shivaji College of Art and Science, Akola',
    year: '',
    department: ''
  });
  const [members, setMembers] = useState([
    { name: '', email: '', phone: '', year: '', department: '' }
  ]);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setTeamCaptain(prev => ({
          ...prev,
          name: user.displayName || '',
          email: user.email || ''
        }));
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error('Google login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      resetForm();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleCaptainChange = (e) => {
    const { name, value } = e.target;
    setTeamCaptain(prev => ({ ...prev, [name]: value }));
  };

  const handleMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembers = [...members];
    updatedMembers[index][name] = value;
    setMembers(updatedMembers);
  };

  const addMember = () => {
    if (members.length < 3) {
      setMembers([...members, { name: '', email: '', phone: '', year: '', department: '' }]);
    }
  };

  const removeMember = (index) => {
    if (members.length > 1) {
      const updatedMembers = [...members];
      updatedMembers.splice(index, 1);
      setMembers(updatedMembers);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to register your team.');
      return;
    }

    setLoading(true);

    const registrationData = {
      teamName,
      teamCaptain: {
        ...teamCaptain,
        uid: user.uid
      },
      members: members.filter(member => member.name.trim() !== ''),
      projectTitle,
      projectDescription,
      registeredAt: new Date().toISOString(),
      teamSize: 1 + members.filter(member => member.name.trim() !== '').length,
      registeredBy: user.uid,
      eventName: 'VIKRAMA CODE CARNIVAL 2026'
    };

    try {
      const registrationsRef = ref(database, 'registrations');
      const newRegistrationRef = push(registrationsRef);
      await set(newRegistrationRef, registrationData);
      
      setSubmitted(true);
      resetForm();
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTeamName('');
    setTeamCaptain({
      name: user?.displayName || '',
      email: user?.email || '',
      phone: '',
      college: 'Shivaji College of Art and Science, Akola',
      year: '',
      department: ''
    });
    setMembers([{ name: '', email: '', phone: '', year: '', department: '' }]);
    setProjectTitle('');
    setProjectDescription('');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full blur-xl opacity-30"></div>
            <div className="relative animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto"></div>
          </div>
          <p className="mt-4 text-gray-400">Loading your experience...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Login Hero Section */}
          <div className="relative overflow-hidden rounded-3xl mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-orange-500/15 to-amber-600/20"></div>
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative p-8 md:p-12 text-center">
              <div className="inline-flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full flex items-center justify-center shadow-2xl">
                  <span className="text-3xl font-bold text-black">V</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Welcome to <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">VIKRAMA CODE CARNIVAL</span>
              </h1>
              <div className="mb-6">
                <div className="inline-flex items-center px-4 py-1 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full border border-orange-500/30">
                  <span className="text-amber-300 text-sm font-semibold">सृजनं विजयते</span>
                  <span className="text-gray-400 text-xs ml-2">(Creativity Always Wins)</span>
                </div>
              </div>
              <p className="text-lg text-gray-300 mb-8">
                Register your team to compete in Maharashtra's premier coding event
              </p>
            </div>
          </div>

          {/* Login Section */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl p-8 border border-orange-500/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full mb-4 shadow-xl">
                <span className="text-4xl text-black">🔐</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Welcome Innovator!</h2>
              <p className="text-gray-400">Login with Google to register your team</p>
            </div>

            <div className="space-y-6">
              <div className="flex justify-center">
                <button
                  onClick={handleGoogleLogin}
                  className="group relative w-full max-w-md"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-amber-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-gray-900 text-white px-8 py-4 rounded-xl border border-orange-500/30 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 w-full">
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-lg font-medium">Continue with Google</span>
                  </div>
                </button>
              </div>

              <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-orange-500/10">
                <h4 className="text-orange-400 font-semibold mb-3 flex items-center">
                  <span className="mr-2">ℹ️</span>
                  Why Google Login?
                </h4>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">✓</span>
                    <span>Auto-fill your details as team captain</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">✓</span>
                    <span>Secure registration with your account</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">✓</span>
                    <span>Receive updates about the event</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">✓</span>
                    <span>Easy access to your registration</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* User Info Bar */}
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl shadow-xl p-4 mb-8 flex justify-between items-center border border-orange-500/20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-black font-bold text-lg">
                  {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className="font-semibold text-white">{user.displayName || 'User'}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-gray-400 hover:text-orange-400 font-medium hover:bg-gray-800 rounded-lg transition-all duration-300 border border-gray-700 hover:border-orange-500/30"
            >
              Logout
            </button>
          </div>

          {/* Success Message */}
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-amber-500 rounded-3xl blur opacity-30"></div>
            <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 md:p-12 text-center rounded-3xl border border-orange-500/30">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full mb-6 shadow-2xl">
                <div className="text-black text-5xl animate-pulse">✓</div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Registration Successful!</h2>
              <div className="mb-6">
                <div className="inline-flex items-center px-4 py-1 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full border border-orange-500/30">
                  <span className="text-amber-300 text-sm font-semibold">सृजनं विजयते</span>
                  <span className="text-gray-400 text-xs ml-2">(Creativity Always Wins)</span>
                </div>
              </div>
              <p className="text-gray-300 mb-8 text-lg">
                Your team has been successfully registered for VIKRAMA CODE CARNIVAL 2026.
              </p>
              
              <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-l-4 border-orange-500 p-6 rounded-xl mb-8 text-left">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="bg-gradient-to-r from-orange-600 to-amber-500 p-2 rounded-lg mr-3">📌</span>
                  Important Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <p className="text-gray-300">
                      <span className="font-semibold text-orange-400">Event:</span><br/>
                      VIKRAMA CODE CARNIVAL 2026
                    </p>
                    <p className="text-gray-300">
                      <span className="font-semibold text-orange-400">Date:</span><br/>
                      3rd February 2026
                    </p>
                    <p className="text-gray-300">
                      <span className="font-semibold text-orange-400">Duration:</span><br/>
                      8 Hours (9:00 AM - 5:00 PM)
                    </p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300">
                      <span className="font-semibold text-orange-400">Venue:</span><br/>
                      Shivaji College of Art and Science, Akola
                    </p>
                    <p className="text-gray-300">
                      <span className="font-semibold text-orange-400">Mode:</span><br/>
                      Offline (On-Campus)
                    </p>
                    <p className="text-gray-300">
                      <span className="font-semibold text-orange-400">Level:</span><br/>
                      <span className="text-orange-400">State Level</span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-500 text-black font-bold rounded-xl hover:from-orange-700 hover:to-amber-600 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl w-full max-w-xs"
                >
                  Register Another Team
                </button>
                <p className="text-gray-400 text-sm">
                  Check your email for confirmation and updates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* User Info Bar */}
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl shadow-xl p-4 mb-8 flex flex-col sm:flex-row justify-between items-center border border-orange-500/20">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-lg">
                {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
              </span>
            </div>
            <div>
              <p className="font-semibold text-white">{user.displayName || 'User'}</p>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-gray-400 hover:text-orange-400 font-medium hover:bg-gray-800 rounded-lg transition-all duration-300 border border-gray-700 hover:border-orange-500/30 text-sm sm:text-base"
          >
            Logout Account
          </button>
        </div>

        {/* Registration Header */}
        <div className="relative overflow-hidden rounded-3xl mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-orange-500/15 to-amber-600/20"></div>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative p-6 md:p-10 text-center">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-2xl font-bold text-black">V</span>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">
              Register for <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">VIKRAMA CODE CARNIVAL</span>
            </h1>
            <div className="mb-4">
              <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full border border-orange-500/30">
                <span className="text-amber-300 text-sm font-semibold">सृजनं विजयते</span>
                <span className="text-gray-400 text-xs ml-2">(Creativity Always Wins)</span>
              </div>
            </div>
            <p className="text-gray-300 mb-2">
              Maharashtra's Premier State Level Coding Event
            </p>
            <p className="text-orange-400 text-sm font-medium">
              3rd February 2026 | Shivaji College, Akola | 8 Hours Challenge
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl p-6 md:p-8 border border-orange-500/20">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Team Information */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-2 h-10 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full mr-4"></div>
                <h3 className="text-xl md:text-2xl font-bold text-white">Team Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 font-medium mb-3">Team Name *</label>
                  <input
                    type="text"
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-white placeholder-gray-500"
                    placeholder="Enter your team name"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-3">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-white placeholder-gray-500"
                    placeholder="Enter project title"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-gray-300 font-medium mb-3">Project Description *</label>
                <textarea
                  required
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-white placeholder-gray-500 resize-none"
                  placeholder="Brief description of your project idea, technologies you plan to use, and problem you're solving..."
                />
              </div>
            </div>

            {/* Team Captain */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-2 h-10 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full mr-4"></div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">Team Captain Details *</h3>
                  <p className="text-gray-400 text-sm mt-1">Auto-filled from your Google account</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-300 font-medium mb-3">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={teamCaptain.name}
                    onChange={handleCaptainChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-gray-400"
                    placeholder="Auto-filled from Google"
                    readOnly
                  />
                  <p className="text-xs text-orange-400 mt-1 flex items-center">
                    <span className="mr-1">🔒</span> Auto-filled from Google
                  </p>
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-3">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={teamCaptain.email}
                    onChange={handleCaptainChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-gray-400"
                    placeholder="Auto-filled from Google"
                    readOnly
                  />
                  <p className="text-xs text-orange-400 mt-1 flex items-center">
                    <span className="mr-1">🔒</span> Auto-filled from Google
                  </p>
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-3">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={teamCaptain.phone}
                    onChange={handleCaptainChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-white placeholder-gray-500"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-3">College</label>
                  <input
                    type="text"
                    name="college"
                   className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-3">Year of Study *</label>
                  <select
                    name="year"
                    required
                    value={teamCaptain.year}
                    onChange={handleCaptainChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-white appearance-none"
                  >
                    <option value="" className="bg-gray-800">Select Year</option>
                    <option value="First" className="bg-gray-800">First Year</option>
                    <option value="Second" className="bg-gray-800">Second Year</option>
                    <option value="Third" className="bg-gray-800">Third Year</option>
                    <option value="Fourth" className="bg-gray-800">Fourth Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-3">Department *</label>
                  <input
                    type="text"
                    name="department"
                    required
                    value={teamCaptain.department}
                    onChange={handleCaptainChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-white placeholder-gray-500"
                    placeholder="e.g., Computer Science"
                  />
                </div>
              </div>
            </div>

            {/* Team Members */}
            <div>
              <div className="flex flex-wrap justify-between items-center mb-6">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="w-2 h-10 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full mr-4"></div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">Team Members (Optional)</h3>
                    <p className="text-gray-400 text-sm mt-1">Minimum team size: 2 | Maximum team size: 4 (including captain)</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addMember}
                  disabled={members.length >= 3}
                  className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 ${members.length >= 3 
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' 
                    : 'bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-black transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl'
                  }`}
                >
                  + Add Member
                </button>
              </div>
              
              {members.map((member, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-xl p-6 mb-6 border border-orange-500/10">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-amber-500 rounded-lg flex items-center justify-center mr-4 shadow-md">
                        <span className="text-black font-bold">{index + 1}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-white">Member {index + 1}</h4>
                    </div>
                    {members.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMember(index)}
                        className="text-red-400 hover:text-red-300 font-medium hover:underline transition-colors text-sm flex items-center"
                      >
                        <span className="mr-2">🗑️</span>
                        Remove Member
                      </button>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-gray-300 font-medium mb-3">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={member.name}
                        onChange={(e) => handleMemberChange(index, e)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-white placeholder-gray-500"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-medium mb-3">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={member.email}
                        onChange={(e) => handleMemberChange(index, e)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-white placeholder-gray-500"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-medium mb-3">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={member.phone}
                        onChange={(e) => handleMemberChange(index, e)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-white placeholder-gray-500"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-medium mb-3">Year of Study</label>
                      <select
                        name="year"
                        value={member.year}
                        onChange={(e) => handleMemberChange(index, e)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-white appearance-none"
                      >
                        <option value="" className="bg-gray-800">Select Year</option>
                        <option value="First" className="bg-gray-800">First Year</option>
                        <option value="Second" className="bg-gray-800">Second Year</option>
                        <option value="Third" className="bg-gray-800">Third Year</option>
                        <option value="Fourth" className="bg-gray-800">Fourth Year</option>
                      </select>
                    </div>
                    <div className="lg:col-span-2">
                      <label className="block text-gray-300 font-medium mb-3">Department</label>
                      <input
                        type="text"
                        name="department"
                        value={member.department}
                        onChange={(e) => handleMemberChange(index, e)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-white placeholder-gray-500"
                        placeholder="e.g., Computer Science, Information Technology, etc."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="pt-8 border-t border-gray-800">
              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={`relative group w-full max-w-md mx-auto ${loading ? 'cursor-not-allowed' : ''}`}
                >
                  <div className={`absolute -inset-1 bg-gradient-to-r from-orange-600 to-amber-500 rounded-2xl blur ${loading ? 'opacity-50' : 'opacity-75 group-hover:opacity-100'} transition duration-300`}></div>
                  <div className={`relative px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${loading ? '' : 'group-hover:-translate-y-1'} shadow-xl ${loading ? 'bg-orange-600/50' : 'bg-gradient-to-r from-orange-600 to-amber-500 group-hover:from-orange-700 group-hover:to-amber-600'} text-black w-full`}>
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3 text-black" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting Registration...
                      </span>
                    ) : (
                      'Register Team for VIKRAMA CODE CARNIVAL'
                    )}
                  </div>
                </button>
                
                <div className="mt-8 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-orange-500/10">
                  <div className="flex items-start">
                    <span className="text-orange-400 mr-3">📝</span>
                    <div>
                      <h4 className="text-white font-semibold mb-2">Important Information</h4>
                      <p className="text-gray-300 mb-2">
                        <strong className="text-orange-400">Note:</strong> Once submitted, you cannot edit your registration. Please double-check all information before submitting.
                      </p>
                      <p className="text-gray-300">
                        <strong className="text-orange-400">Slogan:</strong> 
                        <span className="ml-2 text-amber-300 font-medium">"सृजनं विजयते"</span> 
                        <span className="text-gray-400 ml-2">(Creativity Always Wins)</span>
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        Make sure all team details are accurate for smooth communication and verification.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;