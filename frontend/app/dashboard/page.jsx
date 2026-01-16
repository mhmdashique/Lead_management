'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getLeads, getAnalytics } from '@/services/api';
import AnalyticsCards from '@/components/AnalyticsCards';
import SearchBar from '@/components/SearchBar';
import Filters from '@/components/Filters';
import LeadsTable from '@/components/LeadsTable';
import Pagination from '@/components/Pagination';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [leads, setLeads] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showLogoutToast, setShowLogoutToast] = useState(false);
  const [showLoginToast, setShowLoginToast] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    leadStatus: '',
    leadSource: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    page: 1,
    limit: 20
  });
  const [pagination, setPagination] = useState({ total: 0, totalPages: 0 });

  // Fetch analytics only once on mount
  const fetchAnalytics = useCallback(async () => {
    try {
      setAnalyticsLoading(true);
      const analyticsRes = await getAnalytics();
      setAnalytics(analyticsRes.data);
    } catch (err) {
      console.error('Analytics fetch error:', err);
    } finally {
      setAnalyticsLoading(false);
    }
  }, []);

  // Fetch leads based on filters
  const fetchLeads = useCallback(async () => {
    try {
      setLeadsLoading(true);
      setError('');
      const leadsRes = await getLeads(filters);
      setLeads(leadsRes.data.data);
      setPagination({ total: leadsRes.data.total, totalPages: leadsRes.data.totalPages });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch leads');
    } finally {
      setLeadsLoading(false);
    }
  }, [filters]);

  // Initial load
  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    // Show login success toast
    setShowLoginToast(true);
    setTimeout(() => setShowLoginToast(false), 3000);
    
    fetchAnalytics();
    fetchLeads();
  }, [user, router, fetchAnalytics, fetchLeads]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      leadStatus: '',
      leadSource: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
      page: 1,
      limit: 10
    });
  };

  const handleLogout = () => {
    setShowLogoutToast(true);
    setTimeout(() => {
      logout();
    }, 1000);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Login Success Toast */}
      {showLoginToast && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          Logged in successfully!
        </div>
      )}

      {/* Logout Toast */}
      {showLogoutToast && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          Are you logging out...
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Lead Management Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Analytics Cards - Load independently */}
        {analyticsLoading ? (
          <div className="mb-8">
            <div className="animate-pulse">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow h-24"></div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <AnalyticsCards analytics={analytics} />
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-6 space-y-4">
            <SearchBar onSearch={(value) => handleFilterChange('search', value)} />
            <Filters
              filters={filters}
              onChange={handleFilterChange}
              onClear={handleClearFilters}
            />
          </div>

          {leadsLoading ? (
            <LoadingSpinner />
          ) : leads.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No leads found. Try adjusting your filters.
            </div>
          ) : (
            <>
              <LeadsTable leads={leads} />
              <Pagination
                page={filters.page}
                totalPages={pagination.totalPages}
                onPageChange={(page) => handleFilterChange('page', page)}
                limit={filters.limit}
                onLimitChange={(limit) => handleFilterChange('limit', limit)}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
