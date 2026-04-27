import { useState } from "react";
import {
  Plus,
  MoreVertical,
  Search,
  RefreshCw,
  Pencil,
  X,
} from "lucide-react";

export default function Tasks() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showQuick, setShowQuick] = useState(false);

  const tasks = [
    {
      id: 1,
      title: "New Task",
      owner: "Rinku",
      due: "Apr 25, 2026 at 11:59 pm",
      status: "Open",
    },
  ];

  return (
    <div className="ml-[60px] pt-16 p-6 h-screen flex flex-col bg-gray-50 text-[13px] text-gray-700">

      {/* ================= TOP BAR ================= */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-white">

        {/* FILTER CHIPS */}
        <div className="flex gap-2 overflow-x-auto">
          {[
            "My Tasks",
            "My Open Tasks Today",
            "My Open Tasks Tomorrow",
            "My High Priority Tasks",
          ].map((f, i) => (
            <div
              key={i}
              className="px-3 py-1 border rounded-full text-xs cursor-pointer hover:bg-blue-50"
            >
              {f}
            </div>
          ))}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          <button className="p-2 border rounded">
            <RefreshCw size={16} />
          </button>

          <div className="relative">
            <Search className="absolute left-2 top-2.5 text-gray-400 w-4 h-4" />
            <input
              placeholder="Search"
              className="pl-7 pr-3 py-2 border rounded"
            />
          </div>

          <button
            onClick={() => setShowQuick(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="flex flex-1 overflow-hidden">

        {/* ================= LEFT LIST ================= */}
        <div className="w-[320px] border-r bg-white overflow-y-auto">

          {tasks.map((t) => (
            <div
              key={t.id}
              onClick={() => setSelectedTask(t)}
              className="p-4 border-b cursor-pointer hover:bg-gray-50"
            >
              <div className="flex justify-between">
                <span className="font-medium text-gray-800">{t.title}</span>
                <MoreVertical size={16} />
              </div>

              <div className="text-xs mt-2 text-gray-500">
                {t.owner}
              </div>

              <div className="text-xs text-gray-500">{t.due}</div>
            </div>
          ))}
        </div>

        {/* ================= RIGHT DETAIL ================= */}
        <div className="flex-1 p-6 overflow-y-auto">

          {selectedTask ? (
            <>
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {selectedTask.title}
                </h2>

                <div className="flex gap-2">
                  <button className="p-2 border rounded">
                    <Pencil size={16} />
                  </button>

                  <button className="px-3 py-2 border rounded">
                    Mark as complete
                  </button>
                </div>
              </div>

              {/* INFO GRID */}
              <div className="border rounded p-4 grid grid-cols-3 gap-4 text-sm bg-white">

                <div>
                  <p className="text-gray-400 text-xs">Status</p>
                  <p>{selectedTask.status}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-xs">Assigned To</p>
                  <p>{selectedTask.owner}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-xs">Due Date</p>
                  <p>{selectedTask.due}</p>
                </div>
              </div>

              {/* NOTES */}
              <div className="mt-6 bg-white border rounded p-4">
                <h3 className="font-medium mb-2">Notes</h3>

                <textarea
                  placeholder="Do you have any notes to add?"
                  className="w-full border rounded p-3 h-40"
                />

                <div className="flex justify-end mt-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    Add
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-400 mt-20">
              Oops, there is no data
            </div>
          )}
        </div>
      </div>

      {/* ================= ADD TASK DRAWER ================= */}
      {showDrawer && (
        <AddTaskDrawer onClose={() => setShowDrawer(false)} />
      )}

      {/* ================= QUICK ADD ================= */}
      {showQuick && (
        <QuickAddTask onClose={() => setShowQuick(false)} />
      )}
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

/* ================= DRAWER ================= */

function AddTaskDrawer({ onClose }) {
  return (
    <div className="fixed inset-0 flex z-50">
      <div className="flex-1 bg-black/30" onClick={onClose}></div>

      <div className="w-[500px] bg-white h-full p-6 overflow-y-auto">

        <div className="flex justify-between mb-4">
          <h2 className="font-semibold text-lg">Add Task</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="space-y-4">

          <div>
            <label className="text-xs font-medium">
              Task Name <span className="text-red-500">*</span>
            </label>
            <input className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label className="text-xs font-medium">
              Status <span className="text-red-500">*</span>
            </label>
            <select className="w-full border px-3 py-2 rounded">
              <option>Open</option>
              <option>Completed</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input type="datetime-local" className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label className="text-xs font-medium">
              Assigned To <span className="text-red-500">*</span>
            </label>
            <input className="w-full border px-3 py-2 rounded" />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Cancel
          </button>

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= QUICK ADD ================= */

function QuickAddTask({ onClose ,onOpenDrawer }) {
  return (
    <div className="fixed inset-0 flex items-start justify-center z-50 pt-24">
      <div className="bg-[#1f2937] text-white w-[420px] rounded-lg p-4 shadow-lg">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium">Quick Add Task</h3>
          <button onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* SHORTCUTS */}
        <div className="flex gap-2 mb-3">
          <button className="bg-gray-700 px-3 py-2 rounded text-xs">
            Tomorrow
          </button>
          <button className="bg-gray-700 px-3 py-2 rounded text-xs">
            @Assigned To
          </button>
          <button className="bg-gray-700 px-3 py-2 rounded text-xs">
            Priority
          </button>
        </div>

        {/* INPUT */}
        <textarea
          placeholder="Enter a new task: E.g. Follow up with @User"
          className="w-full p-3 rounded bg-gray-100 text-black"
        />

        {/* FOOTER */}
        <div className="flex justify-between items-center mt-3">
            <span
                onClick={onOpenDrawer}
                className="text-xs text-blue-400 cursor-pointer hover:underline"
            >
            Additional Details
            </span>

          <button className="bg-white text-black px-4 py-2 rounded text-sm">
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}