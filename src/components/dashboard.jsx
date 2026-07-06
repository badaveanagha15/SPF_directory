import {useState } from "react";
import { UserPlus, AlertCircle, ArrowUpRight, Clock,ArrowRight , CheckCircle2, CalendarDays} from 'lucide-react';

const Column = ({ title }) => {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "All My", "Shared"];

  const stats = [
    {
      label: "New",
      value: "12",
      icon: UserPlus,
      color: "blue",
      trend: "+14%",
      description: "Since last week"
    },
    {
      label: "Needs Attention",
      value: "05",
      icon: AlertCircle,
      color: "amber",
      trend: "High Priority",
      description: "Requires immediate follow-up"
    }
  ];

 
  /* DUMMY DATA */
const smartlistData =
  title === "Leads"
    ? [
        { name: "New Leads", count: 12, owner: "Akshay", type: "All" },
        { name: "Contacted Leads", count: 8, owner: "Rohit", type: "All My" },
        { name: "Qualified Leads", count: 5, owner: "Rinku", type: "Shared" },
      ]
    : [
        { name: "Open Deals", count: 6, owner: "Akshay", type: "All" },
        { name: "Won Deals", count: 3, owner: "Rohit", type: "All My" },
        { name: "Lost Deals", count: 2, owner: "Rinku", type: "Shared" },
      ];

