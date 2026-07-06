import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckSquare,
  StickyNote,
  MoreHorizontal,
  RefreshCw,
  Upload,
  Pencil,
} from "lucide-react";

export default function ContactDetails() {
  const [showOpportunityModal, setShowOpportunityModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [contactData] = useState({
    name: "Mr. gfhf dfg",
    id: "CONT-0012",
    account: "abcdprivateltd",
    title: "Sales Manager",
    department: "Sales",
    reportsTo: "Rinku Singh",
    leadSource: "Website",
    owner: "Akshay Mehta",
    mobile: "+91 9876543210",
    phone: "+91 9999999999",
    email: "contact@email.com",
    altEmail: "alternate@email.com",
    address: "New Delhi, India",
    createdBy: "Admin",
    modifiedBy: "Akshay",
  });

  const [activities] = useState([
    {
      type: "call",
      title: "Upcoming Call with Client",
      description: "Discuss pricing & onboarding",
      owner: "Akshay",
      time: "Today 4:00 PM",
    },
    {
      type: "email",
      title: "Proposal email sent",
      description: "Pricing PDF shared",
      owner: "Rinku",
      time: "Yesterday",
    },
    {
      type: "task",
      title: "Task due tomorrow",
      description: "Follow-up demo",
      owner: "Rohit",
      time: "Tomorrow",
    },
  ]);

  const [files, setFiles] = useState(["proposal.pdf", "notes.docx"]);
  const [notes, setNotes] = useState([
    {
      user: "Akshay",
      time: "2 hours ago",
      content: "Interested in enterprise package.",
    },
  ]);

  const [noteInput, setNoteInput] = useState("");

  const addNote = () => {
    if (!noteInput.trim()) return;

    setNotes([
      {
        user: "You",
        time: "Just now",
        content: noteInput,
      },
      ...notes,
    ]);

    setNoteInput("");
  };

  const uploadFile = () => {
    setFiles([...files, `file-${files.length + 1}.pdf`]);
  };

  const getIcon = (type) => {
    switch (type) {
      case "call":
        return <Phone size={16} className="text-blue-600" />;
      case "email":
        return <Mail size={16} className="text-green-600" />;
      case "task":
        return <CheckSquare size={16} className="text-orange-500" />;
      default:
        return <StickyNote size={16} />;
    }
  };

  const DetailRow = ({ label, value }) => (
    <div className="flex justify-between items-center gap-3 py-3 border-b text-sm group">
      <span className="text-gray-500 shrink-0">{label}</span>

      <div className="flex items-center gap-2 min-w-0">
        <span className="font-medium text-gray-800 truncate">{value}</span>
        <Pencil
          size={14}
          className="opacity-0 group-hover:opacity-100 cursor-pointer text-gray-400 shrink-0"
        />
      </div>
    </div>
  );

  return (
    <div className="ml-[60px] w-[calc(100%-60px)] pt-16 p-6 bg-[#F1F5F9] min-h-screen overflow-x-hidden">
      {/* HEADER */}
      <div className="bg-white rounded-lg border shadow-sm px-5 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
            <User size={22} />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-gray-500">Contact</p>
            <h1 className="text-xl font-black truncate">{contactData.name}</h1>
            <p className="text-sm text-gray-500 truncate">
              {contactData.id} • {contactData.account}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowOpportunityModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
          >
            New Opportunity
          </button>

          <button
            onClick={() => setShowEditModal(true)}
            className="px-4 py-2 border rounded-md text-sm"
          >
            Edit
          </button>

          <button className="p-2 border rounded-md">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 w-full">
        {/* LEFT */}
        <div className="xl:col-span-4 space-y-4 min-w-0">
          <div className="bg-white border rounded-lg shadow-sm p-4">
            <h2 className="font-black mb-3">About</h2>
            <DetailRow label="Full Name" value={contactData.name} />
            <DetailRow label="Account" value={contactData.account} />
            <DetailRow label="Title" value={contactData.title} />
            <DetailRow label="Department" value={contactData.department} />
            <DetailRow label="Reports To" value={contactData.reportsTo} />
            <DetailRow label="Lead Source" value={contactData.leadSource} />
            <DetailRow label="Owner" value={contactData.owner} />
          </div>

          <div className="bg-white border rounded-lg shadow-sm p-4">
            <h2 className="font-black mb-3">Get in Touch</h2>
            <DetailRow label="Mobile" value={contactData.mobile} />
            <DetailRow label="Phone" value={contactData.phone} />
            <DetailRow label="Email" value={contactData.email} />
            <DetailRow label="Alt Email" value={contactData.altEmail} />
            <DetailRow label="Address" value={contactData.address} />
          </div>

          <div className="bg-white border rounded-lg shadow-sm p-4">
            <h2 className="font-black mb-3">History</h2>
            <DetailRow label="Created By" value={contactData.createdBy} />
            <DetailRow label="Modified By" value={contactData.modifiedBy} />
          </div>
        </div>

        {/* CENTER */}
        <div className="xl:col-span-4 space-y-4 min-w-0">
          <div className="bg-white border rounded-lg shadow-sm p-4">
            <div className="flex flex-wrap gap-2">
              {[
                ["Email", Mail],
                ["Calendar", Calendar],
                ["Log Call", Phone],
                ["Task", CheckSquare],
                ["Notes", StickyNote],
              ].map(([label, Icon], i) => (
                <button
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm hover:bg-gray-50"
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border rounded-lg shadow-sm p-4">
            <div className="flex justify-between mb-4">
              <div className="flex flex-wrap gap-2 text-sm">
                <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                  Within 2 months
                </button>
                <button className="px-3 py-1 border rounded-full">
                  All activities
                </button>
              </div>

              <button>
                <RefreshCw size={16} />
              </button>
            </div>

            <h2 className="font-black mb-3">Activity Timeline</h2>

            <div className="space-y-3">
              {activities.map((item, i) => (
                <div
                  key={i}
                  className="border rounded-md p-3 hover:bg-gray-50"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 shrink-0">{getIcon(item.type)}</div>

                    <div className="min-w-0">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {item.owner} • {item.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 border rounded-md py-2 text-sm">
              Show All Activities
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="xl:col-span-4 space-y-4 min-w-0">
          <div className="bg-white border rounded-lg shadow-sm p-4">
            <h2 className="font-black mb-3">Opportunities (0)</h2>
            <p className="text-sm text-gray-500 mb-3">
              No opportunities linked
            </p>
            <button className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm">
              New Opportunity
            </button>
          </div>

          <div className="bg-white border rounded-lg shadow-sm p-4">
            <h2 className="font-black mb-3">Cases (0)</h2>
            <p className="text-sm text-gray-500">No active cases</p>
          </div>

          <div className="bg-white border rounded-lg shadow-sm p-4 overflow-hidden">
            <h2 className="font-black mb-3">Files ({files.length})</h2>

            <div className="border-2 border-dashed rounded-lg p-6 text-center text-sm text-gray-500">
              Or drop files here
            </div>

            <button
              onClick={uploadFile}
              className="mt-3 w-full border rounded-md py-2 text-sm flex justify-center items-center gap-2"
            >
              <Upload size={14} />
              Upload Files
            </button>

            <div className="mt-3 space-y-2">
              {files.map((file, i) => (
                <div key={i} className="text-sm border-b py-2 truncate">
                  {file}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border rounded-lg shadow-sm p-4">
            <h2 className="font-black mb-3">Notes</h2>

            <textarea
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Add internal note..."
              className="w-full border rounded-md p-3 text-sm h-24 resize-none"
            />

            <button
              onClick={addNote}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
            >
              Add Note
            </button>

            <div className="mt-4 space-y-3">
              {notes.map((note, i) => (
                <div key={i} className="border rounded-md p-3">
                  <p className="text-sm font-medium">{note.user}</p>
                  <p className="text-xs text-gray-400">{note.time}</p>
                  <p className="text-sm mt-2">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      {showOpportunityModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="font-black mb-4">New Opportunity</h2>

            <div className="space-y-3">
              <input className="w-full border rounded p-2" placeholder="Name" />
              <input className="w-full border rounded p-2" placeholder="Amount" />
              <input className="w-full border rounded p-2" placeholder="Stage" />
              <input className="w-full border rounded p-2" placeholder="Close Date" />
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setShowOpportunityModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="font-black mb-4">Edit Contact</h2>

            <div className="space-y-3">
              <input className="w-full border rounded p-2" defaultValue={contactData.name} />
              <input className="w-full border rounded p-2" defaultValue={contactData.title} />
              <input className="w-full border rounded p-2" defaultValue={contactData.email} />
              <input className="w-full border rounded p-2" defaultValue={contactData.phone} />
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}