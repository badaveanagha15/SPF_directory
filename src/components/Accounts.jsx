import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddAccountModal from "./AddAccountModal";

import {
  UserCheck,
  Handshake,
  Mail,
  Pencil,
  MessageCircle,
  Download,
  Trash2,
  Phone,
  Loader2,
  Upload,
  RefreshCw,
  MoreHorizontal,
  Building2,
} from "lucide-react";

const AccountsData = [
  {
    name: "ABC Pvt Ltd",
    website: "www.abc.com",
    type: "Customer",
    phone: "+91 9876543210",
    owner: "Rinku Singh",
    city: "Delhi",
    country: "India",
    created: "2026-04-15",
  },
  {
    name: "XYZ Corp",
    website: "www.xyz.com",
    type: "Partner",
    phone: "+91 9123456780",
    owner: "Akshay",
    city: "Mumbai",
    country: "India",
    created: "2026-04-12",
  },
  {
    name: "TechNova",
    website: "www.technova.com",
    type: "Customer",
    phone: "+91 9988776655",
    owner: "Rohit",
    city: "Bangalore",
    country: "India",
    created: "2026-04-10",
  },
];

export default function Accounts() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [toast, setToast] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  /* FILTER */

  const filtered = AccountsData.filter((account) => {
    const matchesSearch = account.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === "All"
        ? true
        : account.type === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const selectedAccounts = selected.map((i) => filtered[i]);

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
    console.log("Export:", selectedAccounts);
  };

  const handleImport = () => {
    setToast("File uploaded successfully ✅");

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

  return (
    <div className="ml-[60px] p-6 pt-20 bg-[#F1F5F9] min-h-screen">
      {/* TOAST */}

      {toast && (
        <div className="fixed top-20 right-6 bg-black text-white px-4 py-2 rounded shadow z-50 text-sm">
          {toast}
        </div>
      )}

      {/* BULK ACTION BAR */}

      {selected.length > 0 && (
        <div className="sticky top-14 z-40 bg-white border border-slate-200 rounded-lg mb-4 px-4 py-2 flex items-center justify-between shadow-sm">
          {/* LEFT */}

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700">
              {selected.length} Accounts selected
            </span>

            <div className="h-5 w-px bg-slate-300"></div>
          </div>

          {/* RIGHT */}

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
              Whatsapp
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
        {/* LEFT */}

        <div>
          <h1 className="text-2xl font-black text-slate-800">
            Accounts
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Accounts &gt; List | Total Accounts: {filtered.length}
          </p>
        </div>

        {/* RIGHT */}

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

          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
          >
            + Add Account
          </button>

          {open && (
            <AddAccountModal onClose={() => setOpen(false)} />
          )}
        </div>
      </div>

      {/* FILTER + SEARCH */}

      <div className="bg-white border border-slate-200 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search accounts..."
            className="flex-1 min-w-[250px] px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* FILTERS */}

          <button
            onClick={() => setActiveFilter("All")}
            className={`px-4 py-2 rounded-full text-sm transition ${
              activeFilter === "All"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All Accounts
          </button>

          <button
            onClick={() => setActiveFilter("Customer")}
            className={`px-4 py-2 rounded-full text-sm transition ${
              activeFilter === "Customer"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Customers
          </button>

          <button
            onClick={() => setActiveFilter("Partner")}
            className={`px-4 py-2 rounded-full text-sm transition ${
              activeFilter === "Partner"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Partners
          </button>
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

              <th className="p-3 text-left">
                Account Name
              </th>

              <th className="p-3 text-left">
                Website
              </th>

              <th className="p-3 text-left">
                Type
              </th>

              <th className="p-3 text-left">
                Phone
              </th>

              <th className="p-3 text-left">
                Owner
              </th>

              <th className="p-3 text-left">
                City
              </th>

              <th className="p-3 text-left">
                Country
              </th>

              <th className="p-3 text-left">
                Created
              </th>

              <th className="p-3 text-left">
                <MoreHorizontal size={14} />
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((account, index) => (
              <tr
                onClick={() => navigate(`/accounts/${account.id}`)}
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

                {/* NAME */}

                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center">
                      <Building2 size={16} />
                    </div>

                    <div>
                      <div className="font-semibold text-slate-800">
                        {account.name}
                      </div>

                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Building2 size={11} />
                        Business Account
                      </div>
                    </div>
                  </div>
                </td>

                {/* WEBSITE */}

                <td className="p-3 text-blue-600">
                  {account.website}
                </td>

                {/* TYPE */}

                <td className="p-3">
                  <span
                    className={`flex items-center w-fit gap-1 px-2.5 py-1 text-xs rounded-full font-medium ${
                      account.type === "Customer"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {account.type === "Customer" ? (
                      <UserCheck size={12} />
                    ) : (
                      <Handshake size={12} />
                    )}

                    {account.type}
                  </span>
                </td>

                <td className="p-3 text-slate-700">
                  {account.phone}
                </td>

                <td className="p-3 text-slate-700">
                  {account.owner}
                </td>

                <td className="p-3 text-slate-700">
                  {account.city}
                </td>

                <td className="p-3 text-slate-700">
                  {account.country}
                </td>

                <td className="p-3 text-slate-700">
                  {account.created}
                </td>

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
            No Accounts Found
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
            : "Account Details"}
        </div>

        <div className="p-4 space-y-4">
          {/* MULTI */}

          {selected.length > 1 && (
            <>
              {selectedAccounts.map((account, i) => (
                <div key={i}>• {account.name}</div>
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
                  <Building2 size={20} />
                </div>

                <div>
                  <div className="font-semibold">
                    {selectedAccounts[0].name}
                  </div>

                  <div className="text-sm text-slate-500">
                    {selectedAccounts[0].type}
                  </div>
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
              No account selected
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
    </div>
  );
}