import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  MoreHorizontal,
  User,
  X,
} from "lucide-react";

const contactsData = [
  {
    name: "Rinku Singh",
    initials: "RS",
    company: "TechCorp",
    role: "Sales Manager",
    email: "rinku@email.com",
    mobile: "+91 9650394795",
    interaction: "Apr 20, 2026",
    owner: "Akshay",
    status: "Active",
  },
  {
    name: "Akshay Mehta",
    initials: "AM",
    company: "StartupX",
    role: "Founder",
    email: "akshay@email.com",
    mobile: "+91 9876543210",
    interaction: "Apr 10, 2026",
    owner: "Rohit",
    status: "Neglected",
  },
  {
    name: "Rohit Sharma",
    initials: "RO",
    company: "Infosys",
    role: "CTO",
    email: "rohit@email.com",
    mobile: "+91 9988776655",
    interaction: "Apr 22, 2026",
    owner: "Rinku",
    status: "Active",
  },
  {
    name: "Priya Verma",
    initials: "PV",
    company: "HCL",
    role: "HR Head",
    email: "priya@email.com",
    mobile: "+91 9123456789",
    interaction: "Apr 05, 2026",
    owner: "Akshay",
    status: "Neglected",
  },
];

export default function Contact() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [toast, setToast] = useState("");
  const [open, setOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate();

  /* FILTER */

  const filtered = contactsData.filter((contact) => {
    const matchesSearch = contact.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === "All"
        ? true
        : contact.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const selectedContacts = selected.map((i) => filtered[i]);

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
    console.log("Export:", selectedContacts);
  };

  const handleImport = () => {
    setToast("Contacts imported successfully ✅");

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
          {/* LEFT */}

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700">
              {selected.length} Contacts selected
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
            Contacts
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Contacts &gt; List | Total Contacts: {filtered.length}
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
            + Add Contact
          </button>
        </div>
      </div>

      {/* FILTER + SEARCH */}

      <div className="bg-white border border-slate-200 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search contacts..."
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
            All Contacts
          </button>

          <button
            onClick={() => setActiveFilter("Active")}
            className={`px-4 py-2 rounded-full text-sm transition ${
              activeFilter === "Active"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Active
          </button>

          <button
            onClick={() => setActiveFilter("Neglected")}
            className={`px-4 py-2 rounded-full text-sm transition ${
              activeFilter === "Neglected"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Neglected
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
                  checked={
                    filtered.length > 0 &&
                    selected.length === filtered.length
                  }
                  onChange={toggleSelectAll}
                  className="cursor-pointer"
                />
              </th>

              <th className="p-3 text-left">Contact Name</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Mobile</th>
              <th className="p-3 text-left">Interaction</th>
              <th className="p-3 text-left">Owner</th>

              <th className="p-3 text-left">
                <MoreHorizontal size={14} />
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((contact, index) => (
              <tr
                key={index}
                className="border-t border-slate-100 hover:bg-slate-50 transition"
              >
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    checked={selected.includes(index)}
                    onChange={() => toggleRow(index)}
                    className="cursor-pointer"
                  />
                </td>

                {/* CONTACT */}

                <td className="p-3 cursor-pointer" onClick={() => navigate(`/contacts/${contact.id}`)}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-xs">
                      {contact.initials}
                    </div>

                    <div>
                      <div className="font-semibold text-slate-800">
                        {contact.name}
                      </div>

                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <User size={11} />
                        Contact Person
                      </div>
                    </div>
                  </div>
                </td>

                <td className="p-3 text-slate-700">
                  {contact.company}
                </td>

                <td className="p-3 text-slate-700">
                  {contact.role}
                </td>

                <td className="p-3 text-slate-700">
                  {contact.email}
                </td>

                <td className="p-3 text-slate-700">
                  {contact.mobile}
                </td>

                {/* STATUS */}

                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        contact.status === "Active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></span>

                    <span className="text-slate-700">
                      {contact.interaction}
                    </span>
                  </div>
                </td>

                <td className="p-3 text-slate-700">
                  {contact.owner}
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
            No Contacts Found
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
            : "Contact Details"}
        </div>

        <div className="p-4 space-y-4">
          {/* MULTI */}

          {selected.length > 1 && (
            <>
              {selectedContacts.map((contact, i) => (
                <div key={i}>• {contact.name}</div>
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
                  {selectedContacts[0].initials}
                </div>

                <div>
                  <div className="font-semibold">
                    {selectedContacts[0].name}
                  </div>

                  <div className="text-sm text-slate-500">
                    {selectedContacts[0].company}
                  </div>
                </div>
              </div>

              <div className="text-sm text-slate-600">
                {selectedContacts[0].email}
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
              No contact selected
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

      {/* ADD CONTACT MODAL */}

      {open && <AddContactModal onClose={() => setOpen(false)} />}
    </div>
  );
}

/* MODAL */

function AddContactModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[520px] rounded-xl shadow-2xl overflow-hidden">
        {/* HEADER */}

        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h2 className="font-semibold text-slate-800">
              Add Contact
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Create a new contact record
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded hover:bg-slate-100 flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}

        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <input
              className="w-full border border-slate-200 p-2.5 rounded-lg"
              placeholder="First Name *"
            />

            <input
              className="w-full border border-slate-200 p-2.5 rounded-lg"
              placeholder="Last Name *"
            />
          </div>

          <input
            className="w-full border border-slate-200 p-2.5 rounded-lg"
            placeholder="Email Address *"
          />

          <input
            className="w-full border border-slate-200 p-2.5 rounded-lg"
            placeholder="Mobile Number"
          />

          <input
            className="w-full border border-slate-200 p-2.5 rounded-lg"
            placeholder="Company Name"
          />

          <input
            className="w-full border border-slate-200 p-2.5 rounded-lg"
            placeholder="Role / Designation"
          />

          <input
            className="w-full border border-slate-200 p-2.5 rounded-lg"
            placeholder="Owner"
          />
        </div>

        {/* FOOTER */}

        <div className="flex justify-end gap-2 p-4 border-t bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-white"
          >
            Cancel
          </button>

          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Save Contact
          </button>
        </div>
      </div>
    </div>
  );
}