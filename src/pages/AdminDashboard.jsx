import { useState, useEffect, useCallback } from 'react';
import { Users, Package, CheckCircle2, XCircle, ShieldCheck, Activity, MapPin, RefreshCw } from 'lucide-react';
import { formatDate } from '../lib/utils.js';
import { adminService, donationService } from '../services/api.js';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const [usersData, donationsData] = await Promise.all([
        adminService.getUsers(),
        donationService.getAll()
      ]);
      setUsers(usersData);
      setDonations(donationsData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const isLoading = isRefreshing && users.length === 0 && donations.length === 0;

  const handleUserStatus = async (userId, status) => {
    try {
      await adminService.updateUserStatus(userId, status);
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
    } catch (err) {
      console.error('Failed to update user status:', err);
      alert('Failed to update user status');
    }
  };

  const pendingVolunteers = users.filter(u => u.role === 'VOLUNTEER' && u.status === 'PENDING');
  const allVolunteers = users.filter(u => u.role === 'VOLUNTEER');
  const allDonors = users.filter(u => u.role === 'DONOR');

  const stats = [
    { label: 'Total Donors', value: allDonors.length, icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Volunteers', value: allVolunteers.length, icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Donations', value: donations.length, icon: Package, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Active Pickups', value: donations.filter(d => d.status === 'ACCEPTED').length, icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl border border-gray-200 bg-white p-12 shadow-sm text-center">
          <div className="mx-auto mb-6 h-12 w-12 rounded-full border-4 border-green-500 border-t-transparent animate-spin" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Loading dashboard...</h1>
          <p className="text-gray-500">Fetching users and donation data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Control Panel</h1>
          <p className="text-gray-600">Monitor and manage system activities</p>
        </div>
        <button
          onClick={loadData}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`${stat.bg} p-3 rounded-xl`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Volunteer Approvals */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Volunteer Approvals</h2>
            {pendingVolunteers.length > 0 && (
              <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-bold">
                {pendingVolunteers.length} Pending
              </span>
            )}
          </div>
          <div className="divide-y divide-gray-50 max-h-[400px] overflow-y-auto">
            {pendingVolunteers.length === 0 ? (
              <div className="p-10 text-center text-gray-500">No pending approvals</div>
            ) : (
              pendingVolunteers.map(v => (
                <div key={v.id} className="p-6 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">{v.name}</p>
                    <p className="text-sm text-gray-500">{v.email}</p>
                    <p className="text-xs text-gray-400 mt-1">Joined: {formatDate(v.createdAt)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUserStatus(v.id, 'REJECTED')}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Reject"
                    >
                      <XCircle className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => handleUserStatus(v.id, 'APPROVED')}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Approve"
                    >
                      <CheckCircle2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Recent Donations</h2>
          </div>
          <div className="divide-y divide-gray-50 max-h-[400px] overflow-y-auto">
            {donations.length === 0 ? (
              <div className="p-10 text-center text-gray-500">No donations recorded</div>
            ) : (
              donations.map(d => (
                <div key={d.id} className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-gray-900">{d.foodName}</p>
                      <p className="text-xs text-gray-500">By {d.donorName}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      d.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' :
                      d.status === 'ACCEPTED' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {d.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {d.location}</span>
                    <span>{formatDate(d.createdAt)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
