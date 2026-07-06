import { useState } from "react";
import {
  MoreHorizontal,
  Pencil,
  Phone,
  MapPin,
  Mail,
  Calendar,
  CheckCircle2,
  Upload,
  X,
  ChevronDown,
} from "lucide-react";

export default function AccountDetails() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showOpportunityModal, setShowOpportunityModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [accountData, setAccountData] = useState({
    name: "abcdprivateltd",
    website: "www.abcd.com",
    type: "Customer",
    description: "Enterprise CRM customer",
    parent: "ABCD Group",
    owner: "Rinku Singh",
    phone: "+91 9650394795",
    billing: "New Delhi, India",
    shipping: "Mumbai, India",
  });

  const [activities] = useState([
    {
      icon: <CheckCircle2 size={15} className="text-green-600" />,
      title: "Upcoming task with Rinku Singh",
      time: "25-Apr",
    },
    {
      icon: <Phone size={15} className="text-blue-600" />,
      title: "Logged a follow-up call",
      time: "Yesterday",
    },
    {
      icon: <Mail size={15} className="text-purple-600" />,
      title: "Proposal email sent",
      time: "Yesterday",
    },
  ]);

  const [files] = useState(["proposal.pdf", "pricing.xlsx"]);
  const [notes, setNotes] = useState([
    "Need follow-up regarding annual subscription.",
  ]);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes([newNote, ...notes]);
    setNewNote("");
  };

  const updateField = (field, value) => {
    setAccountData({ ...accountData, [field]: value });
  };

  return (
    <div className="ml-[60px] pt-16 p-6 bg-[#F1F5F9] min-h-screen overflow-x-hidden max-w-full">
      {/* ACCOUNT HEADER */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-4 flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
            A
          </div>

          <div>
            <p className="text-xs text-gray-500">Account</p>
            <h1 className="text-2xl font-semibold text-slate-800">
              {accountData.name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowContactModal(true)}
            className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
          >
            New Contact
          </button>

          <button
            onClick={() => setShowOpportunityModal(true)}
            className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
          >
            New Opportunity
          </button>

          <button
            onClick={() => setShowEditModal(true)}
            className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
          >
            Edit
          </button>

          <button className="px-3 py-2 border rounded-lg hover:bg-gray-50">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-[31%_35%_31%] gap-4 max-w-full">
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          <Card title="About">
            <EditableRow
              label="Account Name"
              value={accountData.name}
              onChange={(v) => updateField("name", v)}
            />
            <EditableRow
              label="Website"
              value={accountData.website}
              onChange={(v) => updateField("website", v)}
            />
            <EditableRow
              label="Type"
              value={accountData.type}
              onChange={(v) => updateField("type", v)}
            />
            <EditableRow
              label="Description"
              value={accountData.description}
              onChange={(v) => updateField("description", v)}
            />
            <EditableRow
              label="Parent Account"
              value={accountData.parent}
              onChange={(v) => updateField("parent", v)}
            />
            <EditableRow
              label="Account Owner"
              value={accountData.owner}
              onChange={(v) => updateField("owner", v)}
            />
          </Card>

          <Card title="Get In Touch">
            <EditableRow
              label="Phone"
              value={accountData.phone}
              icon={<Phone size={14} />}
              onChange={(v) => updateField("phone", v)}
            />
            <EditableRow
              label="Billing Address"
              value={accountData.billing}
              icon={<MapPin size={14} />}
              onChange={(v) => updateField("billing", v)}
            />
            <EditableRow
              label="Shipping Address"
              value={accountData.shipping}
              icon={<MapPin size={14} />}
              onChange={(v) => updateField("shipping", v)}
            />
          </Card>

          <Card title="History">
            <div className="space-y-3 text-sm">
              <p className="text-gray-700">
                Created By <span className="text-blue-600">Rinku Singh</span>
              </p>
              <p className="text-xs text-gray-500">24/04/2026, 1:02 PM</p>

              <p className="text-gray-700">
                Last Modified By{" "}
                <span className="text-blue-600">Rinku Singh</span>
              </p>
              <p className="text-xs text-gray-500">24/04/2026, 1:02 PM</p>
            </div>
          </Card>
        </div>

        {/* CENTER COLUMN */}
        <div className="space-y-4">
          <Card>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Email", "Event", "Log Call", "Task", "Notes"].map((item) => (
                <button
                  key={item}
                  className="px-4 py-2 border rounded-full text-sm hover:bg-gray-50"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="bg-slate-50 rounded-lg px-3 py-2 text-sm text-gray-600 mb-4">
              Only show activities with insights
            </div>

            <div className="space-y-3">
              {activities.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 border-b pb-3 last:border-none"
                >
                  <div className="mt-1">{item.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700">
              Show All Activities
            </button>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-3">
          <Card title="Contacts (1)">
            <div className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
              <p className="font-medium text-blue-600">Rinku Singh</p>
              <p className="text-xs text-gray-500">Title: Decision Maker</p>
              <p className="text-xs text-gray-500">Email: rinku@email.com</p>
              <p className="text-xs text-gray-500">Phone: +91 9650394795</p>
            </div>
            <button className="w-full mt-3 border-t pt-3 text-sm text-blue-600">
              View All
            </button>
          </Card>

          <Card title="Opportunities (1)">
            <div className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
              <p className="font-medium text-blue-600">
                CRM Annual Subscription
              </p>
              <p className="text-xs text-gray-500">Stage: Qualification</p>
              <p className="text-xs text-gray-500">Amount: ₹1,50,000</p>
              <p className="text-xs text-gray-500">Close Date: 30/06/2026</p>
            </div>
            <button className="w-full mt-3 border-t pt-3 text-sm text-blue-600">
              View All
            </button>
          </Card>

          <Card title="Leads (1)">
            <div className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
              <p className="font-medium text-blue-600">ABCD Lead</p>
              <p className="text-xs text-gray-500">Status: Qualified</p>
              <p className="text-xs text-gray-500">Source: Website</p>
              <p className="text-xs text-gray-500">Owner: Rinku Singh</p>
            </div>
            <button className="w-full mt-3 border-t pt-3 text-sm text-blue-600">
              View All
            </button>
          </Card>

          <Card title="Files (2)">
            <div className="border-2 border-dashed rounded-lg p-5 text-center">
              <Upload size={18} className="mx-auto text-gray-400 mb-2" />
              <button className="text-blue-600 text-sm font-medium">
                Upload Files
              </button>
              <p className="text-xs text-gray-400 mt-1">Or drop files</p>
            </div>

            <div className="mt-3 space-y-2">
              {files.map((file) => (
                <div
                  key={file}
                  className="border rounded px-3 py-2 text-sm hover:bg-gray-50"
                >
                  {file}
                </div>
              ))}
            </div>
          </Card>

          <Card title="Notes">
            <textarea
              rows={3}
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add account note..."
              className="w-full border rounded-lg p-3 text-sm"
            />

            <button
              onClick={addNote}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
            >
              Add Note
            </button>

            <div className="space-y-2 mt-3">
              {notes.map((note, i) => (
                <div
                  key={i}
                  className="bg-slate-50 border rounded-lg p-3 text-sm"
                >
                  {note}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* MODALS */}
      {showContactModal && (
        <Modal title="New Contact" onClose={() => setShowContactModal(false)}>
          <FormInput label="First Name" />
          <FormInput label="Last Name" />
          <FormInput label="Email" />
          <FormInput label="Phone" />
        </Modal>
      )}

      {showOpportunityModal && (
        <Modal
          title="New Opportunity"
          onClose={() => setShowOpportunityModal(false)}
        >
          <FormInput label="Opportunity Name" />
          <FormInput label="Amount" />
          <FormInput label="Stage" />
          <FormInput label="Close Date" />
        </Modal>
      )}

      {showEditModal && (
        <Modal title="Edit Account" onClose={() => setShowEditModal(false)}>
          <FormInput label="Account Name" />
          <FormInput label="Website" />
          <FormInput label="Type" />
          <FormInput label="Phone" />
        </Modal>
      )}
    </div>
  );
}

/* COMPONENTS */

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3">
      {title && (
        <h3 className="font-medium text-sm text-gray-700 mb-3">{title}</h3>
      )}
      {children}
    </div>
  );
}

function EditableRow({ label, value, onChange, icon }) {
  return (
    <div className="flex justify-between items-center border-b py-3 last:border-none">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        {icon}
        {label}
      </div>

      <div className="flex items-center gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-sm border rounded px-2 py-1 text-right"
        />
        <Pencil size={13} className="text-gray-400" />
      </div>
    </div>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-[500px] mx-4 p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">{title}</h2>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3">{children}</div>

        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-sm"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function FormInput({ label }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <input className="w-full border rounded-lg px-3 py-2" />
    </div>
  );
}