export default function DashboardTab() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-1">Power BI Dashboard</h2>
      <p className="text-sm text-gray-500 mb-5">
        Image only
      </p>
      <div className="rounded-xl overflow-hidden border border-gray-200 aspect-video">
        <img
          src="/data/customer_behaviour_dashboard.png"
          alt="Customer Behaviour Dashboard"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

