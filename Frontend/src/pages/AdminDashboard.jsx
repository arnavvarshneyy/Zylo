import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { 
  Users, 
  Code, 
  Settings, 
  Database, 
  Plus, 
  Edit, 
  Upload,
  Video,
  LogOut 
} from 'react-feather';
import AdminPanel from '../components/AdminPanel';
import AdminUpdate from '../components/AdminUpdate';
import AdminUpload from '../components/AdminUpload';
import AdminVideo from '../components/AdminVideo';

export default function AdminDashboard() {
  const { user, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  if (role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">Access Denied</h1>
          <p className="text-gray-400">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'create':
        return <AdminPanel />;
      case 'update':
        return <AdminUpdate />;
      case 'upload':
        return <AdminVideo />;
      default:
        return (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-gray-400">Welcome back, {user?.firstName}! Manage your platform from here.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                onClick={() => setActiveTab('create')}
                className="bg-black/70 border border-gray-800 rounded-xl p-6 hover:border-orange-500/50 transition-all cursor-pointer hover:scale-105"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Plus className="text-orange-400" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Create Problem</h3>
                </div>
                <p className="text-gray-400 mb-4">Create new coding problems with test cases and solutions</p>
                <div className="flex items-center text-orange-400">
                  <span>Get Started</span>
                  <Code size={16} className="ml-2" />
                </div>
              </div>

              <div
                onClick={() => setActiveTab('update')}
                className="bg-black/70 border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all cursor-pointer hover:scale-105"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Edit className="text-blue-400" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Update Problems</h3>
                </div>
                <p className="text-gray-400 mb-4">Edit and manage existing coding problems</p>
                <div className="flex items-center text-blue-400">
                  <span>Manage</span>
                  <Edit size={16} className="ml-2" />
                </div>
              </div>

              <div
                onClick={() => setActiveTab('upload')}
                className="bg-black/70 border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-all cursor-pointer hover:scale-105"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Video className="text-green-400" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Video Management</h3>
                </div>
                <p className="text-gray-400 mb-4">Upload and manage video solutions for problems</p>
                <div className="flex items-center text-green-400">
                  <span>Manage Videos</span>
                  <Upload size={16} className="ml-2" />
                </div>
              </div>

              <div className="bg-black/70 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all cursor-pointer hover:scale-105">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Users className="text-purple-400" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">User Management</h3>
                </div>
                <p className="text-gray-400 mb-4">Manage users, roles, and permissions</p>
                <div className="flex items-center text-purple-400">
                  <span>Coming Soon</span>
                  <Settings size={16} className="ml-2" />
                </div>
              </div>

              <div className="bg-black/70 border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all cursor-pointer hover:scale-105">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <Database className="text-cyan-400" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Analytics</h3>
                </div>
                <p className="text-gray-400 mb-4">View platform statistics and analytics</p>
                <div className="flex items-center text-cyan-400">
                  <span>Coming Soon</span>
                  <Database size={16} className="ml-2" />
                </div>
              </div>

              <div className="bg-black/70 border border-gray-800 rounded-xl p-6 hover:border-pink-500/50 transition-all cursor-pointer hover:scale-105">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                    <Settings className="text-pink-400" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Settings</h3>
                </div>
                <p className="text-gray-400 mb-4">Configure platform settings and preferences</p>
                <div className="flex items-center text-pink-400">
                  <span>Coming Soon</span>
                  <Settings size={16} className="ml-2" />
                </div>
              </div>
            </div>

            <div className="mt-8 bg-black/70 border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Quick Stats</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Total Problems</h3>
                  <p className="text-3xl font-bold text-orange-400">0</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Total Users</h3>
                  <p className="text-3xl font-bold text-blue-400">0</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Submissions</h3>
                  <p className="text-3xl font-bold text-green-400">0</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Videos</h3>
                  <p className="text-3xl font-bold text-purple-400">0</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Header */}
      <div className="bg-black/70 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 
                onClick={() => setActiveTab('overview')}
                className="text-2xl font-bold text-white cursor-pointer hover:text-orange-400 transition-colors"
              >
                ZYLO Admin
              </h1>
              
              {activeTab !== 'overview' && (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ← Back to Dashboard
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Admin: {user?.firstName}</span>
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <LogOut size={16} />
                <span>Exit Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  );
}
