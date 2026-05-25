"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DatasetTab from "@/components/tabs/DatasetTab";
import TransformTab from "@/components/tabs/TransformTab";
import SQLTab from "@/components/tabs/SQLTab";
import DashboardTab from "@/components/tabs/DashboardTab";

const TABS = ["Dataset", "Transformations", "SQL Insights", "Dashboard"];

export default function Home() {
  const [active, setActive] = useState("Dataset");

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <Hero />

      {/* Tab bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6">
        <div className="flex gap-1 max-w-5xl mx-auto">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors
                ${active === tab
                  ? "border-violet-600 text-violet-700"
                  : "border-transparent text-gray-500 hover:text-gray-800"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {active === "Dataset" && <DatasetTab />}
        {active === "Transformations" && <TransformTab />}
        {active === "SQL Insights" && <SQLTab />}
        {active === "Dashboard" && <DashboardTab />}
      </div>
    </main>
  );
}