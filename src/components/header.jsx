import { useState, useRef, useEffect } from "react";
import {
  Menu,
  Search,
  Plus,
  Megaphone,
  HelpCircle,
  Bell,
  ChevronDown,
  Check,
  User,
  Settings,
  LogOut,
  Sparkles,
  LayoutDashboard,
} from "lucide-react";

import { useNavigate,useParams } from "react-router-dom";

const dashboards = [
  {
    id: "sales",
    label: "Sales Dashboard",
    description: "Manage Leads & Deals",
  },
  {
    id: "purchase",
    label: "Purchase Dashboard",
    description: "Purchase Leads & Orders",
  },
  {
    id: "finance",
    label: "Finance Dashboard",
    description: "Manage Invoices & Payments",
  },
];

export default function Header({
  currentDashboard,
  onDashboardChange,
  icon,
}) {
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const { department } = useParams();

  const workspaceRef = useRef(null);
  const profileRef = useRef(null);

  const handleWorkspaceChange = (dash) => {
    navigate(`/${dash.id}/dashboard`);
    setWorkspaceOpen(false);
};

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        workspaceRef.current &&
        !workspaceRef.current.contains(e.target)
      ) {
        setWorkspaceOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const activeDashboard =
    dashboards.find((d) => d.id === department) ||
    dashboards[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">

      <div className="flex items-center justify-between h-full px-6">

        {/* ========================= LEFT SECTION ========================= */}

        <div className="flex items-center gap-5">

          {/* Menu */}

          <button className="h-10 w-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-blue-300 transition-all duration-200 flex items-center justify-center shadow-sm">
            <Menu className="w-5 h-5 text-slate-600" />
          </button>

          {/* Brand */}

          <div className="flex items-center gap-3">

            <div className="relative">

              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">

                <Sparkles className="w-5 h-5 text-white" />

              </div>

              <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>

            </div>

            <div className="hidden lg:block">

              <h2 className="text-sm font-bold text-slate-800 tracking-wide">
                Pseudo SPF
              </h2>

              <p className="text-[11px] uppercase tracking-[2px] text-slate-400 font-medium">
                Enterprise Suite
              </p>

            </div>

          </div>

          <div className="h-8 w-px bg-slate-200"></div>

          {/* ================= WORKSPACE DROPDOWN ================= */}

          <div
            ref={workspaceRef}
            className="relative"
          >

            <button
              onClick={() =>
                setWorkspaceOpen(!workspaceOpen)
              }
              className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 shadow-sm"
            >

              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                {icon || <LayoutDashboard size={18} />}
              </div>

              <div className="hidden md:block text-left">

                <p className="text-[10px] uppercase tracking-[2px] text-slate-400 font-semibold">
                  Workspace
                </p>

                <h3 className="text-sm font-semibold text-slate-700">
                  {activeDashboard.label}
                </h3>

              </div>

              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform duration-300 ${
                  workspaceOpen ? "rotate-180" : ""
                }`}
              />

            </button>
                        {/* ================= WORKSPACE DROPDOWN ================= */}

            {workspaceOpen && (
              <div className="absolute left-0 top-full mt-3 w-80 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">

                {/* Header */}

                <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 px-6 py-5">

                  <p className="text-[11px] uppercase tracking-[2px] text-blue-100 font-semibold">
                    Workspace
                  </p>

                  <h3 className="text-white text-lg font-bold mt-1">
                    Select Dashboard
                  </h3>

                  <p className="text-blue-100 text-xs mt-1">
                    Switch between CRM workspaces
                  </p>

                </div>

                {/* Dashboard List */}

                <div className="py-3">

                  {dashboards.map((dash) => {

                    const active =
                      dash.id === currentDashboard;

                    return (
                      <button
                        key={dash.id}
                        onClick={() => {
                          handleWorkspaceChange(dash)
                        }}
                        className={`w-full px-5 py-4 flex items-center justify-between transition-all duration-200 ${
                          active
                            ? "bg-blue-50"
                            : "hover:bg-slate-50"
                        }`}
                      >

                        <div className="flex items-center gap-4">

                          <div
                            className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                              active
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <LayoutDashboard size={18} />
                          </div>

                          <div className="text-left">

                            <h4
                              className={`font-semibold ${
                                active
                                  ? "text-blue-600"
                                  : "text-slate-700"
                              }`}
                            >
                              {dash.label}
                            </h4>

                            <p className="text-xs text-slate-400 mt-1">
                              {dash.description}
                            </p>

                          </div>

                        </div>

                        {active && (
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow">

                            <Check
                              size={16}
                              className="text-white"
                            />

                          </div>
                        )}

                      </button>
                    );
                  })}

                </div>

                {/* Footer */}

                {/* <div className="border-t border-slate-100 px-5 py-3 bg-slate-50">

                  <button className="w-full rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-600 transition-all">
                    Manage Workspaces
                  </button>

                </div> */}

              </div>
            )}

          </div>

        </div>

        {/* ======================= SEARCH BAR ======================= */}

        <div className="flex-1 flex justify-center px-8">

          <div className="relative w-full max-w-3xl">

            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search Leads, Deals, Contacts, Customers, Products..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-6 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
            />

            <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-2">

              <kbd className="rounded border bg-white px-2 py-1 text-[10px] text-slate-500 shadow-sm">
                Ctrl
              </kbd>

              <kbd className="rounded border bg-white px-2 py-1 text-[10px] text-slate-500 shadow-sm">
                K
              </kbd>

            </div>

          </div>

        </div>
                {/* ========================= RIGHT SECTION ========================= */}

        <div className="flex items-center gap-3">

          {/* New Button */}

          <button className="hidden lg:flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-white shadow-lg shadow-blue-200 hover:scale-105 hover:shadow-blue-300 transition-all duration-300">

            <Plus size={18} />

            <span className="font-semibold text-sm">
              New
            </span>

          </button>

          {/* Announcement */}

          <button className="relative h-11 w-11 rounded-2xl border border-slate-200 bg-white flex items-center justify-center hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-200">

            <Megaphone size={18} />

          </button>

          {/* Help */}

          <button className="relative h-11 w-11 rounded-2xl border border-slate-200 bg-white flex items-center justify-center hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-200">

            <HelpCircle size={18} />

          </button>

          {/* Notifications */}

          <button className="relative h-11 w-11 rounded-2xl border border-slate-200 bg-white flex items-center justify-center hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-200">

            <Bell size={18} />

            <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border border-white animate-pulse"></span>

          </button>

          {/* Divider */}

          <div className="h-8 w-px bg-slate-200 mx-1"></div>

          {/* ================= PROFILE ================= */}

          <div
            ref={profileRef}
            className="relative"
          >

            <button
              onClick={() =>
                setProfileOpen(!profileOpen)
              }
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 shadow-sm"
            >

              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                A
              </div>

              <div className="hidden xl:block text-left">

                <h4 className="text-sm font-semibold text-slate-800">
                  Akshay
                </h4>

                <p className="text-xs text-slate-400">
                  Administrator
                </p>

              </div>

              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform duration-300 ${
                  profileOpen
                    ? "rotate-180"
                    : ""
                }`}
              />

            </button>

            {/* ================= PROFILE MENU ================= */}

            {profileOpen && (

              <div className="absolute right-0 top-full mt-3 w-72 rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">

                {/* User */}

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 text-white">

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center font-bold text-xl">
                      A
                    </div>

                    <div>

                      <h3 className="font-bold text-lg">
                        Akshay
                      </h3>

                      <p className="text-blue-100 text-sm">
                        Administrator
                      </p>

                    </div>

                  </div>

                </div>

                {/* Menu */}

                <div className="py-2">

                  <button className="w-full flex items-center gap-4 px-6 py-3 hover:bg-slate-50 transition">

                    <User
                      size={18}
                      className="text-slate-500"
                    />

                    <span className="font-medium text-slate-700">
                      My Profile
                    </span>

                  </button>

                  <button className="w-full flex items-center gap-4 px-6 py-3 hover:bg-slate-50 transition">

                    <Settings
                      size={18}
                      className="text-slate-500"
                    />

                    <span className="font-medium text-slate-700">
                      Settings
                    </span>

                  </button>

                  <hr className="my-2" />

                  <button className="w-full flex items-center gap-4 px-6 py-3 hover:bg-red-50 text-red-600 transition">

                    <LogOut size={18} />

                    <span className="font-medium">
                      Logout
                    </span>

                  </button>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </header>

  );
}