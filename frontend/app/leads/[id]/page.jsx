'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getLead } from '@/services/api';
import { format } from 'date-fns';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function LeadDetailPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchLead = async () => {
      try {
        const { data } = await getLead(params.id);
        setLead(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch lead');
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [user, router, params.id]);

  if (!user) return null;

  const statusColors = {
    New: 'bg-blue-100 text-blue-800',
    Contacted: 'bg-yellow-100 text-yellow-800',
    Qualified: 'bg-purple-100 text-purple-800',
    Converted: 'bg-green-100 text-green-800',
    Lost: 'bg-red-100 text-red-800'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-2"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Lead Details</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : lead ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {lead.firstName} {lead.lastName}
              </h2>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusColors[lead.leadStatus]}`}>
                {lead.leadStatus}
              </span>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                  <p className="text-gray-900">{lead.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Phone</h3>
                  <p className="text-gray-900">{lead.phone || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Company</h3>
                  <p className="text-gray-900">{lead.company || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Job Title</h3>
                  <p className="text-gray-900">{lead.jobTitle || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Lead Source</h3>
                  <p className="text-gray-900">{lead.leadSource}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Assigned To</h3>
                  <p className="text-gray-900">{lead.assignedTo || 'Unassigned'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Created Date</h3>
                  <p className="text-gray-900">{format(new Date(lead.createdAt), 'MMM d, yyyy h:mm a')}</p>
                </div>
              </div>

              {lead.tags && lead.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {lead.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {lead.notes && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Notes</h3>
                  <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{lead.notes}</p>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
