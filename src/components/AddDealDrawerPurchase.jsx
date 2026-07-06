import { useState } from "react";
import { X } from "lucide-react";

export default function AddDealDrawer({ isOpen, onClose }) {
  const [form, setForm] = useState({
    attachF1PO: [],
    amendF1PO: "",
    uniqueId: "",
    customerName: "",
    customerPOValueIncTax: "",
    f1PONumber: "",
    f1PODate: "",
    tp: "",
    otherCredits: "",
    creditsRemark: "",
    f1POValue: "",
    tax: "",
    uploadF1PO: null,
    deliveryDetails: "",
    licenseKey: "",
    distiName: "",
    distiInvoiceNumber: "",
    distiInvoiceDate: "",
    distiInvoiceValueIncTax: "",
    distiInvoice: null,
    otherTransportExpense: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files, multiple } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? (multiple ? Array.from(files) : files[0]) : value,
    }));
  };

  const Input = ({label,name,type="text",multiple=false}) => (
    <div>
      <label className="block text-xs text-gray-500 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        multiple={multiple}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 text-sm"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/20" onClick={onClose}></div>

      <div className="w-[65%] bg-white h-full flex flex-col shadow-xl">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Add Deal (Purchase)</h2>
          <button onClick={onClose}><X /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <h3 className="font-semibold mb-5">Distributor Details</h3>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Attach Multiple F1 PO" name="attachF1PO" type="file" multiple={true}/>
            <Input label="Amend F1 PO" name="amendF1PO"/>
            <Input label="Unique ID" name="uniqueId"/>
            <Input label="Customer Name" name="customerName"/>

            <Input label="Customer PO Value (Inc Tax)" name="customerPOValueIncTax"/>
            <Input label="F1 PO Number" name="f1PONumber"/>
            <Input label="F1 PO Date" name="f1PODate" type="date"/>
            <Input label="TP" name="tp"/>
            <Input label="Other Credits" name="otherCredits"/>
            <Input label="Credits Remark" name="creditsRemark"/>
            <Input label="F1 PO Value" name="f1POValue"/>
            <Input label="Tax" name="tax"/>
            <Input label="Upload F1 PO" name="uploadF1PO" type="file"/>
            <Input label="Delivery Details" name="deliveryDetails"/>
            <Input label="License Key" name="licenseKey"/>
            <Input label="Disti Name" name="distiName"/>
            <Input label="Disti Invoice Number" name="distiInvoiceNumber"/>
            <Input label="Disti Invoice Date" name="distiInvoiceDate" type="date"/>
            <Input label="Disti Invoice Value (Inc Tax)" name="distiInvoiceValueIncTax"/>
            <Input label="Disti Invoice" name="distiInvoice" type="file"/>
            <Input label="Other / Transport Expense" name="otherTransportExpense"/>
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
