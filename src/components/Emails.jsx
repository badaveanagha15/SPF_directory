import { useState } from "react";
import {
  Mail,
  Eye,
  Download,
  Trash2,
  Loader2,
  RefreshCw,
} from "lucide-react";

const emailData = [
  {
    id: 1,
    subject: "Proposal Follow-up",
    recipient: "rinku@email.com",
    account: "Tech Corp",
    status: "Opened",
    timestamp: "Apr 26, 2026",
    owner: "Akshay",
    date: "This Week",
  },
  {
    id: 2,
    subject: "Welcome Email",
    recipient: "akshay@email.com",
    account: "StartupX",
    status: "Clicked",
    timestamp: "Apr 22, 2026",
    owner: "Rinku",
    date: "This Month",
  },
];

export default function Emails() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [syncing, setSyncing] = useState(false);
  const [ownerFilter, setOwnerFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const filtered = emailData.filter(
    (mail) =>
      mail.subject.toLowerCase().includes(search.toLowerCase()) &&
      (ownerFilter ? mail.owner === ownerFilter : true) &&
      (dateFilter ? mail.date === dateFilter : true)
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
            {selected.length} Emails selected
          </span>

          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded flex gap-1 items-center">
              <Eye size={14} /> Mark Reviewed
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
            <h1 className="text-lg font-semibold">Email Analytics</h1>
            <p className="text-xs text-gray-500">{filtered.length} emails</p>
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
            + Compose Email
          </button>
        </div>

        <div className="flex gap-3">
          <input
            placeholder="Search emails..."
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
              <th className="text-left p-3">Subject</th>
              <th className="text-left p-3">Recipient</th>
              <th className="text-left p-3">Account</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Timestamp</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((mail, index) => (
              <tr key={mail.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selected.includes(index)}
                    onChange={() => toggleRow(index)}
                  />
                </td>

                <td className="p-3 font-medium">{mail.subject}</td>
                <td className="p-3">{mail.recipient}</td>
                <td className="p-3">{mail.account}</td>

                <td className="p-3 flex items-center gap-2">
                  <Eye size={14} className="text-blue-600" />
                  {mail.status}
                </td>

                <td className="p-3">{mail.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}