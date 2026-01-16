export default function AnalyticsCards({ analytics }) {
  const cards = [
    { label: 'Total Leads', value: analytics?.totalLeads || 0, color: 'blue' },
    { label: 'Converted', value: analytics?.convertedLeads || 0, color: 'green' },
    { label: 'Conversion Rate', value: `${analytics?.conversionRate || 0}%`, color: 'purple' }
  ];

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-2">{card.label}</p>
          <p className={`text-3xl font-bold ${colorClasses[card.color]}`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
