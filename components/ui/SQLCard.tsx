"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SQLQuestion } from "@/data/sqlQuestions";

export default function SQLCard({ item }: { item: SQLQuestion }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden mb-3 bg-white">
      {/* Header — always visible */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-xs bg-violet-100 text-violet-700 px-2.5 py-0.5 rounded-full font-medium">
            {item.category}
          </span>
          <span className="text-sm font-medium text-gray-800">{item.question}</span>
        </div>
        {open ? <ChevronUp size={16} className="text-gray-400 shrink-0" />
               : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
      </button>

      {/* Expandable body */}
      {open && (
        <div className="border-t border-gray-200 grid grid-cols-1 md:grid-cols-2">
          {/* Query pane */}
          <div className="p-5 border-b md:border-b-0 md:border-r border-gray-200">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">SQL Query</p>
            <pre className="bg-gray-950 text-green-400 text-xs rounded-lg p-4 overflow-x-auto leading-relaxed">
              <code>{item.query}</code>
            </pre>
          </div>

          {/* Result pane */}
          <div className="p-5">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Result</p>
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {item.columns.map(col => (
                    <th key={col} className="text-left text-xs text-gray-400 pb-2 font-medium capitalize">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {item.result.map((row, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    {item.columns.map(col => (
                      <td key={col} className="py-2 text-gray-700">{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}