import { useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Dashboard from "../components/dashboard";
import { LayoutDashboard } from "lucide-react";
import { useParams } from "react-router-dom";

// Placeholder component imports for other dashboards
// import LeadsDashboard from "../components/LeadsDashboard";
// import DealsDashboard from "../components/DealsDashboard";

export default function DashboardPage() {
  const { department } = useParams();
  // 1. Manage the active dashboard state ('sales', 'leads', 'deals', etc.)
  // 2. Map the active state key to its corresponding component view
  const renderDashboardView = () => {
    switch (department) {
      case "sales":
        return <Dashboard />;
      case "purchase":
        // Fallback to SalesDashboard if you haven't created these files yet
        return <div className="p-20 text-slate-600 font-medium">Purchase Overview Panel (Coming Soon)</div>; 
      case "finance":
        return <div className="p-20 text-slate-600 font-medium">Finance Overview Panel (Coming Soon)</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Pass state and state updater down to Header */}
      <Header
        icon={<LayoutDashboard className="w-5 h-5 text-slate-700" />}
      />
      
      <Sidebar />

      {/* Main Content Area Layout Container */}
      <main>
        {renderDashboardView()}
      </main>
    </div>
  );
}