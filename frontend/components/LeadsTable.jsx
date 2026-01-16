'use client';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

export default function LeadsTable({ leads }) {
  const router = useRouter();

  const statusColors = {
    New: 'bg-blue-100 text-blue-800',
    Contacted: 'bg-yellow-100 text-yellow-800',
    Qualified: 'bg-purple-100 text-purple-800',
    Converted: 'bg-green-100 text-green-800',
    Lost: 'bg-red-100 text-red-800'
  };

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr
                key={lead._id}
                onClick={() => router.push(`/leads/${lead._id}`)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{lead.firstName} {lead.lastName}</div>
                  <div className="text-sm text-gray-500">{lead.jobTitle}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.company}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[lead.leadStatus]}`}>
                    {lead.leadStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.leadSource}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(lead.createdAt), 'MMM d, yyyy')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {leads.map((lead) => (
          <div
            key={lead._id}
            onClick={() => router.push(`/leads/${lead._id}`)}
            className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-900">{lead.firstName} {lead.lastName}</h3>
                <p className="text-sm text-gray-500">{lead.company}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[lead.leadStatus]}`}>
                {lead.leadStatus}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{lead.email}</p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{lead.leadSource}</span>
              <span className="text-gray-500">{format(new Date(lead.createdAt), 'MMM d')}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
