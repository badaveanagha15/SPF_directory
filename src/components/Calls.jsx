import { useState } from "react";
import {
  Phone,
  PhoneOutgoing,
  Download,
  Trash2,
  Mail,
  Pencil,
  RefreshCw,
  Loader2,
} from "lucide-react";

const callsData = [
  {
    id: 1,
    contact: "Rinku Singh",
    company: "Tech Corp",
    type: "Outbound",
    outcome: "Interested",
    duration: "12 min",
    owner: "Akshay",
    date: "This Week",
  },
  {
    id: 2,
    contact: "Akshay Mehta",
    company: "StartupX",
    type: "Inbound",
    outcome: "Busy",
    duration: "5 min",
    owner: "Rinku",
    date: "This Month",
  },
];

export default function Calls() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [syncing, setSyncing] = useState(false);
  const [ownerFilter, setOwnerFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const filtered = callsData.filter(
    (call) =>
      call.contact.toLowerCase().includes(search.toLowerCase()) &&
      (ownerFilter ? call.owner === ownerFilter : true) &&
      (dateFilter ? call.date === dateFilter : true)
  );

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

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  return (
    <div className="ml-[60px] pt-16 p-6 bg-[#F1F5F9] min-h-screen">
      {/* BULK BAR */}
      {selected.length > 0 && (
        <div className="sticky top-14 z-40 bg-white border rounded-md shadow-sm mb-4 px-4 py-2 flex justify-between">
          <span className="text-sm font-medium">
            {selected.length} Calls selected
          </span>

          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded flex gap-1 items-center">
              <Mail size={14} /> Review
            </button>
            <button className="px-3 py-1 border rounded flex gap-1 items-center">
              <Download size={14} /> Export CSV
            </button>
            <button className="px-3 py-1 border border-red-300 text-red-600 rounded flex gap-1 items-center">
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="bg-white border rounded-lg shadow-sm p-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 className="text-lg font-semibold">Log of All Calls</h1>
            <p className="text-xs text-gray-500">{filtered.length} calls</p>
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
            + Log Call
          </button>
        </div>

        <div className="flex gap-3">
          <input
            placeholder="Search calls..."
            className="flex-1 px-3 py-2 border rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border px-3 py-2 rounded"
            onChange={(e) => setOwnerFilter(e.target.value)}
          >
            <option value="">Owner</option>
            <option>Akshay</option>
            <option>Rinku</option>
          </select>

          <select
            className="border px-3 py-2 rounded"
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="">Date</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>

          <button
            onClick={handleSync}
            className="border px-3 py-2 rounded flex gap-1 items-center"
          >
            {syncing ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <RefreshCw size={14} />
            )}
            Sync
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="p-3">
                <input type="checkbox" onChange={toggleSelectAll} />
              </th>
              <th className="text-left p-3">Contact</th>
              <th className="text-left p-3">Company</th>
              <th className="text-left p-3">Call Type</th>
              <th className="text-left p-3">Outcome</th>
              <th className="text-left p-3">Duration</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((call, index) => (
              <tr key={call.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selected.includes(index)}
                    onChange={() => toggleRow(index)}
                  />
                </td>

                <td className="p-3 font-medium">{call.contact}</td>
                <td className="p-3">{call.company}</td>

                <td className="p-3 flex items-center gap-2">
                  {call.type === "Outbound" ? (
                    <PhoneOutgoing size={14} className="text-blue-600" />
                  ) : (
                    <Phone size={14} className="text-green-600" />
                  )}
                  {call.type}
                </td>

                <td className="p-3">{call.outcome}</td>
                <td className="p-3">{call.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}