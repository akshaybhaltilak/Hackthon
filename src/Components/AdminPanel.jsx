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
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full blur-xl opacity-30"></div>
            <div className="relative animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto"></div>
          </div>
          <p className="text-gray-400 text-lg">Loading registrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-orange-500/15 to-orange-600/20"></div>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative p-8 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Hackathon <span className="text-orange-400">Admin Panel</span>
            </h1>
            <p className="text-gray-300 mb-6">WebReich Solutions × Shivaji College of Art and Science, Akola</p>
            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/20 p-4 rounded-xl border border-orange-500/40 min-w-[140px]">
                  <div className="text-2xl font-bold text-orange-300">{stats.totalTeams}</div>
                  <div className="text-sm text-orange-200/80">Total Teams</div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/20 p-4 rounded-xl border border-orange-500/40 min-w-[140px]">
                  <div className="text-2xl font-bold text-orange-300">{stats.totalParticipants}</div>
                  <div className="text-sm text-orange-200/80">Total Participants</div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/20 p-4 rounded-xl border border-orange-500/40 min-w-[140px]">
                  <div className="text-2xl font-bold text-orange-300">{stats.averageTeamSize}</div>
                  <div className="text-sm text-orange-200/80">Avg Team Size</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 mb-8 border border-orange-500/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex-1 w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search teams by name, captain, or project..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-orange-500/30 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-white placeholder-gray-500"
                />
                <span className="absolute right-3 top-3 text-orange-500">🔍</span>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-orange-700/30 to-orange-600/30 text-white px-6 py-3 rounded-xl border border-orange-500/50 hover:border-orange-500 hover:from-orange-700/40 hover:to-orange-600/40 transition font-semibold flex items-center gap-2"
              >
                <span>🔄</span>
                Refresh
              </button>
              <button
                onClick={exportToCSV}
                className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-6 py-3 rounded-xl border border-orange-400 hover:from-orange-700 hover:to-orange-600 transition font-semibold flex items-center gap-2"
              >
                <span>📥</span>
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Registrations List */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Registered Teams <span className="text-orange-400">({filteredRegistrations.length})</span>
          </h2>
          
          {filteredRegistrations.length === 0 ? (
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 text-center border border-orange-500/30">
              <div className="text-6xl mb-4 text-orange-500/30">👥</div>
              <p className="text-gray-400 text-lg mb-4">No registrations found.</p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-6 py-3 bg-gradient-to-r from-orange-700/30 to-orange-600/30 text-white rounded-xl hover:border-orange-500 transition border border-orange-500/30"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredRegistrations.map((team, index) => (
                <div key={team.id} className="relative">
                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 border border-orange-500/30 hover:border-orange-500/50 transition">
                    {/* Team Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl flex items-center justify-center text-black font-bold text-xl">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{team.teamName}</h3>
                            <p className="text-orange-300 mt-1">{team.projectTitle}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="px-3 py-1 bg-gradient-to-r from-orange-900/50 to-orange-800/30 text-orange-300 rounded-full text-sm font-semibold border border-orange-500/50">
                            👥 {team.teamSize || 1} Members
                          </span>
                          <span className="px-3 py-1 bg-gradient-to-r from-orange-900/50 to-orange-800/30 text-orange-300 rounded-full text-sm font-semibold border border-orange-500/50">
                            📅 {formatDate(team.registeredAt).split(',')[0]}
                          </span>
                          <span className="px-3 py-1 bg-gradient-to-r from-orange-900/50 to-orange-800/30 text-orange-300 rounded-full text-sm font-semibold border border-orange-500/50">
                            ⏰ {getTimeAgo(team.registeredAt)}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setExpandedTeam(expandedTeam === team.id ? null : team.id)}
                          className="bg-gradient-to-r from-orange-700/30 to-orange-600/30 text-white px-5 py-2 rounded-lg border border-orange-500/50 hover:border-orange-500 hover:from-orange-700/40 hover:to-orange-600/40 transition font-semibold flex items-center gap-2"
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
                          className="bg-gradient-to-r from-red-700/30 to-red-600/30 text-white px-5 py-2 rounded-lg border border-red-500/50 hover:border-red-500 hover:from-red-700/40 hover:to-red-600/40 transition font-semibold flex items-center gap-2"
                        >
                          <span>🗑️</span>
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {expandedTeam === team.id && (
                      <div className="border-t border-orange-500/30 pt-6 mt-4">
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <span className="text-orange-400">📋</span>
                            Project Description
                          </h4>
                          <div className="bg-gray-800/50 p-4 rounded-xl border border-orange-500/30">
                            <p className="text-gray-300">{team.projectDescription}</p>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Team Captain */}
                          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-5 border border-orange-500/30">
                            <h4 className="font-bold text-orange-400 mb-4 flex items-center gap-2">
                              <span className="text-orange-500">👑</span>
                              Team Captain
                            </h4>
                            <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
                                  {team.teamCaptain?.name?.charAt(0) || 'C'}
                                </div>
                                <div>
                                  <h5 className="font-bold text-white">{team.teamCaptain?.name || 'Not provided'}</h5>
                                  <p className="text-sm text-gray-400">{team.teamCaptain?.email || 'No email'}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gray-800/70 p-3 rounded-lg border border-orange-500/20">
                                  <p className="text-xs text-gray-400">Phone</p>
                                  <p className="font-semibold text-white">{team.teamCaptain?.phone || 'Not provided'}</p>
                                </div>
                                <div className="bg-gray-800/70 p-3 rounded-lg border border-orange-500/20">
                                  <p className="text-xs text-gray-400">Year</p>
                                  <p className="font-semibold text-white">{team.teamCaptain?.year || 'Not provided'}</p>
                                </div>
                                <div className="bg-gray-800/70 p-3 rounded-lg border border-orange-500/20 col-span-2">
                                  <p className="text-xs text-gray-400">Department</p>
                                  <p className="font-semibold text-white">{team.teamCaptain?.department || 'Not provided'}</p>
                                </div>
                                <div className="bg-gray-800/70 p-3 rounded-lg border border-orange-500/20 col-span-2">
                                  <p className="text-xs text-gray-400">College</p>
                                  <p className="font-semibold text-white">{team.teamCaptain?.college || 'Shivaji College'}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Team Members */}
                          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-5 border border-orange-500/30">
                            <h4 className="font-bold text-orange-400 mb-4 flex items-center gap-2">
                              <span className="text-orange-500">👥</span>
                              Team Members 
                              <span className="text-sm font-normal bg-gray-800/70 px-2 py-1 rounded border border-orange-500/20">
                                {team.members?.filter(m => m?.name?.trim()).length || 0} member(s)
                              </span>
                            </h4>
                            {team.members?.filter(m => m?.name?.trim()).length > 0 ? (
                              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                                {team.members.map((member, idx) => (
                                  member?.name?.trim() && (
                                    <div key={idx} className="bg-gray-800/70 rounded-xl p-4 border border-orange-500/20">
                                      <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full flex items-center justify-center text-black text-sm font-bold">
                                          {member.name.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                          <h5 className="font-bold text-white">{member.name}</h5>
                                          <p className="text-sm text-gray-400">{member.email}</p>
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2 gap-2">
                                        <div className="bg-gray-900/50 p-2 rounded border border-orange-500/20">
                                          <p className="text-xs text-gray-400">Phone</p>
                                          <p className="text-sm font-semibold text-white">{member.phone}</p>
                                        </div>
                                        <div className="bg-gray-900/50 p-2 rounded border border-orange-500/20">
                                          <p className="text-xs text-gray-400">Year</p>
                                          <p className="text-sm font-semibold text-white">{member.year}</p>
                                        </div>
                                        <div className="bg-gray-900/50 p-2 rounded border border-orange-500/20 col-span-2">
                                          <p className="text-xs text-gray-400">Department</p>
                                          <p className="text-sm font-semibold text-white">{member.department}</p>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8">
                                <div className="text-4xl mb-3 opacity-30 text-orange-500/30">👤</div>
                                <p className="text-gray-400 font-medium">No additional team members</p>
                                <p className="text-gray-500 text-sm mt-1">Team consists only of captain</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative max-w-md w-full">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-red-500/50">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-900/50 to-red-800/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/50">
                  <span className="text-3xl text-red-400">🗑️</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Delete Team</h3>
                <p className="text-gray-300 mb-8">
                  Are you sure you want to delete this team? This action cannot be undone.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-800/30 to-gray-700/30 text-gray-300 rounded-xl border border-gray-600 hover:border-gray-500 transition font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const teamId = showDeleteConfirm;
                      setShowDeleteConfirm(null);
                      handleDeleteTeam(teamId);
                    }}
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-xl border border-red-500 hover:from-red-700 hover:to-red-600 transition font-semibold"
                  >
                    Delete Team
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;