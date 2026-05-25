"use client";
import { useState } from "react";
import sqlQuestions from "@/data/sqlQuestions";
import SQLCard from "@/components/ui/SQLCard";

const ALL_CATEGORIES = ["All", ...new Set(sqlQuestions.map(q => q.category))];

export default function SQLTab() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All"
    ? sqlQuestions
    : sqlQuestions.filter(q => q.category === filter);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-1">Business questions answered with SQL</h2>
      <p className="text-sm text-gray-500 mb-5">
        Click any card to expand the query and result.
      </p>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {ALL_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border
              ${filter === cat
                ? "bg-violet-600 text-white border-violet-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.map(item => <SQLCard key={item.id} item={item} />)}
    </div>
  );
}