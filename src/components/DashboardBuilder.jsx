import React, { useMemo, useState } from "react";
import {
  Plus,
  Search,
  ChevronDown,
  LayoutDashboard,
  Settings,
  Check,
  X,
  Briefcase,
  Phone,
  Users,
  TrendingUp,
  Activity,
  BarChart3,
  Clock3,
  Shield,
} from "lucide-react";

const widgetOptions = [
  { id: "pending_tasks", label: "Pending Tasks", size: "small" },
  { id: "open_deals", label: "Open Deals", size: "medium" },
  { id: "new_leads", label: "New Leads", size: "small" },
  { id: "calls_today", label: "Calls Today", size: "small" },
  { id: "revenue_summary", label: "Revenue Summary", size: "medium" },
  { id: "activity_feed", label: "Activity Feed", size: "large" },
  { id: "team_performance", label: "Team Performance", size: "medium" },
  { id: "role_summary", label: "Role Hierarchy", size: "small" },
];

const initialDashboards = [
  {
    id: 1,
    name: "Default Dashboard",
    visibility: "shared",
    widgets: [
      { id: "pending_tasks", size: "small" },
      { id: "open_deals", size: "medium" },
      { id: "new_leads", size: "small" },
      { id: "calls_today", size: "small" },
      { id: "revenue_summary", size: "medium" },
      { id: "activity_feed", size: "large" },
      { id: "team_performance", size: "medium" },
      { id: "role_summary", size: "small" },
    ],
  },
  {
    id: 2,
    name: "Sales Dashboard",
    visibility: "private",
    widgets: [
      { id: "new_leads", size: "small" },
      { id: "open_deals", size: "medium" },
      { id: "activity_feed", size: "large" },
    ],
  },
  {
    id: 3,
    name: "Manager Dashboard",
    visibility: "shared",
    widgets: [
      { id: "team_performance", size: "medium" },
      { id: "role_summary", size: "small" },
      { id: "revenue_summary", size: "medium" },
    ],
  },
];

const getColSpan = (size) => {
  if (size === "small") return "md:col-span-3";
  if (size === "medium") return "md:col-span-6";
  return "md:col-span-12";
};

const WidgetCard = ({ title, icon: Icon, children, footer }) => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 hover:shadow-md transition">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-md bg-blue-50 text-blue-600">
          <Icon size={16} />
        </div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <button className="text-gray-400 hover:text-gray-600">
        <Settings size={16} />
      </button>
    </div>

    <div>{children}</div>

    {footer && (
      <div className="mt-4 pt-3 border-t text-xs text-gray-500">{footer}</div>
    )}
  </div>
);

const PendingTasksCard = () => (
  <WidgetCard title="Pending Tasks" icon={Clock3} footer="Updated 2 mins ago">
    <div className="text-3xl font-bold text-gray-800">18</div>
    <div className="mt-2 inline-flex px-2 py-1 rounded-full text-xs bg-red-100 text-red-600">
      5 overdue
    </div>
  </WidgetCard>
);

const OpenDealsCard = () => (
  <WidgetCard title="Open Deals" icon={Briefcase} footer="Pipeline value active">
    <div className="text-3xl font-bold text-gray-800">24</div>
    <p className="text-sm text-gray-500 mt-1">₹18,40,000 pipeline</p>
  </WidgetCard>
);

const NewLeadsCard = () => (
  <WidgetCard title="New Leads" icon={Users} footer="Compared to last week">
    <div className="text-3xl font-bold text-gray-800">146</div>
    <p className="text-green-600 text-sm mt-1">+18.2% growth</p>
  </WidgetCard>
);

const CallsTodayCard = () => (
  <WidgetCard title="Calls Today" icon={Phone} footer="Daily target 25">
    <div className="text-3xl font-bold text-gray-800">14</div>
    <p className="text-sm text-gray-500 mt-1">11 remaining</p>
  </WidgetCard>
);

const RevenueSummaryCard = () => (
  <WidgetCard title="Revenue Summary" icon={TrendingUp} footer="Monthly target progress">
    <div className="text-3xl font-bold text-gray-800">₹7,80,000</div>
    <div className="mt-4 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full bg-blue-600 w-[72%]" />
    </div>
    <p className="text-xs text-gray-500 mt-2">72% of target achieved</p>
  </WidgetCard>
);

const ActivityFeedCard = () => (
  <WidgetCard title="Activity Feed" icon={Activity} footer="Recent CRM activity">
    <div className="space-y-3">
      {[
        "Proposal email sent to ABC Pvt Ltd",
        "Follow-up call completed with Rahul Sharma",
        "Meeting scheduled for tomorrow 4 PM",
      ].map((item, i) => (
        <div key={i} className="text-sm text-gray-700 border-b pb-2">
          {item}
        </div>
      ))}
    </div>
  </WidgetCard>
);

const TeamPerformanceCard = () => (
  <WidgetCard title="Team Performance" icon={BarChart3} footer="Top performers this month">
    <div className="space-y-3">
      {[
        { name: "Rinku Singh", score: "38%" },
        { name: "Akshay Mehta", score: "32%" },
        { name: "Priya Kapoor", score: "28%" },
      ].map((rep) => (
        <div key={rep.name} className="flex justify-between text-sm">
          <span>{rep.name}</span>
          <span className="font-semibold text-blue-600">{rep.score}</span>
        </div>
      ))}
    </div>
  </WidgetCard>
);

