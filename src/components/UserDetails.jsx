import { useState } from "react";
import {
  MoreHorizontal,
  Pencil,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Target,
  Trophy,
  TrendingUp,
  Users,
  Briefcase,
  DollarSign,
  CheckCircle2,
  Clock3,
  FileText,
  X,
  Edit3,
  UserCircle2,
  Building2,
  Star,
} from "lucide-react";

export default function UserDetails() {
  const [showEditModal, setShowEditModal] = useState(false);

  const [userData, setUserData] = useState({
    name: "Rinku Singh",
    role: "Sales Manager",
    department: "Sales",
    email: "rinku@email.com",
    phone: "+91 9650394795",
    location: "New Delhi, India",
    joiningDate: "12 Jan 2024",
    manager: "Akshay Mehta",
    employeeId: "EMP-2026-001",
    totalSales: "₹18,75,000",
    targetMonth: "₹25,00,000",
    targetWeek: "₹6,00,000",
    targetYear: "₹2,00,00,000",
    monthlyProgress: 75,
    weeklyProgress: 68,
    yearlyProgress: 54,
    leadsHandled: 245,
    dealsWon: 48,
    dealsLost: 11,
    conversionRate: "19.5%",
    tasksCompleted: 34,
    pendingTasks: 8,
    performanceRating: "4.7/5",
    bio: "Top performing sales manager handling enterprise accounts and high-value deals.",
  });

  const [notes, setNotes] = useState([
    "Needs follow-up review for enterprise quarterly targets.",
  ]);
  const [newNote, setNewNote] = useState("");

  const [activities] = useState([
    {
      title: "Closed ABC Enterprise Deal",
      time: "Today",
      icon: <CheckCircle2 size={15} className="text-green-600" />,
    },
    {
      title: "Follow-up meeting with client",
      time: "Yesterday",
      icon: <Clock3 size={15} className="text-blue-600" />,
    },
    {
      title: "Updated pricing proposal",
      time: "2 days ago",
      icon: <FileText size={15} className="text-purple-600" />,
    },
  ]);

  const [deals] = useState([
    {
      name: "Enterprise CRM Subscription",
      value: "₹4,50,000",
      status: "Won",
    },
    {
      name: "Annual Renewal Package",
      value: "₹2,10,000",
      status: "Negotiation",
    },
  ]);

  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes([newNote, ...notes]);
    setNewNote("");
  };

  const updateField = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  return (
    <div className="ml-[60px] pt-16 p-6 bg-[#F1F5F9] min-h-screen">
    
        {/* HEADER */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-5">
          <div className="flex justify-between items-start">
            {/* LEFT SIDE */}
            <div className="flex gap-5">
              {/* AVATAR */}
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center shadow-lg">
                  <UserCircle2 size={48} />
                </div>
              </div>

              {/* USER INFO */}
              <div>
                <div className="flex items-center gap-3">
                  <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                    Employee Profile
                  </p>

                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                    Active
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-slate-800 mt-2">
                  {userData.name}
                </h1>

                <p className="text-sm mt-1 text-slate-500 font-medium">
                  {userData.role} • {userData.department}
                </p>

                
              </div>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowEditModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 shadow-sm"
              >
                Edit Profile
              </button>

              <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50">
                <MoreHorizontal size={18} className="text-slate-600" />
              </button>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-4 gap-4 mt-2 pt-5 border-t border-slate-100">
            <StatCard
              icon={<DollarSign size={18} />}
              title="Total Sales"
              value={userData.totalSales}
            />
            <StatCard
              icon={<Briefcase size={18} />}
              title="Deals Won"
              value={userData.dealsWon}
            />
            <StatCard
              icon={<Users size={18} />}
              title="Leads Managed"
              value={userData.leadsHandled}
            />
            <StatCard
              icon={<Star size={18} />}
              title="Performance"
              value={userData.performanceRating}
            />
          </div>
        </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-[31%_35%_31%] gap-4">
        {/* LEFT */}
        <div className="space-y-4">
          <Card title="Profile Information">
            <EditableRow
              label="Employee ID"
              value={userData.employeeId}
              onChange={(v) => updateField("employeeId", v)}
            />

            <EditableRow
              label="Manager"
              value={userData.manager}
              onChange={(v) => updateField("manager", v)}
            />

            <EditableRow
              label="Email"
              value={userData.email}
              icon={<Mail size={14} />}
              onChange={(v) => updateField("email", v)}
            />

            <EditableRow
              label="Phone"
              value={userData.phone}
              icon={<Phone size={14} />}
              onChange={(v) => updateField("phone", v)}
            />

            <EditableRow
              label="Location"
              value={userData.location}
              icon={<MapPin size={14} />}
              onChange={(v) => updateField("location", v)}
            />

            <EditableRow
              label="Joining Date"
              value={userData.joiningDate}
              icon={<Calendar size={14} />}
              onChange={(v) => updateField("joiningDate", v)}
            />

            <EditableRow
              label="Department"
              value={userData.department}
              icon={<Building2 size={14} />}
              onChange={(v) => updateField("department", v)}
            />
          </Card>

          <Card title="Targets">
            <ProgressRow
              title="Monthly Target"
              target={userData.targetMonth}
              progress={userData.monthlyProgress}
            />
            <ProgressRow
              title="Weekly Target"
              target={userData.targetWeek}
              progress={userData.weeklyProgress}
            />
            <ProgressRow
              title="Yearly Target"
              target={userData.targetYear}
              progress={userData.yearlyProgress}
            />
          </Card>

          <Card title="Performance Metrics">
            <Metric label="Conversion Rate" value={userData.conversionRate} />
            <Metric label="Tasks Completed" value={userData.tasksCompleted} />
            <Metric label="Pending Tasks" value={userData.pendingTasks} />
            <Metric label="Deals Lost" value={userData.dealsLost} />
          </Card>
        </div>

        {/* CENTER */}
        <div className="space-y-4">
          <Card title="Activity Timeline">
            <div className="space-y-4">
              {activities.map((item, i) => (
                <div key={i} className="flex gap-3 border-b pb-3 last:border-none">
                  <div>{item.icon}</div>
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Bio">
            <textarea
              rows={5}
              value={userData.bio}
              onChange={(e) => updateField("bio", e.target.value)}
              className="w-full border rounded-lg p-3 text-sm"
            />
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <Card title={`Deals (${deals.length})`}>
            <div className="space-y-3">
              {deals.map((deal, i) => (
                <div
                  key={i}
                  className="border rounded-lg p-3 hover:bg-gray-50"
                >
                  <p className="font-medium text-blue-600">{deal.name}</p>
                  <p className="text-xs text-gray-500">{deal.value}</p>
                  <p className="text-xs text-green-600">{deal.status}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Notes">
            <textarea
              rows={3}
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add note..."
              className="w-full border rounded-lg p-3 text-sm"
            />

            <button
              onClick={addNote}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
            >
              Add Note
            </button>

            <div className="space-y-2 mt-3">
              {notes.map((note, i) => (
                <div
                  key={i}
                  className="bg-slate-50 border rounded-lg p-3 text-sm"
                >
                  {note}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* MODAL */}
      {showEditModal && (
        <Modal title="Edit User" onClose={() => setShowEditModal(false)}>
          <FormInput label="Name" />
          <FormInput label="Role" />
          <FormInput label="Department" />
          <FormInput label="Email" />
        </Modal>
      )}
    </div>
  );
}

/* COMPONENTS */

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <h3 className="font-medium text-sm text-gray-700 mb-3">{title}</h3>
      {children}
    </div>
  );
}

function EditableRow({ label, value, onChange, icon }) {
  return (
    <div className="flex justify-between items-center border-b py-3 last:border-none">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        {icon}
        {label}
      </div>

      <div className="flex items-center gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-sm border rounded px-2 py-1 text-right"
        />
        <Pencil size={13} className="text-gray-400" />
      </div>
    </div>
  );
}

function ProgressRow({ title, target, progress }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{title}</span>
        <span>{target}</span>
      </div>
      <div className="w-full h-2 bg-slate-200 rounded-full">
        <div
          className="h-2 bg-blue-600 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">{progress}% achieved</p>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="flex justify-between border-b py-3 text-sm last:border-none">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        {icon}
        {title}
      </div>
      <p className="text-xl font-bold text-slate-800 mt-2">{value}</p>
    </div>
  );
}

function HeaderInfo({ icon, text }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-600 hover:bg-slate-100 transition">
      <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
        {icon}
      </div>
      <span>{text}</span>
    </div>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-[500px] mx-4 p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">{title}</h2>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3">{children}</div>

        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-sm"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function FormInput({ label }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <input className="w-full border rounded-lg px-3 py-2" />
    </div>
  );
}