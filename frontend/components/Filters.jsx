export default function Filters({ filters, onChange, onClear }) {
  const statuses = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'];
  const sources = ['Website', 'LinkedIn', 'Referral', 'Cold Call', 'Email Campaign', 'Trade Show'];

  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={filters.leadStatus || ''}
        onChange={(e) => onChange('leadStatus', e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Statuses</option>
        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <select
        value={filters.leadSource || ''}
        onChange={(e) => onChange('leadSource', e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Sources</option>
        {sources.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <select
        value={filters.sortBy || 'createdAt'}
        onChange={(e) => onChange('sortBy', e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        <option value="createdAt">Date Created</option>
        <option value="estimatedValue">Value</option>
        <option value="lastName">Name</option>
      </select>

      <select
        value={filters.sortOrder || 'desc'}
        onChange={(e) => onChange('sortOrder', e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>

      <button
        onClick={onClear}
        className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg"
      >
        Clear Filters
      </button>
    </div>
  );
}
