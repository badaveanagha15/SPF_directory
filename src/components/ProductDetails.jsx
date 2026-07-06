import { useState } from "react";
import {
  MoreHorizontal,
  Pencil,
  Package,
  IndianRupee,
  Tag,
  Upload,
  X,
  CheckCircle2,
  Box,
  ShoppingBag,
  Layers3,
} from "lucide-react";

export default function ProductDetails() {
  const [showEditModal, setShowEditModal] = useState(false);

  const [productData, setProductData] = useState({
    name: "Solar Generator Pro Max",
    sku: "SKU-001",
    type: "Hardware",
    category: "Energy",
    price: "₹45,000",
    status: "In Stock",
    units: "145",
    owner: "Rinku Singh",
    description:
      "Portable enterprise-grade solar backup generator with lithium battery support and smart monitoring.",
  });

  const [activities] = useState([
    {
      icon: <CheckCircle2 size={15} className="text-green-600" />,
      title: "Inventory updated successfully",
      time: "Today",
    },
    {
      icon: <Package size={15} className="text-blue-600" />,
      title: "Warehouse sync completed",
      time: "Yesterday",
    },
  ]);

  const [deals] = useState([
    {
      name: "Solar Generator Bulk Deal",
      stage: "Negotiation",
      amount: "₹4,50,000",
    },
    {
      name: "Enterprise Energy Setup",
      stage: "Proposal Sent",
      amount: "₹9,20,000",
    },
  ]);

  const [files] = useState([
    "pricing-sheet.pdf",
    "product-brochure.pdf",
  ]);

  const [notes, setNotes] = useState([
    "Need to reorder inventory next month.",
  ]);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes([newNote, ...notes]);
    setNewNote("");
  };

  const updateField = (field, value) => {
    setProductData({ ...productData, [field]: value });
  };

  return (
    <div className="ml-[60px] pt-16 p-6 bg-[#F8FAFC] min-h-screen">
      {/* HEADER */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-5">
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow">
              <ShoppingBag size={24} />
            </div>

            <div>
              <p className="text-xs uppercase text-slate-500 font-medium">
                Product
              </p>

              <h1 className="text-3xl font-bold text-slate-800 mt-1">
                {productData.name}
              </h1>

              <div className="flex gap-3 mt-3 flex-wrap">
                <Badge text={productData.type} color="blue" />
                <Badge text={productData.category} color="purple" />
                <Badge text={productData.status} color="green" />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowEditModal(true)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50"
            >
              Edit Product
            </button>

            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <StatCard label="Price" value={productData.price} />
          <StatCard label="Units Available" value={productData.units} />
          <StatCard label="SKU" value={productData.sku} />
          <StatCard label="Owner" value={productData.owner} />
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-[31%_35%_31%] gap-4">
        {/* LEFT */}
        <div className="space-y-4">
          <Card title="About Product">
            <EditableRow
              label="Product Name"
              value={productData.name}
              onChange={(v) => updateField("name", v)}
            />
            <EditableRow
              label="SKU"
              value={productData.sku}
              icon={<Tag size={14} />}
              onChange={(v) => updateField("sku", v)}
            />
            <EditableRow
              label="Type"
              value={productData.type}
              icon={<Box size={14} />}
              onChange={(v) => updateField("type", v)}
            />
            <EditableRow
              label="Category"
              value={productData.category}
              icon={<Layers3 size={14} />}
              onChange={(v) => updateField("category", v)}
            />
            <EditableRow
              label="Units"
              value={productData.units}
              onChange={(v) => updateField("units", v)}
            />
          </Card>

          <Card title="History">
            <p className="text-sm text-slate-700">
              Created by Rinku Singh
            </p>
            <p className="text-xs text-slate-500 mt-1">
              24/04/2026, 01:02 PM
            </p>

            <p className="text-sm text-slate-700 mt-4">
              Modified by Akshay
            </p>
            <p className="text-xs text-slate-500 mt-1">
              25/04/2026, 10:30 AM
            </p>
          </Card>
        </div>

        {/* CENTER */}
        <div className="space-y-4">
          <Card title="Activity Timeline">
            <div className="space-y-3">
              {activities.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 border-b pb-3 last:border-none"
                >
                  {item.icon}

                  <div>
                    <p className="text-sm font-medium">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Description">
            <textarea
              rows={8}
              value={productData.description}
              onChange={(e) =>
                updateField("description", e.target.value)
              }
              className="w-full border rounded-lg p-3 text-sm"
            />
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <Card title={`Deals (${deals.length})`}>
            <div className="space-y-3">
              {deals.map((deal, index) => (
                <div
                  key={index}
                  className="border rounded-xl p-3 hover:bg-slate-50"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-blue-600">
                        {deal.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {deal.stage}
                      </p>
                    </div>

                    <span className="text-sm font-semibold text-green-700">
                      {deal.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Files">
            <div className="border-2 border-dashed rounded-xl p-5 text-center">
              <Upload
                size={18}
                className="mx-auto text-slate-400 mb-2"
              />
              <button className="text-blue-600 text-sm font-medium">
                Upload Files
              </button>
            </div>

            <div className="space-y-2 mt-3">
              {files.map((file) => (
                <div
                  key={file}
                  className="border rounded-lg px-3 py-2 text-sm hover:bg-slate-50"
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
              placeholder="Add product note..."
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

      {/* MODAL */}
      {showEditModal && (
        <Modal
          title="Edit Product"
          onClose={() => setShowEditModal(false)}
        >
          <FormInput label="Product Name" />
          <FormInput label="SKU" />
          <FormInput label="Price" />
          <FormInput label="Units" />
        </Modal>
      )}
    </div>
  );
}

/* COMPONENTS */

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
      <h3 className="font-semibold text-slate-700 mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

function EditableRow({ label, value, onChange, icon }) {
  return (
    <div className="flex justify-between items-center border-b py-3 last:border-none">
      <div className="flex items-center gap-2 text-sm text-slate-600">
        {icon}
        {label}
      </div>

      <div className="flex items-center gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-sm border rounded px-2 py-1 text-right"
        />
        <Pencil size={13} className="text-slate-400" />
      </div>
    </div>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-[500px] p-6 shadow-xl">
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
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
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
      <label className="block text-sm text-slate-600 mb-1">
        {label}
      </label>
      <input className="w-full border rounded-lg px-3 py-2" />
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="font-semibold text-slate-800 mt-1">{value}</p>
    </div>
  );
}

function Badge({ text, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    purple: "bg-purple-100 text-purple-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${colors[color]}`}
    >
      {text}
    </span>
  );
}