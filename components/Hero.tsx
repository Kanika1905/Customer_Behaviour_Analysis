const STATS = [
  { label: "Rows analysed",       value: "3,900" },
  { label: "Business questions",  value: "10"     },
  { label: "SQL queries",         value: "10"     },
  { label: "Dashboard pages",     value: "1"      },
];

export default function Hero() {
  return (
    <section className="bg-white border-b border-gray-200 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <span className="inline-block text-xs font-medium bg-violet-100 text-violet-700 px-3 py-1 rounded-full mb-3">
          Python · PostgreSQL · Power BI
        </span>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Retail Sales Analysis — 2026
        </h1>
        <p className="text-gray-500 text-sm max-w-xl mb-8">
          End-to-end pipeline: raw CSV → Python transforms → PostgreSQL insights → Power BI dashboard.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map(s => (
            <div key={s.label} className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">{s.label}</p>
              <p className="text-xl font-semibold text-gray-800">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}