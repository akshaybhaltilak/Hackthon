import React, { useState, useEffect } from 'react';
import { database, ref, onValue, remove } from '../firebase';

const AdminPanel = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTeam, setExpandedTeam] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [stats, setStats] = useState({
    totalTeams: 0,
    totalParticipants: 0,
    averageTeamSize: 0
  });

  useEffect(() => {
    // Listen for realtime updates
    const registrationsRef = ref(database, 'registrations');
    
    const unsubscribe = onValue(registrationsRef, (snapshot) => {
      const data = snapshot.val();
      let registrationsData = [];
      let totalParticipants = 0;

      if (data) {
        // Convert Firebase object to array
        registrationsData = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));

        // Calculate total participants
        totalParticipants = registrationsData.reduce((sum, team) => sum + (team.teamSize || 1), 0);
      }

      setRegistrations(registrationsData);
      setStats({
        totalTeams: registrationsData.length,
        totalParticipants,
        averageTeamSize: registrationsData.length > 0 ? 
          (totalParticipants / registrationsData.length).toFixed(1) : 0
      });
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleDeleteTeam = async (teamId) => {
    try {
      const teamRef = ref(database, `registrations/${teamId}`);
      await remove(teamRef);
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting team:', error);
      alert('Failed to delete team');
    }
  };

  const filteredRegistrations = registrations.filter(team =>
    team.teamName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.teamCaptain?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.projectTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = ['Team Name', 'Project Title', 'Captain Name', 'Captain Email', 'Captain Phone', 'Total Members', 'Registration Date'];
    const csvData = [
      headers.join(','),
      ...registrations.map(team => [
        `"${team.teamName || ''}"`,
        `"${team.projectTitle || ''}"`,
        `"${team.teamCaptain?.name || ''}"`,
        `"${team.teamCaptain?.email || ''}"`,
        `"${team.teamCaptain?.phone || ''}"`,
        team.teamSize || 1,
        new Date(team.registeredAt || new Date()).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hackathon-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading registrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl p-8 mb-8">
          <h1 className="text-3xl font-bold mb-2">Hackathon Admin Panel</h1>
          <p className="text-gray-300">WebReich Solutions × Shivaji College of Art and Science, Akola</p>
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-2xl font-bold">{stats.totalTeams}</div>
              <div className="text-sm text-gray-300">Total Teams</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-2xl font-bold">{stats.totalParticipants}</div>
              <div className="text-sm text-gray-300">Total Participants</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-2xl font-bold">{stats.averageTeamSize}</div>
              <div className="text-sm text-gray-300">Avg Team Size</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder="Search teams by name, captain, or project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center gap-2"
              >
                <span>🔄</span>
                Refresh
              </button>
              <button
                onClick={exportToCSV}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold flex items-center gap-2"
              >
                <span>📥</span>
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Registrations List */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Registered Teams ({filteredRegistrations.length})
          </h2>
          
          {filteredRegistrations.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 text-center">
              <p className="text-gray-600 text-lg">No registrations found.</p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredRegistrations.map((team, index) => (
                <div key={team.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
                  {/* Team Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{team.teamName}</h3>
                          <p className="text-gray-600 mt-1">{team.projectTitle}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                          👥 {team.teamSize || 1} Members
                        </span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                          📅 {formatDate(team.registeredAt).split(',')[0]}
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                          ⏰ {getTimeAgo(team.registeredAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setExpandedTeam(expandedTeam === team.id ? null : team.id)}
                        className="px-5 py-2 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 rounded-lg hover:from-blue-200 hover:to-blue-100 transition font-semibold flex items-center gap-2"
                      >
                        {expandedTeam === team.id ? (
                          <>
                            <span>👆</span>
                            Hide Details
                          </>
                        ) : (
                          <>
                            <span>👇</span>
                            View Details
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(team.id)}
                        className="px-5 py-2 bg-gradient-to-r from-red-100 to-red-50 text-red-700 rounded-lg hover:from-red-200 hover:to-red-100 transition font-semibold flex items-center gap-2"
                      >
                        <span>🗑️</span>
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedTeam === team.id && (
                    <div className="border-t pt-6 mt-4">
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <span className="text-blue-600">📋</span>
                          Project Description
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <p className="text-gray-700">{team.projectDescription}</p>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Team Captain */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                          <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                            <span className="text-yellow-600">👑</span>
                            Team Captain
                          </h4>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                {team.teamCaptain?.name?.charAt(0) || 'C'}
                              </div>
                              <div>
                                <h5 className="font-bold text-gray-800">{team.teamCaptain?.name || 'Not provided'}</h5>
                                <p className="text-sm text-gray-600">{team.teamCaptain?.email || 'No email'}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-white/50 p-3 rounded-lg">
                                <p className="text-xs text-gray-600">Phone</p>
                                <p className="font-semibold text-gray-800">{team.teamCaptain?.phone || 'Not provided'}</p>
                              </div>
                              <div className="bg-white/50 p-3 rounded-lg">
                                <p className="text-xs text-gray-600">Year</p>
                                <p className="font-semibold text-gray-800">{team.teamCaptain?.year || 'Not provided'}</p>
                              </div>
                              <div className="bg-white/50 p-3 rounded-lg col-span-2">
                                <p className="text-xs text-gray-600">Department</p>
                                <p className="font-semibold text-gray-800">{team.teamCaptain?.department || 'Not provided'}</p>
                              </div>
                              <div className="bg-white/50 p-3 rounded-lg col-span-2">
                                <p className="text-xs text-gray-600">College</p>
                                <p className="font-semibold text-gray-800">{team.teamCaptain?.college || 'Shivaji College'}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Team Members */}
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
                          <h4 className="font-bold text-purple-800 mb-4 flex items-center gap-2">
                            <span className="text-purple-600">👥</span>
                            Team Members 
                            <span className="text-sm font-normal bg-white/50 px-2 py-1 rounded">
                              {team.members?.filter(m => m?.name?.trim()).length || 0} member(s)
                            </span>
                          </h4>
                          {team.members?.filter(m => m?.name?.trim()).length > 0 ? (
                            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                              {team.members.map((member, idx) => (
                                member?.name?.trim() && (
                                  <div key={idx} className="bg-white/70 rounded-lg p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                        {member.name.charAt(0)}
                                      </div>
                                      <div className="flex-1">
                                        <h5 className="font-bold text-gray-800">{member.name}</h5>
                                        <p className="text-sm text-gray-600">{member.email}</p>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="bg-white p-2 rounded">
                                        <p className="text-xs text-gray-600">Phone</p>
                                        <p className="text-sm font-semibold text-gray-800">{member.phone}</p>
                                      </div>
                                      <div className="bg-white p-2 rounded">
                                        <p className="text-xs text-gray-600">Year</p>
                                        <p className="text-sm font-semibold text-gray-800">{member.year}</p>
                                      </div>
                                      <div className="bg-white p-2 rounded col-span-2">
                                        <p className="text-xs text-gray-600">Department</p>
                                        <p className="text-sm font-semibold text-gray-800">{member.department}</p>
                                      </div>
                                    </div>
                                  </div>
                                )
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <div className="text-4xl mb-3 opacity-50">👤</div>
                              <p className="text-gray-600 font-medium">No additional team members</p>
                              <p className="text-gray-500 text-sm mt-1">Team consists only of captain</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Event Summary</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Hackathon Details</h4>
              <ul className="text-gray-600 space-y-1">
                <li>📅 Date: 3rd February 2026</li>
                <li>⏰ Duration: 12 Hours</li>
                <li>🏆 Prizes: ₹7000 / ₹5000 / ₹3000</li>
              </ul>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Registration Info</h4>
              <ul className="text-gray-600 space-y-1">
                <li>👥 Team Size: 2-4 members</li>
                <li>👑 One captain per team</li>
                <li>📝 Project submission required</li>
              </ul>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Venue</h4>
              <p className="text-gray-600">
                Shivaji College of Art and Science<br />
                Akola, Maharashtra
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🗑️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Delete Team</h3>
              <p className="text-gray-600 mb-8">
                Are you sure you want to delete this team? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const teamId = showDeleteConfirm;
                    setShowDeleteConfirm(null);
                    handleDeleteTeam(teamId);
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition font-semibold"
                >
                  Delete Team
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;