import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddDealDrawer from "./AddDealDrawer";

import {
  Mail,
  Pencil,
  MessageCircle,
  Download,
  Trash2,
  Upload,
  RefreshCw,
  Loader2,
  MoreHorizontal,
  Briefcase,
  Phone,
} from "lucide-react";

const dealsData = [
  {
    id: "D-001",
    name: "Website Redesign",
    value: "₹50,000",
    company: "TechCorp",
    owner: "Rinku",
    stage: "Open",
    created: "2026-04-15",
  },
  {
    id: "D-002",
    name: "Mobile App Deal",
    value: "₹1,20,000",
    company: "StartupX",
    owner: "Akshay",
    stage: "Won",
    created: "2026-04-12",
  },
  {
    id: "D-003",
    name: "CRM Implementation",
    value: "₹80,000",
    company: "Vault CRM",
    owner: "Rohit",
    stage: "Open",
    created: "2026-04-10",
  },
];

export default function Deals({type}) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [toast, setToast] = useState("");
  const [openAddDeal, setOpenAddDeal] = useState(false);
  const navigate = useNavigate();

  // FILTER STATE
  const [activeFilter, setActiveFilter] = useState("All");

  // FILTERED DATA
  const filtered = dealsData.filter((deal) => {
    const matchesSearch = deal.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === "All"
        ? true
        : activeFilter === "Open"
        ? deal.stage === "Open"
        : deal.stage === "Won";

    return matchesSearch && matchesFilter;
  });

  const selectedDeals = selected.map((i) => filtered[i]);

  /* ---------------- SELECT ---------------- */

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

  /* ---------------- ACTIONS ---------------- */

  const handleExport = () => {
    console.log("Export:", selectedDeals);
  };

  const handleImport = () => {
    setToast("Deals imported successfully ✅");

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
    <div className="ml-[60px]  p-6 pt-20 bg-[#F1F5F9] min-h-screen">
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
              {selected.length} Deals selected
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
            Deals
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Deals &gt; List | Total Deals: {filtered.length}
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
            onClick={() => setOpenAddDeal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
          >
            + Add Deal
          </button>
        </div>
      </div>

      {/* FILTER + SEARCH */}

      <div className="bg-white border border-slate-200 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search deals..."
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
            All Deals
          </button>

          <button
            onClick={() => setActiveFilter("Open")}
            className={`px-4 py-2 rounded-full text-sm transition ${
              activeFilter === "Open"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Open
          </button>

          <button
            onClick={() => setActiveFilter("Won")}
            className={`px-4 py-2 rounded-full text-sm transition ${
              activeFilter === "Won"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Won
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

              <th className="p-3 text-left">Deal Name</th>
              <th className="p-3 text-left">Value</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Owner</th>
              <th className="p-3 text-left">Stage</th>
              <th className="p-3 text-left">Created</th>

              <th className="p-3 text-left">
                <MoreHorizontal size={14} />
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((deal, index) => (
              <tr
                onClick={() => navigate(`/deals/${deal.id}`)}
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

                {/* DEAL NAME */}

                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center">
                      <Briefcase size={16} />
                    </div>

                    <div>
                      <div className="font-semibold text-slate-800">
                        {deal.name}
                      </div>

                      <div className="text-xs text-slate-500 mt-0.5">
                        {deal.id}
                      </div>
                    </div>
                  </div>
                </td>

                {/* VALUE */}

                <td className="p-3 font-semibold text-slate-800">
                  {deal.value}
                </td>

                {/* COMPANY */}

                <td className="p-3 text-slate-700">
                  {deal.company}
                </td>

                {/* OWNER */}

                <td className="p-3 text-slate-700">
                  {deal.owner}
                </td>

                {/* STAGE */}

                <td className="p-3">
                  <span
                    className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                      deal.stage === "Open"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {deal.stage}
                  </span>
                </td>

                {/* CREATED */}

                <td className="p-3 text-slate-700">
                  {deal.created}
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
            No Deals Found
          </div>
        )}
      </div>

      {/* ADD DEAL DRAWER */}

      <AddDealDrawer
        isOpen={openAddDeal}
        onClose={() => setOpenAddDeal(false)}
      />

      {/* OVERLAY */}

      {openDrawer && (
        <div
          onClick={() => setOpenDrawer(false)}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}

      {/* SIDE DRAWER */}

      <div
        className={`fixed top-0 right-0 h-full w-[320px] bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          openDrawer
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b font-semibold text-slate-800">
          {selected.length > 1
            ? "Bulk Summary"
            : "Deal Details"}
        </div>

        <div className="p-4 space-y-4">
          {/* MULTI */}

          {selected.length > 1 && (
            <>
              {selectedDeals.map((deal, i) => (
                <div key={i}>• {deal.name}</div>
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
                  <Briefcase size={18} />
                </div>

                <div>
                  <div className="font-semibold">
                    {selectedDeals[0].name}
                  </div>

                  <div className="text-sm text-slate-500">
                    {selectedDeals[0].stage}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">
                    Company:
                  </span>{" "}
                  {selectedDeals[0].company}
                </div>

                <div>
                  <span className="font-medium">
                    Value:
                  </span>{" "}
                  {selectedDeals[0].value}
                </div>

                <div>
                  <span className="font-medium">
                    Owner:
                  </span>{" "}
                  {selectedDeals[0].owner}
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
              No deal selected
            </p>
          )}
        </div>
      </div>

      {/* DRAWER BUTTON */}

      {/* <div
        onClick={() => setOpenDrawer(!openDrawer)}
        className="fixed right-0 top-1/2 h-[120px] w-[40px] bg-blue-600 text-white flex items-center justify-center rotate-180 cursor-pointer z-50 shadow-lg"
        style={{ writingMode: "vertical-rl" }}
      >
        Details
      </div> */}
    </div>
  );
}