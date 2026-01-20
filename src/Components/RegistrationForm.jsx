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
        // Pre-fill captain details from logged-in user
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
      const user = result.user;
      setUser(user);
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
        uid: user.uid // Add user ID for reference
      },
      members: members.filter(member => member.name.trim() !== ''),
      projectTitle,
      projectDescription,
      registeredAt: new Date().toISOString(),
      teamSize: 1 + members.filter(member => member.name.trim() !== '').length,
      registeredBy: user.uid
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-2xl shadow-2xl p-8 text-center mb-8 transform hover:-translate-y-1 transition-all duration-300">
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-3 tracking-tight">WebReich Solutions Hackathon 2026</h1>
              <h2 className="text-xl opacity-90">In association with Shivaji College of Art and Science, Akola</h2>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              <div className="text-center bg-white/20 backdrop-blur-sm p-4 rounded-xl min-w-[120px] transform hover:scale-105 transition-transform">
                <div className="text-3xl font-bold">₹7000</div>
                <div className="text-sm opacity-90">First Prize</div>
              </div>
              <div className="text-center bg-white/20 backdrop-blur-sm p-4 rounded-xl min-w-[120px] transform hover:scale-105 transition-transform">
                <div className="text-3xl font-bold">₹5000</div>
                <div className="text-sm opacity-90">Second Prize</div>
              </div>
              <div className="text-center bg-white/20 backdrop-blur-sm p-4 rounded-xl min-w-[120px] transform hover:scale-105 transition-transform">
                <div className="text-3xl font-bold">₹3000</div>
                <div className="text-sm opacity-90">Third Prize</div>
              </div>
            </div>
          </div>

          {/* Login Section */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mb-4">
                <span className="text-3xl text-white">🔒</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Login Required</h2>
              <p className="text-gray-600 mb-6">Please login with Google to register for the hackathon</p>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="px-8 py-4 bg-white border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-orange-500 transition-all duration-300 flex items-center justify-center mx-auto space-x-3 shadow-md hover:shadow-lg"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-lg">Sign in with Google</span>
            </button>

            <div className="mt-8 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-100">
              <p className="text-gray-700">
                <strong>Note:</strong> Your Google account will be used to:
              </p>
              <ul className="text-gray-600 text-sm mt-2 space-y-1">
                <li>• Automatically fill your name and email as team captain</li>
                <li>• Save your registration securely</li>
                <li>• Receive updates about the hackathon</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* User Info Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-8 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{user.displayName || 'User'}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-gray-600 hover:text-orange-600 font-medium hover:bg-orange-50 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Success Message */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center transform transition-all duration-300 hover:shadow-3xl">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mb-6">
              <div className="text-white text-5xl animate-pulse">✓</div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Your team has been successfully registered for the WebReich Solutions Hackathon.
            </p>
            
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 p-6 rounded-xl mb-8 text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-orange-100 p-2 rounded-lg mr-3">📌</span>
                Important Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-gray-700"><span className="font-semibold text-orange-600">Date:</span> 3rd February 2026</p>
                  <p className="text-gray-700"><span className="font-semibold text-orange-600">Duration:</span> 12 Hours</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700"><span className="font-semibold text-orange-600">Venue:</span> Shivaji College of Art and Science, Akola</p>
                  <p className="text-gray-700"><span className="font-semibold text-orange-600">Time:</span> 9:00 AM to 9:00 PM</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setSubmitted(false)}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-amber-600 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Register Another Team
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* User Info Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-8 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
              </span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">{user.displayName || 'User'}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-gray-600 hover:text-orange-600 font-medium hover:bg-orange-50 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-2xl shadow-2xl p-8 text-center mb-8 transform hover:-translate-y-1 transition-all duration-300">
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-3 tracking-tight">WebReich Solutions Hackathon 2026</h1>
            <h2 className="text-xl opacity-90">In association with Shivaji College of Art and Science, Akola</h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="text-center bg-white/20 backdrop-blur-sm p-4 rounded-xl min-w-[120px] transform hover:scale-105 transition-transform">
              <div className="text-3xl font-bold">₹7000</div>
              <div className="text-sm opacity-90">First Prize</div>
            </div>
            <div className="text-center bg-white/20 backdrop-blur-sm p-4 rounded-xl min-w-[120px] transform hover:scale-105 transition-transform">
              <div className="text-3xl font-bold">₹5000</div>
              <div className="text-sm opacity-90">Second Prize</div>
            </div>
            <div className="text-center bg-white/20 backdrop-blur-sm p-4 rounded-xl min-w-[120px] transform hover:scale-105 transition-transform">
              <div className="text-3xl font-bold">₹3000</div>
              <div className="text-sm opacity-90">Third Prize</div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/30">
            <div className="inline-flex items-center space-x-4 text-lg">
              <span className="flex items-center">
                <span className="mr-2">📅</span> 3rd February 2026
              </span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center">
                <span className="mr-2">⏰</span> 9:00 AM - 9:00 PM
              </span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center">
                <span className="mr-2">📍</span> 12 Hours
              </span>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Team Information */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-2 h-10 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full mr-4"></div>
                <h3 className="text-2xl font-bold text-gray-900">Team Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Team Name *</label>
                  <input
                    type="text"
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Enter your team name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Enter project title"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-gray-700 font-medium mb-2">Project Description *</label>
                <textarea
                  required
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                  placeholder="Brief description of your project idea, technologies you plan to use, and problem you're solving..."
                />
              </div>
            </div>

            {/* Team Captain */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-2 h-10 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full mr-4"></div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Team Captain Details *</h3>
                  <p className="text-gray-600 text-sm mt-1">Auto-filled from your Google account</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={teamCaptain.name}
                    onChange={handleCaptainChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50"
                    placeholder="Auto-filled from Google"
                    readOnly
                  />
                  <p className="text-xs text-orange-500 mt-1">Auto-filled from Google</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={teamCaptain.email}
                    onChange={handleCaptainChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50"
                    placeholder="Auto-filled from Google"
                    readOnly
                  />
                  <p className="text-xs text-orange-500 mt-1">Auto-filled from Google</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={teamCaptain.phone}
                    onChange={handleCaptainChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">College</label>
                  <input
                    type="text"
                    name="college"
                    value={teamCaptain.college}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Year of Study *</label>
                  <select
                    name="year"
                    required
                    value={teamCaptain.year}
                    onChange={handleCaptainChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none bg-white"
                  >
                    <option value="">Select Year</option>
                    <option value="First">First Year</option>
                    <option value="Second">Second Year</option>
                    <option value="Third">Third Year</option>
                    <option value="Fourth">Fourth Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Department *</label>
                  <input
                    type="text"
                    name="department"
                    required
                    value={teamCaptain.department}
                    onChange={handleCaptainChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
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
                    <h3 className="text-2xl font-bold text-gray-900">Team Members (Optional)</h3>
                    <p className="text-gray-600 text-sm mt-1">Minimum team size: 2 | Maximum team size: 4 (including captain)</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addMember}
                  disabled={members.length >= 3}
                  className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 ${members.length >= 3 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white transform hover:-translate-y-0.5 shadow-md hover:shadow-lg'
                  }`}
                >
                  + Add Member
                </button>
              </div>
              
              {members.map((member, index) => (
                <div key={index} className="border-2 border-orange-100 rounded-xl p-6 mb-6 bg-gradient-to-r from-orange-50/50 to-amber-50/50">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">Member {index + 1}</h4>
                    </div>
                    {members.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMember(index)}
                        className="text-red-500 hover:text-red-700 font-semibold hover:underline transition-colors"
                      >
                        Remove Member
                      </button>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={member.name}
                        onChange={(e) => handleMemberChange(index, e)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={member.email}
                        onChange={(e) => handleMemberChange(index, e)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={member.phone}
                        onChange={(e) => handleMemberChange(index, e)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Year of Study</label>
                      <select
                        name="year"
                        value={member.year}
                        onChange={(e) => handleMemberChange(index, e)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none bg-white"
                      >
                        <option value="">Select Year</option>
                        <option value="First">First Year</option>
                        <option value="Second">Second Year</option>
                        <option value="Third">Third Year</option>
                        <option value="Fourth">Fourth Year</option>
                      </select>
                    </div>
                    <div className="lg:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2">Department</label>
                      <input
                        type="text"
                        name="department"
                        value={member.department}
                        onChange={(e) => handleMemberChange(index, e)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="e.g., Computer Science, Information Technology, etc."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="pt-8 border-t border-gray-200">
              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 ${loading 
                    ? 'bg-orange-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-xl hover:shadow-2xl'
                  } text-white`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting Registration...
                    </span>
                  ) : (
                    'Register Team for Hackathon'
                  )}
                </button>
                
                <p className="text-gray-500 mt-6 flex items-center justify-center">
                  <span className="inline-flex items-center mr-4">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    3rd February 2026
                  </span>
                  <span className="inline-flex items-center">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                    12 Hours Duration
                  </span>
                </p>
                
                <div className="mt-8 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-100">
                  <p className="text-gray-700 text-sm">
                    <strong>Note:</strong> Once submitted, you cannot edit your registration. Please double-check all information before submitting.
                  </p>
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