"use client";
import { useState, useEffect } from "react";
import Papa from "papaparse";

const PAGE_SIZE = 10;

export default function DatasetTab() {
    const [rows, setRows] = useState<Record<string, string>[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {
        Papa.parse<Record<string, string>>("/data/customer_shopping_behavior.csv", {
            download: true,
            header: true,
            complete: ({ data, meta }) => {
                setColumns(meta.fields || []);
                setRows(data.filter(r => Object.values(r).some(v => v)));
            },
        });
    }, []);

    const filtered = rows.filter(row =>
        Object.values(row).some(v =>
            String(v).toLowerCase().includes(search.toLowerCase())
        )
    );

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div>
            <h2 className="text-lg font-semibold mb-1">Dataset preview</h2>
            <p className="text-sm text-gray-500 mb-5">
                {rows.length.toLocaleString()} rows loaded from CSV.
            </p>

            <input
                type="text"
                placeholder="Search any value..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="w-full mb-4 px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
            />

            <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            {columns.map(col => (
                                <th key={col} className="px-4 py-3 text-left text-xs text-gray-500 font-medium whitespace-nowrap">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.map((row, i) => (
                            <tr key={i} className="border-t border-gray-100 hover:bg-gray-50">
                                {columns.map(col => (
                                    <td key={col} className="px-4 py-2.5 text-gray-700 whitespace-nowrap">
                                        {row[col]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                <span>Page {page} of {totalPages}</span>
                <div className="flex gap-2">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
                    >← Prev</button>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
                    >Next →</button>
                </div>
            </div>
        </div>
    );
}