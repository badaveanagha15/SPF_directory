import { useState, useEffect, useRef } from "react";
import AddDealDrawer from "./AddDealDrawer";
import {
  Mail,
  Pencil,
  MessageCircle,
  Download,
  Trash2,
  RefreshCw,
  LayoutGrid,
  List,
  SlidersHorizontal,
  Settings2,
  MoreVertical,
} from "lucide-react";

const dealsData = [
  {
    id: "D-001",
    name: "Website Redesign",
    value: "₹50,000",
    actual: "₹45,000",
    company: "TechCorp",
    owner: "Rinku",
  },
  {
    id: "D-002",
    name: "Mobile App Deal",
    value: "₹1,20,000",
    actual: "₹0",
    company: "StartupX",
    owner: "Akshay",
  },
];

export default function Deals() {
  const [deals] = useState(dealsData);
  const [selectedDeals, setSelectedDeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [view, setView] = useState("list");

  const [showFilters, setShowFilters] = useState(false);
  const [showColumns, setShowColumns] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [filters, setFilters] = useState({
    company: "",
    owner: "",
  });

  const filterRef = useRef();
  const columnRef = useRef();

  const [visibleColumns, setVisibleColumns] = useState({
    value: true,
    company: true,
    owner: true,
    id: true,
    actual: true,
  });

  /* ---------------- CLICK OUTSIDE ---------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilters(false);
      }
      if (columnRef.current && !columnRef.current.contains(e.target)) {
        setShowColumns(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredDeals = deals.filter((d) => {
    return (
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filters.company ? d.company === filters.company : true) &&
      (filters.owner ? d.owner === filters.owner : true)
    );
  });

  /* ---------------- SELECT ---------------- */
  const toggleAll = (e) => {
    if (e.target.checked) {
      setSelectedDeals(filteredDeals.map((d) => d.id));
    } else {
      setSelectedDeals([]);
    }
  };

  const toggleRow = (id) => {
    setSelectedDeals((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  /* ---------------- COLUMN LOGIC ---------------- */
  const toggleColumn = (col) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [col]: !prev[col],
    }));
  };

  const selectAllColumns = () => {
    const allSelected = Object.values(visibleColumns).every(Boolean);

    const updated = {};
    Object.keys(visibleColumns).forEach((k) => {
      updated[k] = !allSelected;
    });

    setVisibleColumns(updated);
  };

  /* ---------------- EXPORT ---------------- */
  const handleExport = () => {
    const selected = deals.filter((d) =>
      selectedDeals.includes(d.id)
    );
    console.log("Export:", selected);
  };

  return (
    <div className="ml-[60px] pt-16 p-6 bg-[#F4F7F9] min-h-screen">

      {/* HEADER */}
      <div className="mb-4">
        <div>
          <div className="text-lg font-semibold">All Deals ▼</div>
          <div className="text-xs text-gray-500">
            {filteredDeals.length} items
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-xl px-4 py-2 border rounded-md text-sm"
          />

          {/* ACTIONS */}
          <div className="flex items-center gap-3 ml-4">

            <RefreshCw className="cursor-pointer" size={18} />

            {/* VIEW */}
            <div className="flex border rounded overflow-hidden">
              <button
                onClick={() => setView("list")}
                className={`p-2 ${view === "list" && "bg-blue-600 text-white"}`}
              >
                <List size={16} />
              </button>

              <button
                onClick={() => setView("grid")}
                className={`p-2 ${view === "grid" && "bg-blue-600 text-white"}`}
              >
                <LayoutGrid size={16} />
              </button>
            </div>

            {/* COLUMN SETTINGS */}
            <div className="relative" ref={columnRef}>
              <Settings2
                onClick={() => setShowColumns(!showColumns)}
                className="cursor-pointer"
                size={18}
              />

              {showColumns && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow p-3 text-sm w-48 z-50">

                  <div
                    onClick={selectAllColumns}
                    className="text-blue-600 text-xs mb-2 cursor-pointer"
                  >
                    Select / Unselect All
                  </div>

                  {Object.keys(visibleColumns).map((col) => (
                    <label key={col} className="flex gap-2 mb-1">
                      <input
                        type="checkbox"
                        checked={visibleColumns[col]}
                        onChange={() => toggleColumn(col)}
                      />
                      {col}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* FILTER */}
            <div className="relative" ref={filterRef}>
              <SlidersHorizontal
                onClick={() => setShowFilters(!showFilters)}
                className="cursor-pointer"
                size={18}
              />

              {showFilters && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow p-3 text-sm w-56 z-50 space-y-2">

                  <select
                    className="w-full border p-1 rounded"
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, company: e.target.value }))
                    }
                  >
                    <option value="">All Companies</option>
                    <option>TechCorp</option>
                    <option>StartupX</option>
                  </select>

                  <select
                    className="w-full border p-1 rounded"
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, owner: e.target.value }))
                    }
                  >
                    <option value="">All Owners</option>
                    <option>Rinku</option>
                    <option>Akshay</option>
                  </select>

                  <button
                    onClick={() => setFilters({ company: "", owner: "" })}
                    className="text-xs text-blue-600"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            <button
                  onClick={() => setOpenDrawer(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
                >
                  + Add Deal
            </button>
            <AddDealDrawer
              isOpen={openDrawer}
              onClose={() => setOpenDrawer(false)}
            />
          </div>
        </div>
      </div>

      {/* ================= BULK ACTION BAR ================= */}
      {selectedDeals.length > 0 && (
        <div className="sticky top-14 z-40 bg-white border rounded-md mb-4 px-4 py-2 flex items-center justify-between shadow-sm">

          <div className="text-sm font-medium text-gray-700">
            {selectedDeals.length} Deal selected
          </div>

          <div className="flex items-center gap-2">

            <button className="px-3 py-1 border rounded text-blue-600 flex gap-1 items-center">
              <Mail size={14} /> Email
            </button>

            <button className="px-3 py-1 border rounded text-blue-600 flex gap-1 items-center">
              <Pencil size={14} /> Update
            </button>

            <button className="px-3 py-1 border rounded text-green-600 flex gap-1 items-center">
              <MessageCircle size={14} /> WhatsApp
            </button>

            <button
              onClick={handleExport}
              className="px-3 py-1 border rounded text-blue-600 flex gap-1 items-center"
            >
              <Download size={14} /> Export
            </button>

            <button className="px-3 py-1 border border-red-300 text-red-600 rounded flex gap-1 items-center">
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      )}

      {/* VIEW */}
      {view === "list" ? (
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs">
              <tr>
                <th>
                  <input type="checkbox" onChange={toggleAll} />
                </th>
                <th className="text-left p-3">Name</th>
                {visibleColumns.value && <th className="text-left p-3">Value</th>}
                {visibleColumns.company && <th className="text-left p-3">Company</th>}
                {visibleColumns.owner && <th className="text-left p-3">Owner</th>}
                {visibleColumns.id && <th className="text-left p-3">ID</th>}
                {visibleColumns.actual && <th className="text-left p-3">Actual</th>}
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredDeals.map((deal) => (
                <tr key={deal.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedDeals.includes(deal.id)}
                      onChange={() => toggleRow(deal.id)}
                    />
                  </td>
                  <td>{deal.name}</td>
                  {visibleColumns.value && <td>{deal.value}</td>}
                  {visibleColumns.company && <td>{deal.company}</td>}
                  {visibleColumns.owner && <td>{deal.owner}</td>}
                  {visibleColumns.id && <td>{deal.id}</td>}
                  {visibleColumns.actual && <td>{deal.actual}</td>}
                  <td><MoreVertical size={16} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDeals.map((deal) => (
            <div key={deal.id} className="bg-white border rounded-lg p-4 shadow-sm">

              <div className="flex justify-between">
                <input
                  type="checkbox"
                  checked={selectedDeals.includes(deal.id)}
                  onChange={() => toggleRow(deal.id)}
                />
                <MoreVertical size={16} />
              </div>

              <h3 className="font-semibold mt-2">{deal.name}</h3>
              <p className="text-sm text-gray-500">{deal.company}</p>

              <div className="mt-2 text-sm">
                <p>Value: {deal.value}</p>
                <p>Actual: {deal.actual}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}