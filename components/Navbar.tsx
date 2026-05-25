import { BarChart2} from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2 font-semibold text-gray-800">
        <BarChart2 size={20} className="text-violet-600" />
        Customer Behaviour Analytics Project
      </div>
      
       <a href="https://github.com/Kanika1905/Customer_Behaviour_Analysis"
        target="_blank"
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        GitHub ↗
      </a>
    </nav>
  );
}