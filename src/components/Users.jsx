import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddUserDrawer from "./AddUserDrawer";
import {
  Mail,
  Pencil,
  MessageCircle,
  Download,
  Trash2,
  Loader2,
  Upload,
  RefreshCw,
  MoreHorizontal,
  Shield,
  User,
  Phone,
  UserCog,
} from "lucide-react";

const usersData = [
  {
    name: "Rinku Singh",
    initials: "RS",
    email: "rinku@company.com",
    mobile: "+91 9650394795",
    role: "Admin",
    department: "Sales",
    status: "Active",
    joined: "2026-04-15",
  },
  {
    name: "Akshay Mehta",
    initials: "AM",
    email: "akshay@company.com",
    mobile: "+91 9876543210",
    role: "Manager",
    department: "Marketing",
    status: "Inactive",
    joined: "2026-04-12",
  },
  {
    name: "Rohit Sharma",
    initials: "RO",
    email: "rohit@company.com",
    mobile: "+91 9988776655",
    role: "Executive",
    department: "Support",
    status: "Active",
    joined: "2026-04-10",
  },
];

export default function Users() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [syncing, setSyncing] = useState(false);
  const [toast, setToast] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  /* FILTER */

  const filtered = usersData.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === "All"
        ? true
        : activeFilter === "Active"
        ? user.status === "Active"
        : activeFilter === "Inactive"
        ? user.status === "Inactive"
        : user.role === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const selectedUsers = selected.map((i) => filtered[i]);

  /* SELECT */

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(filtered.map((_, i) => i));
    } else {
      setSelected([]);
    }
  };

  const toggleRow = (index) => {
    setSelected((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  /* ACTIONS */

  const handleExport = () => {
    console.log("Export:", selectedUsers);
  };

  const handleImport = () => {
    setToast("Users imported successfully ✅");

    setTimeout(() => {
      setToast("");
    }, 2000);
  };

  const handleSync = () => {
    setSyncing(true);

    setTimeout(() => {
      setSyncing(false);

      setToast("Sync completed ✅");

      setTimeout(() => {
        setToast("");
      }, 2000);
    }, 2000);
  };

  const filters = [
    "All",
    "Admin",
    "Manager",
    "Executive",
    "Active",
    "Inactive",
  ];

  return (
    <div className="ml-[60px] pt-16 p-6 bg-[#F1F5F9] min-h-screen">
      {/* TOAST */}

      {toast && (
        <div className="fixed top-20 right-6 bg-black text-white px-4 py-2 rounded shadow z-50 text-sm">
          {toast}
        </div>
      )}

      {/* BULK ACTION BAR */}

      {selected.length > 0 && (
        <div className="sticky top-14 z-40 bg-white border border-slate-200 rounded-lg mb-4 px-4 py-2 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700">
              {selected.length} Users selected
            </span>

            <div className="h-5 w-px bg-slate-300"></div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-slate-200 rounded hover:bg-slate-50">
              <Mail size={14} />
              Email
            </button>

            <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-slate-200 rounded hover:bg-slate-50">
              <Pencil size={14} />
              Update
            </button>

            <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-slate-200 rounded hover:bg-slate-50">
              <MessageCircle size={14} />
              Message
            </button>

            <button
              onClick={handleExport}
              className="flex items-center gap-1 px-3 py-1.5 text-sm border border-slate-200 rounded hover:bg-slate-50"
            >
              <Download size={14} />
              Export
            </button>

            <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-red-300 text-red-600 hover:bg-red-50 rounded">
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}

      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">
            Users
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Users &gt; List | Total Users: {filtered.length}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleImport}
            className="px-3 py-2 border border-slate-200 rounded-lg flex items-center gap-2 bg-white hover:bg-slate-50 text-sm"
          >
            <Upload size={14} />
            Import
          </button>

          <button
            onClick={handleExport}
            className="px-3 py-2 border border-slate-200 rounded-lg flex items-center gap-2 bg-white hover:bg-slate-50 text-sm"
          >
            <Download size={14} />
            Export
          </button>

          <button
            onClick={handleSync}
            className="px-3 py-2 border border-slate-200 rounded-lg flex items-center gap-2 bg-white hover:bg-slate-50 text-sm"
          >
            {syncing ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <RefreshCw size={14} />
            )}

            Sync
          </button>

          <button  onClick={() => setIsAddUserOpen(true)}
           className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
            + Add User
          </button>
        </div>
      </div>

      {/* FILTER + SEARCH */}

      <div className="bg-white border border-slate-200 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Search users..."
            className="flex-1 min-w-[250px] px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setActiveFilter(item)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                activeFilter === item
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="p-3 w-12 text-center">
                <input
                  type="checkbox"
                  onChange={toggleSelectAll}
                  className="cursor-pointer"
                />
              </th>

              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Mobile</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Joined</th>

              <th className="p-3 text-left">
                <MoreHorizontal size={14} />
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((user, index) => (
              <tr
                onClick={() => navigate(`/users/${user.id}`)}
                key={index}
                className="border-t border-slate-100 hover:bg-slate-50 transition cursor-pointer"
              >
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    checked={selected.includes(index)}
                    onChange={() => toggleRow(index)}
                    className="cursor-pointer"
                  />
                </td>

                {/* USER */}

                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-xs">
                      {user.initials}
                    </div>

                    <div>
                      <div className="font-semibold text-slate-800">
                        {user.name}
                      </div>

                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <User size={11} />
                        Team Member
                      </div>
                    </div>
                  </div>
                </td>

                {/* EMAIL */}

                <td className="p-3 text-slate-700">
                  {user.email}
                </td>

                {/* MOBILE */}

                <td className="p-3 text-slate-700">
                  {user.mobile}
                </td>

                {/* ROLE */}

                <td className="p-3">
                  <RoleBadge role={user.role} />
                </td>

                {/* DEPARTMENT */}

                <td className="p-3 text-slate-700">
                  {user.department}
                </td>

                {/* STATUS */}

                <td className="p-3">
                  <StatusBadge status={user.status} />
                </td>

                {/* JOINED */}

                <td className="p-3 text-slate-700">
                  {user.joined}
                </td>

                {/* ACTION */}

                <td className="p-3 cursor-pointer text-slate-500 hover:text-slate-700">
                  <MoreHorizontal size={16} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* EMPTY */}

        {filtered.length === 0 && (
          <div className="py-10 text-center text-slate-500 text-sm">
            No Users Found
          </div>
        )}
      </div>

      {/* OVERLAY */}

      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}

      {/* DRAWER */}

      <div
        className={`fixed top-0 right-0 h-full w-[320px] bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          drawerOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b font-semibold text-slate-800">
          {selected.length > 1
            ? "Bulk Summary"
            : "User Details"}
        </div>

        <div className="p-4 space-y-4">
          {/* MULTI */}

          {selected.length > 1 && (
            <>
              {selectedUsers.map((user, i) => (
                <div key={i}>• {user.name}</div>
              ))}

              <button className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4">
                Apply Bulk Update
              </button>
            </>
          )}

          {/* SINGLE */}

          {selected.length === 1 && (
            <>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  {selectedUsers[0]?.initials}
                </div>

                <div>
                  <div className="font-semibold">
                    {selectedUsers[0]?.name}
                  </div>

                  <div className="text-sm text-slate-500">
                    {selectedUsers[0]?.role}
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Email</span>
                  <span className="font-medium">
                    {selectedUsers[0]?.email}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Department</span>
                  <span className="font-medium">
                    {selectedUsers[0]?.department}
                  </span>
                </div>
              </div>

              <div className="flex gap-4 mt-4 text-slate-600">
                <Phone className="cursor-pointer" />
                <MessageCircle className="cursor-pointer" />
              </div>
            </>
          )}

          {/* EMPTY */}

          {selected.length === 0 && (
            <p className="text-slate-500 text-sm">
              No user selected
            </p>
          )}
        </div>
      </div>

      {/* DRAWER BUTTON */}

      <div
        onClick={() => setDrawerOpen(!drawerOpen)}
        className="fixed right-0 top-1/2 h-[120px] w-[40px] bg-blue-600 text-white flex items-center justify-center rotate-180 cursor-pointer z-50 shadow-lg"
        style={{ writingMode: "vertical-rl" }}
      >
        Details
      </div>

      {/* ADD USER DRAWER */}

            <AddUserDrawer
                isOpen={isAddUserOpen}
                onClose={() => setIsAddUserOpen(false)}
            />


    </div>
  );
}

function RoleBadge({ role }) {
  const styles = {
    Admin: "bg-red-100 text-red-700",
    Manager: "bg-blue-100 text-blue-700",
    Executive: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`flex items-center gap-1 w-fit px-2.5 py-1 text-xs rounded-full font-medium ${styles[role]}`}
    >
      <Shield size={12} />
      {role}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-2.5 py-1 text-xs rounded-full font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}