import {useState } from "react";

const Column = ({ title }) => {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "All My", "Shared"];
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
    <div className="space-y-4">

      {/* HEADER */}
      <div className="flex items-center gap-2 text-[15px] font-semibold">
        ☑ {title}
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 gap-4">
        {["New", "Needs Attention"].map((label) => (
          <div
            key={label}
            className="bg-white border border-gray-200 rounded p-4 hover:-translate-y-1 hover:shadow transition"
          >
            <div className="text-[11px] text-gray-500">
              {label} {title}
            </div>
            <div className="text-[24px] font-bold">0</div>
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

  return (
    <div className="space-y-4">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="text-[15px] font-semibold flex items-center gap-2">
          📋 Tasks
        </div>
        <button className="text-sm text-blue-600">View All</button>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border rounded p-4">
          <div className="text-xs text-gray-500">Pending Tasks</div>
          <div className="text-2xl font-bold">12</div>
        </div>

        <div className="bg-white border rounded p-4">
          <div className="text-xs text-gray-500">Overdue Tasks</div>
          <div className="text-2xl font-bold text-red-500">3</div>
        </div>
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
        <header className="h-[56px] bg-white border-b border-gray-200 flex justify-between items-center px-6 sticky top-14 z-10 ">

          {/* LEFT */}
          <div className="flex items-center gap-4">

            <div className="text-[15px] font-semibold">
              <span className="text-blue-600">F1</span>&nbsp;
              <span className="text-gray-400 font-light">Sales</span>
            </div>

            <div className="h-6 w-px bg-gray-300"></div>

            <div className="text-sm cursor-pointer">
              Default Dashboard ▼
            </div>

            <button className="bg-blue-600 text-white text-[13px] h-8 px-3 rounded">
              + Create New
            </button>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-6 text-sm text-gray-500">

            <span>Qna</span>
            <span>Learn</span>
            <span>Demo</span>

            {/* Notification */}
            {/* <div className="relative">
              🔔
              <span className="absolute -top-2 -right-2 text-[10px] bg-gray-300 px-1 rounded-full">
                0
              </span>
            </div> */}

            {/* DATE NAV */}
            <div className="flex items-center border rounded bg-white">
              <button onClick={() => changeDate(-1)} className="px-2">
                &lt;
              </button>

              <div className="px-4 text-center">
                <div className="text-sm font-semibold">
                   {isToday(date)
                        ? "Today"
                        : date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}
                </div>
                <div className="text-[10px] text-gray-500">
                  Tasks • Meetings
                </div>
              </div>

              <button onClick={() => changeDate(1)} className="px-2">
                &gt;
              </button>
            </div>
          </div>
        </header>

        
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