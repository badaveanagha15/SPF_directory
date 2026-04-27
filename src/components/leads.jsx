import { useState } from "react";
import AddLeadModal from "./addlead";
import {
  Mail,
  Pencil,
  MessageCircle,
  Download,
  Trash2,
  Phone,
  Loader2,
  Upload,
  RefreshCw,
} from "lucide-react";


const leadsData = [
  {
    name: "Rinku Singh",
    initials: "RS",
    status: "New",
    mobile: "+91 9650394795",
    email: "rinku@email.com",
    owner: "Akshay",
    created: "2026-04-15",
  },
  {
    name: "Akshay Mehta",
    initials: "AM",
    status: "Converted",
    mobile: "+91 9876543210",
    email: "akshay@email.com",
    owner: "Rohit",
    created: "2026-04-12",
  },
];

export default function Leads() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [toast, setToast] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = leadsData.filter((lead) =>
    lead.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedLeads = selected.map((i) => filtered[i]);

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
    console.log("Export:", selectedLeads);
  };

  const handleImport = () => {
    setToast("File uploaded successfully ✅");
    setTimeout(() => setToast(""), 2000);
  };

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setToast("Sync completed ✅");
      setTimeout(() => setToast(""), 2000);
    }, 2000);
  };

  return (
    <div className="ml-[60px] pt-16 p-6 bg-[#F1F5F9] min-h-screen">

      {/* TOAST */}
      {toast && (
        <div className="fixed top-20 right-6 bg-black text-white px-4 py-2 rounded shadow z-50">
          {toast}
        </div>
      )}

      {/* BULK ACTION BAR */}
      {selected.length > 0 && (
        <div className="sticky top-14 z-40 bg-white border border-gray-200 rounded-md mb-4 px-4 py-2 flex items-center justify-between shadow-sm">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">
              {selected.length} Leads selected
            </span>
            <div className="h-5 w-px bg-gray-300"></div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">

            <button className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded hover:bg-gray-50">
              <Mail size={14} /> Email
            </button>

            <button className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded hover:bg-gray-50">
              <Pencil size={14} /> Update
            </button>

            <button className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded hover:bg-gray-50">
              <MessageCircle size={14} /> Whatsapp
            </button>

            <button
              onClick={handleExport}
              className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded hover:bg-gray-50"
            >
              <Download size={14} /> Export
            </button>

            <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-red-300 text-red-600 hover:bg-red-50 rounded">
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      )}

      {/* SUB HEADER */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-500">
          Leads &gt; List | Total Leads: {filtered.length}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleImport}
            className="px-3 py-1 border rounded flex items-center gap-1"
          >
            <Upload size={14} /> Import
          </button>

          <button
            onClick={handleExport}
            className="px-3 py-1 border rounded flex items-center gap-1"
          >
            <Download size={14} /> Export
          </button>

          <button
            onClick={handleSync}
            className="px-3 py-1 border rounded flex items-center gap-1"
          >
            {syncing ? (
              <Loader2 className="animate-spin" size={14} />
            ) : (
              <RefreshCw size={14} />
            )}
            Sync
          </button>

          <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => setOpen(true)}>
            + Add Lead
          </button>
          {open && <AddLeadModal onClose={() => setOpen(false)} />}
        </div>
      </div>

      {/* FILTER ROW */}
      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search leads..."
          className="flex-1 px-3 py-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="px-3 py-1 bg-gray-200 rounded-full text-sm cursor-pointer">
          All Leads
        </div>
        <div className="px-3 py-1 bg-gray-200 rounded-full text-sm cursor-pointer">
          Open
        </div>
        <div className="px-3 py-1 bg-gray-200 rounded-full text-sm cursor-pointer">
          Converted
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="p-2">
                <input type="checkbox" onChange={toggleSelectAll} />
              </th>
              <th className="p-2 text-left">Lead Name</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Mobile</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Owner</th>
              <th className="p-2 text-left">Created</th>
              <th className="p-2 text-left">⚙</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((lead, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(index)}
                    onChange={() => toggleRow(index)}
                  />
                </td>

                <td className="p-2 flex items-center gap-2">
                  <div className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                    {lead.initials}
                  </div>
                  {lead.name}
                </td>

                <td className="p-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full text-white ${
                      lead.status === "New"
                        ? "bg-blue-600"
                        : lead.status === "Converted"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>

                <td className="p-2">{lead.mobile}</td>
                <td className="p-2">{lead.email}</td>
                <td className="p-2">{lead.owner}</td>
                <td className="p-2">{lead.created}</td>
                <td className="p-2 cursor-pointer">...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* OVERLAY */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
        />
      )}

      {/* DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-[320px] bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b font-semibold">
          {selected.length > 1 ? "Bulk Summary" : "Lead Details"}
        </div>

        <div className="p-4 space-y-4">

          {/* MULTI */}
          {selected.length > 1 && (
            <>
              {selectedLeads.map((lead, i) => (
                <div key={i}>• {lead.name}</div>
              ))}

              <button className="w-full bg-blue-600 text-white py-2 rounded mt-4">
                Apply Bulk Update
              </button>
            </>
          )}

          {/* SINGLE */}
          {selected.length === 1 && (
            <>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  {selectedLeads[0].initials}
                </div>

                <div>
                  <div className="font-semibold">
                    {selectedLeads[0].name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {selectedLeads[0].status}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <Phone />
                <MessageCircle />
              </div>
            </>
          )}

          {/* EMPTY */}
          {selected.length === 0 && (
            <p className="text-gray-500 text-sm">No lead selected</p>
          )}
        </div>
      </div>

      {/* DRAWER BUTTON */}
      <div
        onClick={() => setDrawerOpen(!drawerOpen)}
        className="fixed right-0 top-1/2 h-[120px] w-[40px] bg-blue-600 text-white flex items-center justify-center rotate-180 cursor-pointer z-50"
        style={{ writingMode: "vertical-rl" }}
      >
        Details
      </div>
    </div>
  );
}