import { useState } from "react";
import {
  Search,
  RefreshCw,
  Pencil,
  X,
  MoreVertical,
  ClipboardList,
  Calendar,
  User,
  CheckCircle2,
  Trash2,
  Share2,
  Clock3,
  AlertTriangle,
} from "lucide-react";

export default function Tasks() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showQuick, setShowQuick] = useState(false);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Follow up with ABC Client",
      owner: "Rinku Singh",
      due: "25 Apr 2026",
      status: "Open",
      priority: "High",
      notes: "",
    },
    {
      id: 2,
      title: "Prepare Proposal Deck",
      owner: "Akshay",
      due: "20 Apr 2026",
      status: "Overdue",
      priority: "Medium",
      notes: "",
    },
  ]);

  const [selectedTask, setSelectedTask] = useState(tasks[0]);

  const handleComplete = () => {
    const updated = tasks.map((task) =>
      task.id === selectedTask.id
        ? { ...task, status: "Completed" }
        : task
    );

    setTasks(updated);
    setSelectedTask({ ...selectedTask, status: "Completed" });
  };

  const getStatusBadge = (status) => {
    if (status === "Open")
      return "bg-emerald-100 text-emerald-700 border border-emerald-200";
    if (status === "Overdue")
      return "bg-rose-100 text-rose-700 border border-rose-200";
    return "bg-blue-100 text-blue-700 border border-blue-200";
  };

  return (
    <div className="ml-[60px] pt-16 h-screen flex flex-col bg-slate-50 text-sm text-slate-700">
      {/* TOP BAR */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex gap-2">
          {[
            "My Tasks (12)",
            "Today (4)",
            "Tomorrow (3)",
            "High Priority (5)",
          ].map((item, i) => (
            <button
              key={i}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-200 transition"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 border rounded-xl hover:bg-slate-100 transition">
            <RefreshCw size={16} />
          </button>

          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400 w-4 h-4" />
            <input
              placeholder="Search tasks"
              className="pl-9 pr-4 py-2 rounded-xl border border-slate-200"
            />
          </div>

          <button
            onClick={() => setShowQuick(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 active:scale-95 transition"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <div className="w-[340px] bg-white border-r overflow-y-auto">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => setSelectedTask(task)}
              className={`p-4 cursor-pointer border-b transition hover:bg-slate-50 ${
                selectedTask?.id === task.id
                  ? "bg-blue-50 border-r-4 border-blue-600"
                  : ""
              }`}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-slate-900">
                  {task.title}
                </h3>
                <MoreVertical size={16} />
              </div>

              <div className="mt-2 text-xs text-slate-500">
                <p>{task.owner}</p>
                <p className="tabular-nums">{task.due}</p>
              </div>

              <span
                className={`inline-block mt-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                  task.status
                )}`}
              >
                {task.status}
              </span>
            </div>
          ))}
        </div>

        {/* RIGHT DETAIL */}
        <div className="flex-1 p-6 overflow-y-auto">
          {selectedTask ? (
            <>
              {/* HEADER */}
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    {selectedTask.title}
                  </h1>
                  <p className="text-slate-500 mt-1">
                    Manage and track task execution
                  </p>
                </div>

                <div className="flex gap-2">
                  <button className="p-2 border rounded-xl hover:bg-slate-100">
                    <Pencil size={16} />
                  </button>
                  <button className="p-2 border rounded-xl hover:bg-slate-100">
                    <Trash2 size={16} />
                  </button>
                  <button className="p-2 border rounded-xl hover:bg-slate-100">
                    <Share2 size={16} />
                  </button>

                  <button
                    onClick={handleComplete}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                  >
                    Mark Complete
                  </button>
                </div>
              </div>

              {/* INFO CARDS */}
              <div className="grid grid-cols-3 gap-4">
                <InfoCard
                  icon={<CheckCircle2 size={18} />}
                  title="Status"
                  value={selectedTask.status}
                />

                <InfoCard
                  icon={<User size={18} />}
                  title="Assigned To"
                  value={selectedTask.owner}
                />

                <InfoCard
                  icon={<Calendar size={18} />}
                  title="Due Date"
                  value={selectedTask.due}
                />
              </div>

              {/* NOTES */}
              <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-3">
                  Notes & Updates
                </h3>

                <textarea
                  placeholder="Add notes, updates, reminders..."
                  className="w-full h-40 border rounded-xl p-4"
                />

                <div className="flex justify-end mt-4">
                  <button className="bg-blue-600 text-white px-5 py-2 rounded-xl">
                    Save Note
                  </button>
                </div>
              </div>
            </>
          ) : (
            <EmptyState setShowQuick={setShowQuick} />
          )}
        </div>
      </div>

      {/* DRAWERS */}
      {showDrawer && <AddTaskDrawer onClose={() => setShowDrawer(false)} />}

      {showQuick && (
        <QuickAddTask
          onClose={() => setShowQuick(false)}
          onOpenDrawer={() => {
            setShowQuick(false);
            setShowDrawer(true);
          }}
        />
      )}
    </div>
  );
}

/* COMPONENTS */

function InfoCard({ icon, title, value }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
      <div className="flex items-center gap-2 text-slate-500 text-xs mb-2">
        {icon}
        {title}
      </div>
      <p className="font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function EmptyState({ setShowQuick }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <ClipboardList size={60} className="text-slate-300 mb-4" />
      <h2 className="text-2xl font-bold text-slate-900">
        Focus on what matters
      </h2>
      <p className="text-slate-500 mt-2">
        Create your first task and start tracking work.
      </p>

      <button
        onClick={() => setShowQuick(true)}
        className="mt-5 bg-blue-600 text-white px-5 py-3 rounded-xl"
      >
        Create Task
      </button>
    </div>
  );
}

function AddTaskDrawer({ onClose }) {
  return (
    <div className="fixed inset-0 flex z-50">
      <div className="flex-1 bg-black/30" onClick={onClose}></div>

      <div className="w-[520px] bg-white h-full p-6 overflow-y-auto shadow-2xl">
        <div className="flex justify-between mb-6">
          <h2 className="font-bold text-xl">Create Task</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="space-y-4">
          <input
            placeholder="Task title"
            className="w-full border rounded-xl px-4 py-3"
          />

          <select className="w-full border rounded-xl px-4 py-3">
            <option>Open</option>
            <option>Completed</option>
          </select>

          <input
            type="date"
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            placeholder="Assign to"
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="border px-4 py-2 rounded-xl">
            Cancel
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
}

function QuickAddTask({ onClose, onOpenDrawer }) {
  return (
    <div className="fixed inset-0 flex items-start justify-center pt-24 z-50">
      <div className="w-[460px] rounded-2xl bg-slate-900 text-white shadow-2xl p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Quick Add Task</h3>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="flex gap-2 mb-3">
          <button className="px-3 py-2 bg-slate-800 rounded-lg text-xs">
            Tomorrow
          </button>
          <button className="px-3 py-2 bg-slate-800 rounded-lg text-xs">
            Assign User
          </button>
          <button className="px-3 py-2 bg-slate-800 rounded-lg text-xs">
            Priority
          </button>
        </div>

        <textarea
          placeholder="Enter task... Press Enter to Save"
          className="w-full rounded-xl bg-slate-100 text-black p-4"
          rows={4}
        />

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={onOpenDrawer}
            className="text-blue-400 border border-slate-700 px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            Additional Details
          </button>

          <button className="bg-blue-600 px-4 py-2 rounded-xl">
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}