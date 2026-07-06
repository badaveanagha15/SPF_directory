import { useState } from "react";
import { X } from "lucide-react";

export default function AddDealDrawer({ isOpen, onClose }) {
  const [form, setForm] = useState({
    uniqueId:"",
    accountManager:"",
    customerName:"",
    customerPONumber:"",
    poDate:"",
    poValue:"",
    tax:"",
    warrantyValidity:"",
    otherBudgetEstimation:"",
    gstNumber:"",
    paymentTerms:"",
    uploadPO:null,
    emd:"",
    bankGuarantee:"",
    contactDetails:"",
    deliveryDetails:"",
    description:"",
    licenseKey:"",
  });

  if(!isOpen) return null;

  const handleChange=(e)=>{
    const {name,value,files}=e.target;
    setForm(prev=>({...prev,[name]:files?files[0]:value}));
  };

  const fields=[
    ["Unique ID","uniqueId","text"],
    ["Account Manager","accountManager","text"],
    ["Customer Name","customerName","text"],
    ["Customer PO Number","customerPONumber","text"],
    ["PO Date","poDate","date"],
    ["PO Value","poValue","text"],
    ["Tax","tax","text"],
    ["Warranty Validity","warrantyValidity","date"],
    ["Other Budget Estimation","otherBudgetEstimation","text"],
    ["GST Number","gstNumber","text"],
    ["Payment Terms","paymentTerms","text"],
    ["Upload PO","uploadPO","file"],
    ["EMD","emd","text"],
    ["Bank Guarantee","bankGuarantee","text"],
    ["Contact Details","contactDetails","text"],
    ["Delivery Details","deliveryDetails","text"],
    ["Description","description","text"],
    ["License Key","licenseKey","text"],
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/20" onClick={onClose}/>
      <div className="w-[65%] bg-white h-full flex flex-col shadow-xl">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Add Deal</h2>
          <button onClick={onClose}><X/></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <h3 className="font-semibold mb-5">Customer Information</h3>
          <div className="grid grid-cols-2 gap-4">
            {fields.map(([label,name,type])=>(
              <div key={name}>
                <label className="block text-xs text-gray-500 mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t px-6 py-3 flex justify-end gap-3">
          <button onClick={onClose} className="border rounded px-4 py-2">Cancel</button>
          <button className="bg-blue-600 text-white rounded px-4 py-2">Save</button>
        </div>
      </div>
    </div>
  );
}
