import { useState } from "react";
import {
  Calendar,
  Mail,
  Phone,
  FileText,
  Clock,
  CheckCircle2,
  Pencil,
  Upload,
  ChevronDown,
  MoreHorizontal,
  User,
  Bot,
  Package,
} from "lucide-react";

export default function DealDetails() {
  const stages = [
    "Qualify",
    "Meet & Present",
    "Propose",
    "Negotiate",
    "Closed",
  ];

  const [currentStage, setCurrentStage] = useState(0);

  const deal = {
    name: "abcdprivateltd-",
    account: "abcdprivateltd",
    closeDate: "30/06/2026",
    amount: "₹1,50,000",
    owner: "Rinku Singh",
    probability: "10%",
    forecast: "Pipeline",
    nextStep: "Follow-up Demo",
  };

  const activities = [
    {
      type: "Task",
      icon: CheckCircle2,
      color: "bg-green-500",
      title: "Other",
      desc: "You have an upcoming task with Rinku Singh",
      date: "25-Apr",
    },
  ];

  return (
    <div className="ml-[60px] pt-16 p-6 bg-[#F1F5F9] min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <p className="text-xs text-gray-500">Opportunity</p>
          <h1 className="text-3xl font-semibold text-slate-800">
            {deal.name}
          </h1>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-md bg-white text-sm">
            New Event
          </button>
          <button className="px-4 py-2 border rounded-md bg-white text-sm">
            New Task
          </button>
          <button className="px-4 py-2 border rounded-md bg-white text-sm">
            Edit
          </button>
          <button className="px-3 py-2 border rounded-md bg-white">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* PIPELINE */}
      <div className="bg-white border rounded-xl shadow-sm p-4 mb-5">
        <div className="flex gap-2 mb-4">
          {stages.map((stage, i) => (
            <button
              key={i}
              onClick={() => setCurrentStage(i)}
              className={`flex-1 py-3 rounded-md text-sm font-medium ${
                i === currentStage
                  ? "bg-blue-600 text-white"
                  : i < currentStage
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {stage}
            </button>
          ))}
        </div>

        <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">
          Mark Stage as Complete
        </button>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-[32%_36%_32%] gap-4">
        {/* LEFT */}
        <div className="space-y-4">
          {/* ABOUT */}
          <div className="bg-white border rounded-xl shadow-sm">
            <div className="px-4 py-3 border-b font-semibold">About</div>

            {[
              ["Opportunity Name", deal.name],
              ["Account Name", deal.account],
              ["Close Date", deal.closeDate],
              ["Amount", deal.amount],
              ["Description", "-"],
              ["Opportunity Owner", deal.owner],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between px-4 py-3 border-b text-sm hover:bg-gray-50"
              >
                <span className="text-gray-500">{label}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>

          {/* STATUS */}
          <div className="bg-white border rounded-xl shadow-sm">
            <div className="px-4 py-3 border-b font-semibold">Status</div>

            {[
              ["Stage", stages[currentStage]],
              ["Probability (%)", deal.probability],
              ["Forecast Category", deal.forecast],
              ["Next Step", deal.nextStep],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between px-4 py-3 border-b text-sm hover:bg-gray-50"
              >
                <span className="text-gray-500">{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>

          {/* HISTORY */}
          <div className="bg-white border rounded-xl shadow-sm">
            <div className="px-4 py-3 border-b font-semibold">History</div>

            <div className="px-4 py-3 text-sm border-b">
              <p className="font-medium">Created By</p>
              <p className="text-gray-500">Rinku Singh · 24/04/2026</p>
            </div>

            <div className="px-4 py-3 text-sm">
              <p className="font-medium">Last Modified By</p>
              <p className="text-gray-500">Rinku Singh · 24/04/2026</p>
            </div>
          </div>
        </div>

        {/* CENTER */}
        <div className="space-y-4">
          {/* TOOLBAR */}
          <div className="bg-white border rounded-xl shadow-sm p-4">
            <div className="flex gap-3 mb-4">
              <button className="p-3 rounded-full border">
                <Mail size={16} />
              </button>
              <button className="p-3 rounded-full border">
                <Calendar size={16} />
              </button>
              <button className="p-3 rounded-full border">
                <Phone size={16} />
              </button>
              <button className="p-3 rounded-full border">
                <FileText size={16} />
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span>Only show activities with insights</span>
              <div className="w-10 h-5 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          {/* ACTIVITY */}
          <div className="bg-white border rounded-xl shadow-sm p-4">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Upcoming & Overdue</span>
              <button className="text-blue-600 text-sm">Expand All</button>
            </div>

            {activities.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex gap-3 p-3 border rounded-lg mb-3 hover:bg-gray-50"
                >
                  <div
                    className={`w-9 h-9 rounded-full ${item.color} flex items-center justify-center text-white`}
                  >
                    <Icon size={16} />
                  </div>

                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>

                  <span className="text-sm text-red-500">{item.date}</span>
                </div>
              );
            })}

            <button className="w-full mt-3 py-2 bg-blue-600 text-white rounded-md">
              Show All Activities
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          

          {/* AI */}
          <div className="bg-white border rounded-xl shadow-sm p-6 text-center">
            <Bot className="mx-auto text-blue-600 mb-3" size={40} />
            <h3 className="font-semibold mb-2">AI Summary</h3>
            <p className="text-sm text-gray-500 mb-4">
              Start with a prompt
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">
              Deal Summary ✨
            </button>
          </div>

          {/* CONTACT ROLES */}
          <div className="bg-white border rounded-xl shadow-sm">
            <div className="px-4 py-3 border-b font-semibold">
              Contact Roles (1)
            </div>

            <div className="px-4 py-3 text-sm">
              <p className="font-medium text-blue-600">Rinku Singh</p>
              <p className="text-gray-500">Primary Contact</p>
            </div>

            <div className="text-center py-3 border-t text-blue-600 text-sm">
              View All
            </div>
          </div>

          {/* FILES */}
          <div className="bg-white border rounded-xl shadow-sm">
            <div className="px-4 py-3 border-b font-semibold">Files (0)</div>

            <div className="m-4 border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="mx-auto mb-3 text-blue-600" />
              <button className="px-4 py-2 border rounded-md text-sm">
                Upload Files
              </button>
              <p className="text-xs text-gray-500 mt-2">Or drop files</p>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="bg-white border rounded-xl shadow-sm">
            <div className="px-4 py-3 flex justify-between items-center">
              <span className="font-semibold">Products (0)</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}