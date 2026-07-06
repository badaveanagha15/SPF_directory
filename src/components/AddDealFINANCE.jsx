import { useState } from "react";
import { X } from "lucide-react";

export default function AddDealDrawer({ isOpen, onClose }) {
  const [form, setForm] = useState({
    uniqueId: "",
    f1InvoiceNumber: "",
    f1InvoiceDate: "",
    customerName: "",
    poValue: "",
    tax: "",
    totalValue: "",
    customerAdvance: "",
    customerBalance: "",
    customerPartPayment: "",
    customerTDS: "",
    distiInvoiceNumber: "",
    f1POValue: "",
    distiInvoiceDate: "",
    otherExp: "",
    distiInvoiceValue: "",
  });

  const [cheques, setCheques] = useState([{ chequeNo: "", amount: "", date: "" }]);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addCheque = () =>
    setCheques([...cheques, { chequeNo: "", amount: "", date: "" }]);

  const updateCheque = (i, key, value) => {
    const arr = [...cheques];
    arr[i][key] = value;
    setCheques(arr);
  };

  const removeCheque = (i) =>
    setCheques(cheques.filter((_, index) => index !== i));

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/20" onClick={onClose}></div>

      <div className="w-[65%] bg-white h-full flex flex-col shadow-xl">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Add Deal</h2>
          <button onClick={onClose}><X /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">

          <section>
            <h3 className="font-semibold mb-4">Customer Details</h3>

            <div className="grid grid-cols-2 gap-4">
              {[
                ["uniqueId","Unique ID"],
                ["f1InvoiceNumber","F1 Invoice Number"],
                ["f1InvoiceDate","F1 Invoice Date","date"],
                ["customerName","Customer Name"],
                ["poValue","PO Value"],
                ["tax","Tax"],
                ["totalValue","Total Value"],
                ["customerAdvance","Customer Advance / Received"],
                ["customerBalance","Customer Balance"],
                ["customerPartPayment","Customer Part / Final Payment"],
                ["customerTDS","Customer TDS"],
              ].map(([name,label,type])=>(
                <div key={name}>
                  <label className="text-xs text-gray-500">{label}</label>
                  <input
                    type={type || "text"}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-semibold mb-4">Distributor Details</h3>

            <div className="grid grid-cols-2 gap-4">
              {[
                ["distiInvoiceNumber","Disti Invoice Number"],
                ["f1POValue","F1 PO Value"],
                ["distiInvoiceDate","Disti Invoice Date","date"],
                ["otherExp","Other Exp"],
                ["distiInvoiceValue","Disti Invoice Value"],
              ].map(([name,label,type])=>(
                <div key={name}>
                  <label className="text-xs text-gray-500">{label}</label>
                  <input
                    type={type || "text"}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <h4 className="font-medium">Distributor Cheques</h4>
              <button onClick={addCheque} className="text-blue-600 text-sm">+ Add Cheque</button>
            </div>

            {cheques.map((c,i)=>(
              <div key={i} className="grid grid-cols-4 gap-3 mt-3">
                <input placeholder="Cheque Number" className="border rounded px-3 py-2"
                  value={c.chequeNo}
                  onChange={e=>updateCheque(i,"chequeNo",e.target.value)}
                />
                <input placeholder="Amount" className="border rounded px-3 py-2"
                  value={c.amount}
                  onChange={e=>updateCheque(i,"amount",e.target.value)}
                />
                <input type="date" className="border rounded px-3 py-2"
                  value={c.date}
                  onChange={e=>updateCheque(i,"date",e.target.value)}
                />
                <button
                  className="border rounded px-3 py-2 text-red-500"
                  onClick={()=>removeCheque(i)}
                >
                  Remove
                </button>
              </div>
            ))}
          </section>

        </div>

        <div className="border-t px-6 py-3 flex justify-end gap-3">
          <button onClick={onClose} className="border px-4 py-2 rounded">Cancel</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
