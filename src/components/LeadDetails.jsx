import { useState } from "react";
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  MessageCircle,
  Pencil,
  ChevronDown,
  CheckCircle,
  Calendar,
  FileText,
  Upload,
  Download,
  Trash2,
  X,
} from "lucide-react";

const stages = ["New", "Contacted", "Nurturing", "Qualified", "Converted"];

export default function LeadDetail() {
  const [activeTab, setActiveTab] = useState("Communication");
  const [currentStage, setCurrentStage] = useState(1);
  const [selectedTimelineFilter, setSelectedTimelineFilter] =
    useState("All");

  const [notes, setNotes] = useState([
    {
      user: "Rinku",
      time: "Today, 11:30 AM",
      content: "Client requested pricing sheet.",
    },
  ]);

  const [newNote, setNewNote] = useState("");

  const [files, setFiles] = useState([
    "proposal.pdf",
    "pricing.xlsx",
  ]);

  const [showCallModal, setShowCallModal] = useState(false);
  const [showEmailDrawer, setShowEmailDrawer] = useState(false);
  const [showConvertModal, setShowConvertModal] = useState(false);

  const lead = {
    name: "ABCD SINGH",
    id: "LEAD-0012",
    company: "TechNova Pvt Ltd",
    owner: "Rinku",
    status: stages[currentStage],
    score: 85,
  };

  const activities = [
    {
      type: "Call",
      title: "Follow-up Call",
      time: "Today, 4:00 PM",
      owner: "Rinku",
    },
    {
      type: "Email",
      title: "Proposal Sent",
      time: "Yesterday, 2:20 PM",
      owner: "Akshay",
    },
    {
      type: "Meeting",
      title: "Requirement Discussion",
      time: "2 days ago",
      owner: "Rinku",
    },
  ];

  const addNote = () => {
    if (!newNote.trim()) return;

    setNotes([
      {
        user: "Rinku",
        time: "Just now",
        content: newNote,
      },
      ...notes,
    ]);

    setNewNote("");
  };

  const uploadFile = () => {
    setFiles([...files, `document-${files.length + 1}.pdf`]);
  };

  const updateStage = (index) => {
    setCurrentStage(index);
  };

  const convertLead = () => {
    alert("Lead Converted Successfully");
    setShowConvertModal(false);
  };

  const getScoreColor = () => {
    if (lead.score >= 80) return "text-green-600";
    if (lead.score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const timelineFilters = ["All", "Calls", "Emails", "Meetings", "Tasks"];

  return (
    <div className="ml-[60px] pt-16 p-6 bg-[#F1F5F9] min-h-screen">
      {/* PIPELINE */}
      <div className="bg-white border rounded-lg shadow-sm p-4 mb-5">
        <div className="flex flex-wrap gap-2">
          {stages.map((stage, index) => (
            <button
              key={stage}
              onClick={() => updateStage(index)}
              className={`px-4 py-2 text-sm rounded-md font-medium ${
                index < currentStage
                  ? "bg-green-500 text-white"
                  : index === currentStage
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {stage}
            </button>
          ))}

          <button className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md text-sm">
            Mark Status as Complete
          </button>
        </div>
      </div>

      {/* PROFILE HEADER */}
      <div className="bg-white border rounded-lg shadow-sm p-5 mb-5 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">{lead.name}</h1>
          <p className="text-sm text-gray-500">
            {lead.id} • {lead.company}
          </p>
          <p className="text-sm text-gray-500">Owner: {lead.owner}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowEmailDrawer(true)}
            className="p-2 border rounded-md"
          >
            <Mail size={16} />
          </button>

          <button className="p-2 border rounded-md">
            <Phone size={16} />
          </button>

          <button className="p-2 border rounded-md">
            <MessageCircle size={16} />
          </button>

          <button
            onClick={() => setShowCallModal(true)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            Log Call
          </button>

          <button className="px-3 py-2 border rounded-md text-sm">
            Edit
          </button>

          <button
            onClick={() => setShowConvertModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
          >
            Convert
          </button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-[30%_40%_30%] gap-5">
        {/* LEFT */}
        <div className="space-y-4">
          <Card title="About">
            <Field label="Lead Name" value={lead.name} />
            <Field label="Status" value={lead.status} />
            <Field label="Owner" value="Rinku" />
            <Field label="Source" value="Website" />
            <Field label="Industry" value="Software" />
            <Field label="Annual Revenue" value="₹1Cr" />
            <Field label="Company Size" value="50-100" />
            <Field label="Lead Score" value="85/100" />
          </Card>

          <Card title="Get In Touch">
            <IconField icon={<Mail size={14} />} text="lead@email.com" />
            <IconField icon={<Phone size={14} />} text="+91 9876543210" />
            <IconField icon={<Phone size={14} />} text="+91 9123456789" />
            <IconField icon={<Globe size={14} />} text="www.tech.com" />
            <IconField
              icon={<MapPin size={14} />}
              text="Delhi, India"
            />
          </Card>

          <Card title="Segment">
            <Field label="Interest Level" value="High" />
            <Field label="Budget" value="₹1,50,000" />
            <Field label="Timeline" value="1 Month" />
            <Field label="Priority" value="High" />
          </Card>
        </div>

        {/* CENTER */}
        <div className="space-y-4">
          <Card>
            <div className="flex gap-2 border-b pb-3 mb-4">
              {["Communication", "Professional", "Requirements"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-md text-sm ${
                      activeTab === tab
                        ? "bg-blue-600 text-white"
                        : "text-gray-600"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

            {activeTab === "Communication" && (
              <div className="space-y-3">
                <ActivityRow title="Call with Client" />
                <ActivityRow title="Proposal Email Sent" />
                <ActivityRow title="WhatsApp Follow-up" />
              </div>
            )}

            {activeTab === "Professional" && (
              <div className="space-y-2">
                <Field label="Job Title" value="CTO" />
                <Field label="Department" value="Technology" />
                <Field label="LinkedIn" value="linkedin.com/user" />
                <Field label="Decision Maker" value="Yes" />
              </div>
            )}

            {activeTab === "Requirements" && (
              <div className="space-y-2">
                <Field label="Product Interest" value="CRM Suite" />
                <Field
                  label="Requirement Summary"
                  value="Sales automation"
                />
                <Field label="Budget" value="₹2L" />
                <Field label="Timeline" value="30 Days" />
                <Field label="Notes" value="Urgent implementation" />
              </div>
            )}
          </Card>

          <Card title="Activity Timeline">
            <div className="flex gap-2 mb-4 flex-wrap">
              {timelineFilters.map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedTimelineFilter(item)}
                  className={`px-3 py-1 rounded-full text-xs ${
                    selectedTimelineFilter === item
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {activities.map((item, i) => (
              <div
                key={i}
                className="flex justify-between py-3 border-b hover:bg-gray-50 px-2 rounded"
              >
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {item.owner}
                </span>
              </div>
            ))}
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <Card title="AI Summary">
            <div className="text-center mb-4">
              <div
                className={`text-4xl font-bold ${getScoreColor()}`}
              >
                {lead.score}
              </div>
              <p className="text-sm text-gray-500">Lead Score</p>
            </div>

            <ul className="text-sm list-disc ml-5 space-y-2">
              <li>High intent lead</li>
              <li>Interested in CRM automation</li>
              <li>Budget above ₹1L</li>
              <li>Follow up within 24 hrs</li>
            </ul>
          </Card>

          <Card title="Upcoming Task">
            <p className="font-medium">Demo Call with Client</p>
            <p className="text-blue-600 text-lg font-semibold mt-2">
              02h 14m remaining
            </p>
          </Card>

          <Card title="Notes">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add internal notes..."
              className="w-full border rounded-md p-3 text-sm"
            />

            <button
              onClick={addNote}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Add Note
            </button>

            <div className="mt-4 space-y-3">
              {notes.map((note, i) => (
                <div key={i} className="border rounded-md p-3">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{note.user}</span>
                    <span>{note.time}</span>
                  </div>
                  <p className="text-sm mt-1">{note.content}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Files">
            <div className="border-2 border-dashed rounded-md p-4 text-center text-sm text-gray-500">
              Drag & Drop files here
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={uploadFile}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <Upload size={14} className="inline mr-1" />
                Upload
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {files.map((file, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border p-2 rounded-md"
                >
                  <span className="text-sm">{file}</span>
                  <div className="flex gap-2">
                    <Download size={14} className="cursor-pointer" />
                    <Trash2 size={14} className="cursor-pointer" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* RELATED RECORDS */}
      <div className="mt-5 grid md:grid-cols-3 gap-4">
        <Card title="Related Tasks">Demo Follow-up</Card>
        <Card title="Related Deals">CRM Annual Subscription</Card>
        <Card title="Related Contacts">Rahul Sharma</Card>
      </div>

      {/* AUDIT */}
      <div className="mt-5 bg-white border rounded-lg shadow-sm p-4">
        <div className="flex justify-between">
          <h3 className="font-medium">Audit Trail</h3>
          <ChevronDown size={16} />
        </div>

        <div className="mt-3 text-sm text-gray-600 space-y-2">
          <p>Created By: Admin</p>
          <p>Updated By: Rinku</p>
          <p>Created Date: Apr 20, 2026</p>
          <p>Last Modified: Today</p>
        </div>
      </div>

      {/* CALL MODAL */}
      {showCallModal && (
        <Modal onClose={() => setShowCallModal(false)} title="Log Call">
          <input
            placeholder="Call Outcome"
            className="w-full border rounded-md p-2 mb-3"
          />
          <textarea
            placeholder="Call Notes"
            className="w-full border rounded-md p-2"
          />
          <ModalFooter
            onClose={() => setShowCallModal(false)}
            onSave={() => setShowCallModal(false)}
          />
        </Modal>
      )}

      {/* EMAIL DRAWER */}
      {showEmailDrawer && (
        <>
          <div
            onClick={() => setShowEmailDrawer(false)}
            className="fixed inset-0 bg-black/30 z-40"
          />

          <div className="fixed top-0 right-0 w-[450px] h-full bg-white z-50 shadow-lg p-5">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Compose Email</h3>
              <X
                className="cursor-pointer"
                onClick={() => setShowEmailDrawer(false)}
              />
            </div>

            <input
              placeholder="Subject"
              className="w-full border rounded-md p-2 mb-3"
            />

            <textarea
              rows={12}
              placeholder="Message body"
              className="w-full border rounded-md p-2"
            />

            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md">
              Send Email
            </button>
          </div>
        </>
      )}

      {/* CONVERT MODAL */}
      {showConvertModal && (
        <Modal
          onClose={() => setShowConvertModal(false)}
          title="Convert Lead"
        >
          <input
            placeholder="Account Name"
            className="w-full border rounded-md p-2 mb-3"
          />
          <input
            placeholder="Contact Name"
            className="w-full border rounded-md p-2 mb-3"
          />
          <input
            placeholder="Deal Name"
            className="w-full border rounded-md p-2"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setShowConvertModal(false)}
              className="border px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={convertLead}
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Convert Now
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* COMPONENTS */

function Card({ title, children }) {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-4">
      {title && <h3 className="font-medium mb-4">{title}</h3>}
      {children}
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="mb-3">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  );
}

function IconField({ icon, text }) {
  return (
    <div className="flex items-center gap-2 mb-3 text-sm">
      {icon}
      {text}
    </div>
  );
}

function ActivityRow({ title }) {
  return (
    <div className="border rounded-md p-3 hover:bg-gray-50">
      <p className="text-sm">{title}</p>
    </div>
  );
}

function Modal({ children, title, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px] p-5">
        <div className="flex justify-between mb-4">
          <h3 className="font-semibold">{title}</h3>
          <X className="cursor-pointer" onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  );
}

function ModalFooter({ onClose, onSave }) {
  return (
    <div className="flex justify-end gap-2 mt-4">
      <button
        onClick={onClose}
        className="border px-4 py-2 rounded-md"
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Save
      </button>
    </div>
  );
}