const RoleSummaryCard = () => (
  <WidgetCard title="Role Hierarchy" icon={Shield} footer="Access structure summary">
    <div className="text-3xl font-bold text-gray-800">42</div>
    <p className="text-sm text-gray-500">Users · 9 active roles</p>
  </WidgetCard>
);

const widgetRegistry = {
  pending_tasks: PendingTasksCard,
  open_deals: OpenDealsCard,
  new_leads: NewLeadsCard,
  calls_today: CallsTodayCard,
  revenue_summary: RevenueSummaryCard,
  activity_feed: ActivityFeedCard,
  team_performance: TeamPerformanceCard,
  role_summary: RoleSummaryCard,
};

export default function DashboardBuilder() {
  const [dashboards, setDashboards] = useState(initialDashboards);
  const [currentDashboard, setCurrentDashboard] = useState(initialDashboards[0]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedWidgets, setSelectedWidgets] = useState([]);
  const [dashboardName, setDashboardName] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [saving, setSaving] = useState(false);

  const toggleWidget = (id) => {
    setSelectedWidgets((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const resetModal = () => {
    setStep(1);
    setDashboardName("");
    setVisibility("private");
    setSelectedWidgets([]);
    setShowCreateModal(false);
  };

  const saveDashboard = async () => {
    setSaving(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newDashboard = {
      id: Date.now(),
      name: dashboardName || "Untitled Dashboard",
      visibility,
      widgets: selectedWidgets.map((id) => {
        const widget = widgetOptions.find((w) => w.id === id);
        return {
          id,
          size: widget?.size || "small",
        };
      }),
    };

    const updated = [...dashboards, newDashboard];
    setDashboards(updated);
    setCurrentDashboard(newDashboard);
    setSaving(false);
    resetModal();
  };

  const renderedWidgets = useMemo(
    () => currentDashboard?.widgets || [],
    [currentDashboard]
  );

  return (
    <div className="ml-[60px] pt-16 p-6 bg-[#F1F5F9] min-h-screen">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-5 py-4 flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Dashboard Builder</h1>
          <p className="text-sm text-gray-500">
            Create and manage personalized dashboards
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={currentDashboard?.id}
            onChange={(e) =>
              setCurrentDashboard(
                dashboards.find((d) => d.id === Number(e.target.value))
              )
            }
            className="border rounded-md px-3 py-2 text-sm"
          >
            {dashboards.map((dashboard) => (
              <option key={dashboard.id} value={dashboard.id}>
                {dashboard.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus size={16} />
            Create New Dashboard
          </button>
        </div>
      </div>

      {/* Dashboard */}
      {renderedWidgets.length === 0 ? (
        <div className="bg-white rounded-lg border shadow-sm p-12 text-center">
          <LayoutDashboard className="mx-auto text-gray-300" size={40} />
          <h3 className="mt-4 text-lg font-semibold">No custom dashboard found</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {renderedWidgets.map((widget, index) => {
            const Component = widgetRegistry[widget.id];
            return (
              <div
                key={index}
                className={`col-span-1 ${getColSpan(widget.size)}`}
              >
                {Component && <Component />}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl border">
            <div className="flex justify-between items-center p-5 border-b">
              <h2 className="font-bold text-lg">Create Dashboard</h2>
              <button onClick={resetModal}>
                <X size={18} />
              </button>
            </div>

            {step === 1 && (
              <div className="p-6 space-y-5">
                <div>
                  <label className="text-sm font-medium">Dashboard Name</label>
                  <input
                    value={dashboardName}
                    onChange={(e) => setDashboardName(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 mt-2"
                    placeholder="Sales Dashboard"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Visibility</p>
                  <div className="space-y-2">
                    {["private", "shared"].map((item) => (
                      <label
                        key={item}
                        className="flex items-center gap-2 text-sm"
                      >
                        <input
                          type="radio"
                          checked={visibility === item}
                          onChange={() => setVisibility(item)}
                        />
                        {item === "private"
                          ? "Private"
                          : "Shared with Organization"}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={resetModal}
                    className="border px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {widgetOptions.map((widget) => (
                    <button
                      key={widget.id}
                      onClick={() => toggleWidget(widget.id)}
                      className={`border rounded-lg p-4 text-left relative ${
                        selectedWidgets.includes(widget.id)
                          ? "border-blue-500 bg-blue-50"
                          : "hover:border-gray-300"
                      }`}
                    >
                      {selectedWidgets.includes(widget.id) && (
                        <div className="absolute top-2 right-2 text-blue-600">
                          <Check size={16} />
                        </div>
                      )}
                      <div className="h-16 bg-slate-100 rounded mb-3" />
                      <p className="text-sm font-medium">{widget.label}</p>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="border px-4 py-2 rounded-md"
                  >
                    Back
                  </button>

                  <button
                    onClick={saveDashboard}
                    disabled={saving}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    {saving ? "Saving..." : "Save Dashboard"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}