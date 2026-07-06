import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  RefreshCw,
  MoreVertical,
  Pencil,
  Trash2,
  Building2,
  Users,
  ChevronRight,
  CheckSquare,
  Square,
  X,
} from "lucide-react";

import AddDepartment from "./AddDepartment.jsx";

export default function DepartmentList() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);

  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "Sales",
      hod: "Rinku Singh",
      members: 24,
      status: "Active",
      parent: "Head Office",
      description:
        "Responsible for lead management, customer acquisition, quotations and revenue generation.",
      employees: [
        "Rinku Singh",
        "Akshay Mehta",
        "Aman Gupta",
        "Pooja Sharma",
      ],
    },
    {
      id: 2,
      name: "Marketing",
      hod: "Neha Sharma",
      members: 18,
      status: "Active",
      parent: "Head Office",
      description:
        "Digital marketing, campaigns, branding, SEO and customer engagement.",
      employees: [
        "Neha Sharma",
        "Vikas Kumar",
        "Rohit Jain",
      ],
    },
    {
      id: 3,
      name: "Human Resources",
      hod: "Anjali Verma",
      members: 10,
      status: "Inactive",
      parent: "Administration",
      description:
        "Recruitment, employee onboarding, attendance and payroll coordination.",
      employees: [
        "Anjali Verma",
        "Raj Sharma",
      ],
    },
    {
      id: 4,
      name: "Finance",
      hod: "Manoj Kumar",
      members: 9,
      status: "Active",
      parent: "Administration",
      description:
        "Accounting, invoicing, taxation, financial reporting and compliance.",
      employees: [
        "Manoj Kumar",
        "Deepak",
        "Sakshi",
      ],
    },
  ]);

  const filteredDepartments = useMemo(() => {
    return departments.filter(
      (d) =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.hod.toLowerCase().includes(search.toLowerCase())
    );
  }, [departments, search]);

  const activeDepartment =
    departments.find((d) => d.id === selectedDepartment) || null;

  const toggleSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((x) => x !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const selectAll = () => {
    if (selectedRows.length === filteredDepartments.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredDepartments.map((d) => d.id));
    }
  };

  return (
    <>
      <div className="ml-[60px] pt-16 bg-slate-50 min-h-screen">

        {/* HEADER */}
        <div className="px-6 py-5 bg-white border-b border-slate-200">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-2xl font-black text-slate-900">
                Departments
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Manage departments, hierarchy and reporting structure
              </p>

            </div>

            <div className="flex items-center gap-3">

              <button className="w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-100 flex items-center justify-center">
                <RefreshCw size={18} />
              </button>

              <button
                onClick={() => setIsAddOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-2.5 font-medium flex items-center gap-2 shadow-sm"
              >
                <Plus size={18} />
                Add Department
              </button>

            </div>

          </div>

          <div className="mt-5 relative max-w-md">

            <Search
              className="absolute left-4 top-3 text-slate-400"
              size={18}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search departments..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

        </div>

        {/* BULK BAR */}

        {selectedRows.length > 0 && (

          <div className="sticky top-16 z-20 bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow">

            <div className="font-medium">
              {selectedRows.length} Department(s) Selected
            </div>

            <div className="flex gap-3">

              <button className="px-4 py-2 rounded-lg bg-white text-blue-600 font-medium">
                Change Parent
              </button>

              <button className="px-4 py-2 rounded-lg bg-red-500">
                Deactivate
              </button>

            </div>

          </div>

        )}

        {/* CONTENT */}

        <div className="grid grid-cols-[430px_1fr] h-[calc(100vh-165px)]">

          {/* LEFT PANEL */}

          <div className="bg-white border-r border-slate-200 overflow-y-auto">

            <table className="w-full">

              <thead className="sticky top-0 bg-slate-100 z-10">

                <tr className="text-xs uppercase tracking-wide text-slate-500">

                  <th className="w-12 py-4">

                    <button onClick={selectAll}>
                      {selectedRows.length === filteredDepartments.length &&
                      filteredDepartments.length > 0 ? (
                        <CheckSquare
                          className="mx-auto text-blue-600"
                          size={18}
                        />
                      ) : (
                        <Square
                          className="mx-auto text-slate-400"
                          size={18}
                        />
                      )}
                    </button>

                  </th>

                  <th className="text-left">Department</th>

                  <th className="text-left">HOD</th>

                  <th className="text-center">Members</th>

                  <th className="text-center">Status</th>

                  <th></th>

                </tr>

              </thead>

              <tbody>

                {filteredDepartments.length === 0 ? (

                  <tr>

                    <td
                      colSpan={6}
                      className="text-center py-20 text-slate-400"
                    >

                      <Building2
                        className="mx-auto mb-4"
                        size={50}
                      />

                      <p className="font-semibold">
                        No Departments Found
                      </p>

                    </td>

                  </tr>

                ) : (

                  filteredDepartments.map((dept) => (
                    <tr
                      key={dept.id}
                      onClick={() => setSelectedDepartment(dept.id)}
                      className={`cursor-pointer transition ${
                        selectedDepartment === dept.id
                          ? "bg-blue-50 border-l-4 border-blue-600"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <td className="text-center py-4">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(dept.id)}
                          onChange={() => toggleSelection(dept.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>

                      <td>
                        <div className="font-semibold text-slate-900">
                          {dept.name}
                        </div>
                      </td>

                      <td className="text-slate-600">
                        {dept.hod}
                      </td>

                      <td className="text-center">
                        {dept.members}
                      </td>

                      <td className="text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            dept.status === "Active"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {dept.status}
                        </span>
                      </td>

                      <td className="pr-3">
                        <button className="p-2 rounded-lg hover:bg-slate-200">
                          <MoreVertical size={16} />
                        </button>
                      </td>

                    </tr>
                  ))

                )}

              </tbody>

            </table>

          </div>
                    {/* ================= RIGHT DETAIL PANEL ================= */}

          <div className="flex flex-col overflow-hidden">

            {activeDepartment ? (
              <>

                {/* HEADER */}

                <div className="bg-white border-b border-slate-200 px-6 py-5">

                  <div className="flex items-center justify-between">

                    <div>

                      <div className="flex items-center gap-3">

                        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                          <Building2
                            className="text-blue-600"
                            size={28}
                          />

                        </div>

                        <div>

                          <h2 className="text-2xl font-black text-slate-900">
                            {activeDepartment.name}
                          </h2>

                          <p className="text-slate-500 mt-1">
                            Parent Department :
                            <span className="font-medium ml-1">
                              {activeDepartment.parent}
                            </span>
                          </p>

                        </div>

                      </div>

                    </div>

                    <div className="flex gap-3">

                      <button className="border border-slate-200 rounded-xl px-4 py-2 hover:bg-slate-50 flex items-center gap-2">
                        <Pencil size={16} />
                        Edit
                      </button>

                      <button
                        className={`px-4 py-2 rounded-xl font-medium ${
                          activeDepartment.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {activeDepartment.status}
                      </button>

                    </div>

                  </div>

                </div>

                {/* BODY */}

                <div className="flex-1 overflow-y-auto p-6">

                  {/* OVERVIEW */}

                  <div className="grid grid-cols-3 gap-5">

                    <div className="bg-white rounded-2xl border border-slate-200 p-5">

                      <h3 className="font-semibold text-slate-800 mb-5">
                        Department Information
                      </h3>

                      <div className="space-y-5">

                        <InfoRow
                          label="Department"
                          value={activeDepartment.name}
                        />

                        <InfoRow
                          label="Head of Department"
                          value={activeDepartment.hod}
                        />

                        <InfoRow
                          label="Members"
                          value={`${activeDepartment.members} Employees`}
                        />

                        <InfoRow
                          label="Parent"
                          value={activeDepartment.parent}
                        />

                        <InfoRow
                          label="Status"
                          value={activeDepartment.status}
                        />

                      </div>

                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-5">

                      <h3 className="font-semibold text-slate-800 mb-5">
                        Description
                      </h3>

                      <p className="leading-7 text-slate-600">
                        {activeDepartment.description}
                      </p>

                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-5">

                      <h3 className="font-semibold text-slate-800 mb-5">
                        Department Statistics
                      </h3>

                      <div className="space-y-4">

                        <StatCard
                          title="Employees"
                          value={activeDepartment.members}
                          color="blue"
                        />

                        <StatCard
                          title="Projects"
                          value="12"
                          color="emerald"
                        />

                        <StatCard
                          title="Open Requests"
                          value="07"
                          color="amber"
                        />

                      </div>

                    </div>

                  </div>

                  {/* MEMBERS */}

                  <div className="bg-white rounded-2xl border border-slate-200 p-6 mt-6">

                    <div className="flex items-center justify-between mb-5">

                      <h3 className="font-semibold text-slate-800">
                        Department Members
                      </h3>

                      <button className="text-blue-600 font-medium">
                        View All
                      </button>

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                      {activeDepartment.employees.map((emp, index) => (

                        <div
                          key={index}
                          className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition"
                        >

                          <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">

                            <Users
                              size={18}
                              className="text-blue-600"
                            />

                          </div>

                          <div>

                            <h4 className="font-semibold text-slate-800">
                              {emp}
                            </h4>

                            <p className="text-xs text-slate-500">
                              Team Member
                            </p>

                          </div>

                        </div>

                      ))}

                    </div>

                  </div>

                  {/* NOTES */}

                  <div className="bg-white rounded-2xl border border-slate-200 p-6 mt-6">

                    <h3 className="font-semibold text-slate-800 mb-4">
                      Internal Notes
                    </h3>

                    <textarea
                      rows={6}
                      placeholder="Add department notes..."
                      className="w-full rounded-xl border border-slate-200 p-4 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <div className="flex justify-end mt-5">

                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl">
                        Save Notes
                      </button>

                    </div>

                  </div>

                </div>

              </>
            ) : (

              <div className="flex flex-col items-center justify-center h-full text-slate-400">

                <Building2 size={70} />

                <h2 className="text-2xl font-bold mt-5">
                  No Department Selected
                </h2>

                <p className="mt-2">
                  Select a department from the left panel.
                </p>

              </div>

            )}

          </div>

        </div>

      </div>

      <AddDepartment
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
      />

    </>
  );
}

/* ========================================================= */

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between border-b border-slate-100 pb-3">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-800">
        {value}
      </span>
    </div>
  );
}

function StatCard({ title, value, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-700",
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
  };

  return (
    <div
      className={`rounded-xl p-5 ${colors[color]}`}
    >
      <p className="text-sm">{title}</p>

      <h2 className="text-3xl font-black mt-2">
        {value}
      </h2>
    </div>
  );
}