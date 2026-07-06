import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  ShoppingBag,
  Wallet,
  LayoutDashboard,
  Users,
  Handshake,
  Building2,
  Contact,
  Boxes,
  Truck,
  FileText,
  Receipt,
  CreditCard,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const menuData = [
    {
      department: "Sales",
      icon: <BarChart3 size={20} />,
      gradient: "from-blue-600 to-indigo-600",
      shadow: "shadow-blue-100",
      items: [
        { title: "Dashboard", path: "/sales/dashboard", icon: <LayoutDashboard size={15} />, styles: "from-blue-500/20 to-cyan-500/10 text-blue-600 border-blue-200/60" },
        { title: "Leads", path: "/sales/leads", icon: <Users size={15} />, styles: "from-orange-500/20 to-amber-500/10 text-orange-600 border-orange-200/60" },
        { title: "Customer DBM", path: "/accounts", icon: <Building2 size={15} />, styles: "from-purple-500/20 to-indigo-500/10 text-purple-600 border-purple-200/60" },
        { title: "Deals", path: "/sales/deals", icon: <Handshake size={15} />, styles: "from-emerald-500/20 to-teal-500/10 text-emerald-600 border-emerald-200/60" },
        // { title: "Contacts", path: "/contacts", icon: <Contact size={15} />, styles: "from-pink-500/20 to-rose-500/10 text-pink-600 border-pink-200/60" },
      ],
    },
    {
      department: "Purchase",
      icon: <ShoppingBag size={20} />,
      gradient: "from-amber-500 to-orange-600",
      shadow: "shadow-orange-100",
      items: [
        { title: "Dashboard", path: "/purchase/dashboard", icon: <FileText size={15} />, styles: "from-cyan-500/20 to-blue-500/10 text-cyan-600 border-cyan-200/60" },
        { title: "Deal Management", path: "/purchase/deals", icon: <Truck size={15} />, styles: "from-yellow-500/20 to-amber-500/10 text-amber-600 border-amber-200/60" },
        // { title: "Products", path: "/products", icon: <Boxes size={15} />, styles: "from-fuchsia-500/20 to-pink-500/10 text-fuchsia-600 border-fuchsia-200/60" },
      ],
    },
    {
      department: "Finance",
      icon: <Wallet size={20} />,
      gradient: "from-violet-600 to-purple-600",
      shadow: "shadow-purple-100",
      items: [
        { title: "Dashboard", path: "/finance/dashboard", icon: <Receipt size={15} />, styles: "from-teal-500/20 to-emerald-500/10 text-teal-600 border-teal-200/60" },
        { title: "Deal Management", path: "/finance/deals", icon: <FileText size={15} />, styles: "from-rose-500/20 to-red-500/10 text-rose-600 border-rose-200/60" },
        { title: "Payments", path: "/payments", icon: <CreditCard size={15} />, styles: "from-violet-500/20 to-purple-500/10 text-violet-600 border-violet-200/60" },
      ],
    },
  ];

  return (
    <aside className="fixed left-0 top-16 z-30 h-screen w-[68px] border-r border-slate-100 bg-white pt-6 shadow-[2px_0_12px_rgba(0,0,0,0.015)]">
      <div className="flex flex-col gap-2.5 px-2.5">
        {menuData.map((dept, index) => {
          const isDepartmentActive = dept.items.some(
            (item) => item.path === location.pathname
          );

          return (
            <div key={index} className="group relative flex justify-center">
              {/* Main Department Trigger */}
              <div
                className={`relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl transition-all duration-300 ${
                  isDepartmentActive
                    ? `bg-gradient-to-br ${dept.gradient} ${dept.shadow} shadow-md text-white`
                    : "text-slate-400 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                {/* Active Bar indicator */}
                {isDepartmentActive && (
                  <div className="absolute -left-[10px] top-2.5 bottom-2.5 w-1 rounded-r-full bg-blue-600" />
                )}
                <div className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  {dept.icon}
                </div>
              </div>

              {/* Seamless Hover Bridge */}
              <div className="absolute left-full top-0 h-full w-4" />

              {/* Luxury Flyout Menu Layout */}
              <div className="absolute left-[58px] top-0 w-68 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] opacity-0 translate-x-4 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto">
                {/* Header Block with glass look */}
                <div className="border-b border-slate-100 bg-slate-50/40 px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {dept.department} Workspace
                      </h3>
                      <p className="text-xs font-semibold text-slate-800 mt-0.5">
                        {dept.items.length} Essential Tools
                      </p>
                    </div>
                    <div className={`flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br ${dept.gradient} text-white opacity-80 shadow-sm`}>
                      {dept.icon}
                    </div>
                  </div>
                </div>

                {/* Sub Menu Option Iteration */}
                <div className="p-2 space-y-0.5">
                  {dept.items.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`group/item flex items-center justify-between rounded-xl px-5 py-2.5 text-xs font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-slate-50 text-slate-900 font-semibold shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] border border-slate-100"
                            : "text-slate-600 hover:bg-slate-50/80 hover:text-slate-900 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Premium Mesh Effect Icon Container */}
                          <div
                            className={`flex h-8 w-8 items-center justify-center border rounded-xl transition-all duration-300 shadow-sm ${
                              isActive
                                ? `bg-gradient-to-tr ${item.styles} scale-105 shadow-inner`
                                : `bg-slate-50 border-slate-100 text-slate-400 group-hover/item:bg-gradient-to-tr group-hover/item:${item.styles.split(' ')[0]} group-hover/item:${item.styles.split(' ')[1]} group-hover/item:${item.styles.split(' ')[2]} group-hover/item:scale-105 group-hover/item:rotate-3`
                            }`}
                          >
                            {item.icon}
                          </div>
                          <span className={`tracking-wide font-medium transition-colors ${isActive ? "text-blue-600 font-bold" : "group-hover/item:text-slate-900"}`}>
                            {item.title}
                          </span>
                        </div>

                        <ChevronRight
                          size={12}
                          className={`transition-all duration-300 ${
                            isActive
                              ? "text-blue-500 opacity-100 translate-x-0"
                              : "text-slate-300 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                          }`}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Brand Badge Footer */}
      <div className="absolute bottom-5 left-0 w-full flex justify-center px-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-[10px] font-black tracking-widest text-white shadow-lg shadow-slate-200 transition-all duration-300 hover:scale-105 hover:shadow-xl">
          ERP
        </div>
      </div>
    </aside>
  );
}