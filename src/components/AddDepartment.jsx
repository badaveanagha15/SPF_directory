
import { useState } from "react";
import { X } from "lucide-react";

export default function AddDealDrawer({ isOpen, onClose }) {
  const [form, setForm] = useState({
    uniqueId: "AUTO",
    customerName: "",
    companyName: "",
    accountManager: "",
    customerPoNumber: "",
    poDate: "",
    poValue: "",
    gstNumber: "",
    tax: "",
    paymentTerms: "",
    warrantyValidity: "",
    otherBudgetEstimation: "",
    emd: "",
    bankGuarantee: "",
    contactDetails: "",
    deliveryDetails: "",
    description: "",
    licenseKey: "",
    uploadPo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSave = () => {
    console.log(form);
    onClose();
  };

  if (!isOpen) return null;

  const fields = [
    ["Unique ID","uniqueId","text",true],
    ["Customer Name","customerName","text",false],
    ["Company Name","companyName","text",false],
    ["Account Manager","accountManager","text",false],
    ["Customer PO Number","customerPoNumber","text",false],
    ["PO Date","poDate","date",false],
    ["PO Value","poValue","number",false],
    ["GST Number","gstNumber","text",false],
    ["Tax","tax","number",false],
    ["Payment Terms","paymentTerms","text",false],
    ["Warranty Validity","warrantyValidity","date",false],
    ["Other Budget Estimation","otherBudgetEstimation","number",false],
    ["EMD","emd","text",false],
    ["Bank Guarantee","bankGuarantee","text",false],
    ["Contact Details","contactDetails","text",false],
    ["Delivery Details","deliveryDetails","text",false],
    ["License Key","licenseKey","text",false],
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/20" onClick={onClose}></div>

      <div className="w-[60%] bg-white h-full shadow-xl flex flex-col">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Add Deal</h2>
          <button onClick={onClose}><X /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-4">
            {fields.map(([label,name,type,ro])=>(
              <div key={name}>
                <label className="block text-sm mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  readOnly={ro}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            ))}

            <div className="col-span-2">
              <label className="block text-sm mb-1">Description</label>
              <textarea
                name="description"
                rows="4"
                value={form.description}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm mb-1">Upload PO</label>
              <input
                type="file"
                name="uploadPo"
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
        </div>

        <div className="border-t px-6 py-4 flex justify-end gap-3">
          <button onClick={onClose} className="border rounded px-4 py-2">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white rounded px-4 py-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