/* FILTER BASED ON TAB */
const filteredData =
  activeTab === "All"
    ? smartlistData
    : smartlistData.filter((item) => item.type === activeTab);

  return (
    <div className="space-y-4 mt-6">

      {/* HEADER */}
      <div className="flex items-center gap-2 text-[15px] font-semibold">
        ☑ {title}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {stats.map((card) => (
        <div
          key={card.label}
          className="group relative bg-white border border-slate-200 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:border-blue-500/30 cursor-pointer overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Compact Icon Section */}
              <div className={`p-2.5 rounded-lg transition-all duration-300 ${
                card.color === 'blue' 
                  ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' 
                  : 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white'
              }`}>
                <card.icon size={18} strokeWidth={2.5} />
              </div>

              <div>
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {card.label} {title}
                </h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-black text-slate-900 tracking-tight">
                    {card.value}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">UNITS</span>
                </div>
              </div>
            </div>

            {/* Compact Trend Badge */}
            <div className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter ${
              card.color === 'blue' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
            }`}>
              {card.trend}
            </div>
          </div>
          
          {/* Subtle Bottom Accent */}
          <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 group-hover:w-full w-0 ${
            card.color === 'blue' ? 'bg-blue-500' : 'bg-amber-500'
          }`} />
        </div>
      ))}
    </div>
      {/* MAIN CARD */}
      <div className="bg-white border border-gray-200 rounded">

        {/* HEADER */}
        <div className="flex justify-between p-4 border-b">
          <span className="text-sm font-medium">Grouped Smartlists</span>
          <span className="text-[11px] text-gray-500">
            Apr 1, 2026 (05:30 am) to Apr 30, 2026 (05:29 am)
          </span>
        </div>

        {/* TABS */}
        <div className="flex border-b">
          {tabs.map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[13px] px-4 py-2 cursor-pointer ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
            >
              {tab} {title.toLowerCase()}
            </div>
          ))}
        </div>

        {/* SMARTLIST SECTION */}
    {filteredData.length > 0 ? (
      <div className="divide-y text-sm">
        {filteredData.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition"
          >
            {/* LEFT */}
            <div>
              <div className="font-medium text-gray-800">
                {item.name}
              </div>
              <div className="text-xs text-gray-400">
                Owner: {item.owner}
              </div>
            </div>

            {/* RIGHT */}
            <div className="text-right">
              <div className="text-sm font-semibold text-blue-600">
                {item.count}
              </div>
              <div className="text-xs text-gray-400">
                records
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      /* EMPTY STATE */
      <div className="p-12 text-center text-gray-500">
        <div className="text-4xl mb-3">📁</div>
        <p className="text-[13px] mb-2">
          No data available for "{activeTab}"
        </p>
        <span className="text-blue-600 text-sm cursor-pointer">
          Try changing filters
        </span>
      </div>
    )}

        {/* FOOTER */}
        <div className="flex justify-between items-center p-3 text-[11px] text-gray-500 border-t">
          <span>Showing 1-5 of 8 items</span>
          <div className="flex gap-2">
            <span className="text-blue-600 cursor-pointer">1</span>
            <span className="cursor-pointer">2</span>
            <span className="cursor-pointer">Next</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskSection = () => {
  const tasks = [
    {
      title: "Follow up with Rinku",
      type: "Call",
      owner: "Akshay",
      due: "Today",
      status: "Pending",
    },
    {
      title: "Send proposal to Akshay",
      type: "Email",
      owner: "Rohit",
      due: "Tomorrow",
      status: "Completed",
    },
  ];

   const taskStats = [
    {
      label: "Overdue",
      value: "03",
      icon: AlertCircle,
      color: "red",
      trend: "Immediate",
    },
    {
      label: "Due Today",
      value: "08",
      icon: CalendarDays,
      color: "blue",
      trend: "Focus",
    },
    {
      label: "Pending",
      value: "12",
      icon: Clock,
      color: "slate",
      trend: "Upcoming",
    },
    {
      label: "Completed",
      value: "45",
      icon: CheckCircle2,
      color: "green",
      trend: "Weekly",
    }
  ];

  return (
    <div className="space-y-4">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="text-[15px] font-semibold flex items-center gap-2">
          📋 Tasks
        </div>
        <button className="text-sm text-blue-600">View All</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {taskStats.map((stat) => (
        <div
          key={stat.label}
          className="group relative bg-white border border-slate-200 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:border-blue-500/30 cursor-pointer overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg transition-all duration-300 ${
                stat.color === 'red' ? 'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white' :
                stat.color === 'blue' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' :
                stat.color === 'green' ? 'bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white' :
                'bg-slate-50 text-slate-600 group-hover:bg-slate-600 group-hover:text-white'
              }`}>
                <stat.icon size={16} strokeWidth={2.5} />
              </div>

              <div>
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                  {stat.label}
                </h3>
                <span className={`text-xl font-black tracking-tight ${
                  stat.color === 'red' ? 'text-red-600' : 'text-slate-900'
                }`}>
                  {stat.value}
                </span>
              </div>
            </div>

            <div className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase ${
              stat.color === 'red' ? 'bg-red-50 text-red-700' :
              stat.color === 'blue' ? 'bg-blue-50 text-blue-700' :
              stat.color === 'green' ? 'bg-green-50 text-green-700' :
              'bg-slate-50 text-slate-700'
            }`}>
              {stat.trend}
            </div>
          </div>
          
          <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 group-hover:w-full w-0 ${
            stat.color === 'red' ? 'bg-red-500' :
            stat.color === 'blue' ? 'bg-blue-500' :
            stat.color === 'green' ? 'bg-green-500' :
            'bg-slate-500'
          }`} />
        </div>
      ))}
    </div>

      {/* TABLE */}
      <div className="bg-white border rounded overflow-hidden">
        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="p-2 text-left">Task</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Owner</th>
              <th className="p-2 text-left">Due</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">

                <td className="p-2 font-medium text-gray-800">
                  {task.title}
                </td>

                <td className="p-2 text-gray-600">
                  {task.type}
                </td>

                <td className="p-2 text-gray-600">
                  {task.owner}
                </td>

                <td className="p-2 text-gray-600">
                  {task.due}
                </td>

                <td className="p-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      task.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function Dashboard() {
        const [date, setDate] = useState(new Date());

        const changeDate = (step) => {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() + step);
            setDate(newDate);
        };

        const isToday = (d) => {
            const today = new Date();
            return (
                d.getDate() === today.getDate() &&
                d.getMonth() === today.getMonth() &&
                d.getFullYear() === today.getFullYear()
            );
        };

  return (
    <div className="h-screen flex bg-[#F4F7F9] font-sans">

      {/* MAIN */}
      <div className="ml-[60px] flex-1 flex flex-col">

        {/* HEADER */}
        

        
  {/* CONTENT */}
  <div className="flex-1 overflow-auto p-6 pt-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-8">
      <Column title="Leads" />
      <Column title="Deals" />
    </div>
    <div className="mt-3">
        <TaskSection/>
    </div>
  </div>
      </div>
    </div>
  );
}