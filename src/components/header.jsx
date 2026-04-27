import React from "react";
import {
  Menu,
  Search,
  Plus,
  Megaphone,
  HelpCircle,
  Bell,
} from "lucide-react";

const Header = ({ title, icon }) => {
     return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white border-b border-[#E2E8F0] flex items-center px-4 justify-between">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-x-4">

        {/* Hamburger */}
        <button className="p-2 rounded hover:bg-gray-100 transition">
          <Menu className="w-5 h-5 text-[#1E293B]" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#007BFF] rounded flex items-center justify-center text-white font-bold text-sm">
            P
          </div>
          <div className="leading-tight">
            <div className="text-xs font-semibold text-[#1E293B]">Pseudo</div>
            <div className="text-sm text-gray-500">Services</div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-8 w-[1px] bg-[#E2E8F0] mx-2"></div>

        {/* Dashboard Label */}
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-bold uppercase text-[#1E293B]">
            {title}
          </span>
        </div>
      </div>

      {/* CENTER SECTION */}
      <div className="flex-1 max-w-xl mx-6">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search across Leads, Deals and more..."
            className="w-full pl-9 pr-3 py-2 rounded-md border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#007BFF] text-sm"
          />
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-x-4">

        {/* Add Button */}
        <button className="w-9 h-9 bg-[#007BFF] hover:bg-blue-700 text-white rounded flex items-center justify-center transition">
          <Plus className="w-5 h-5" />
        </button>

        {/* Megaphone */}
        <button className="p-2 rounded hover:bg-gray-100 transition">
          <Megaphone className="w-5 h-5 text-[#1E293B]" />
        </button>

        {/* Help */}
        <button className="p-2 rounded hover:bg-gray-100 transition">
          <HelpCircle className="w-5 h-5 text-[#1E293B]" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="p-2 rounded hover:bg-gray-100 transition">
            <Bell className="w-5 h-5 text-[#1E293B]" />
          </button>
          <span className="absolute -top-1 -right-1 bg-[#FBBF24] text-white text-[10px] px-1.5 rounded-full">
            1
          </span>
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-blue-100 text-[#007BFF] flex items-center justify-center font-semibold cursor-pointer hover:bg-blue-200 transition">
          A
        </div>

      </div>
    </header>
 
    );

}
export default Header;