import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddPaymentModal from "./AddPaymentModal";

import {
  Mail,
  Pencil,
  Download,
  Trash2,
  Loader2,
  Upload,
  RefreshCw,
  MoreHorizontal,
  CreditCard,
  Building2,
  IndianRupee,
  Eye,
} from "lucide-react";

const paymentsData = [
  {
    id: 1,
    paymentId: "PAY-1001",
    accountManager: "Akshay Mehta",
    customer: "ABC Technologies Pvt Ltd",
    distributor: "Delhi Distributor",
    invoice: "INV-001",
    paymentDate: "2026-07-01",
    amount: "₹25,000",
    chequeNumber: "CHQ123456",
    chequeDate: "2026-07-02",
    status: "Paid",
  },
  {
    id: 2,
    paymentId: "PAY-1002",
    accountManager: "Rinku Singh",
    customer: "XYZ Industries",
    distributor: "Noida Distributor",
    invoice: "INV-002",
    paymentDate: "2026-07-03",
    amount: "₹48,500",
    chequeNumber: "CHQ123457",
    chequeDate: "2026-07-04",
    status: "Pending",
  },
  {
    id: 3,
    paymentId: "PAY-1003",
    accountManager: "Rohit Sharma",
    customer: "Global Enterprises",
    distributor: "Mumbai Distributor",
    invoice: "INV-003",
    paymentDate: "2026-07-05",
    amount: "₹12,000",
    chequeNumber: "CHQ123458",
    chequeDate: "2026-07-06",
    status: "Overdue",
  },
  {
    id: 4,
    paymentId: "PAY-1004",
    accountManager: "Ankit Verma",
    customer: "Future Vision Pvt Ltd",
    distributor: "Lucknow Distributor",
    invoice: "INV-004",
    paymentDate: "2026-07-06",
    amount: "₹75,600",
    chequeNumber: "CHQ123459",
    chequeDate: "2026-07-07",
    status: "Paid",
  },
];

export default function Payments() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [toast, setToast] = useState("");
  const [open, setOpen] = useState(false);

  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = paymentsData.filter((payment) => {
    const matchesSearch =
      payment.customer.toLowerCase().includes(search.toLowerCase()) ||
      payment.paymentId.toLowerCase().includes(search.toLowerCase()) ||
      payment.accountManager.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === "All"
        ? true
        : payment.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const selectedPayments = selected.map((i) => filtered[i]);

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

  const handleExport = () => {
    console.log(selectedPayments);
  };

  const handleImport = () => {
    setToast("Payments imported successfully");

    setTimeout(() => {
      setToast("");
    }, 2000);
  };

  const handleSync = () => {
    setSyncing(true);

    setTimeout(() => {
      setSyncing(false);
      setToast("Payments synchronized");

      setTimeout(() => {
        setToast("");
      }, 2000);
    }, 2000);
  };

  return (
    <div className="ml-[60px]  p-6 pt-20 bg-slate-100 min-h-screen">

      {toast && (
        <div className="fixed top-20 right-6 bg-black text-white px-4 py-2 rounded shadow z-50">
          {toast}
        </div>
      )}

      {selected.length > 0 && (
        <div className="sticky top-14 z-40 bg-white border rounded-lg mb-4 px-4 py-2 flex items-center justify-between shadow">

          <div className="flex items-center gap-3">

            <span className="text-sm font-medium">

              {selected.length} Payments Selected

            </span>

          </div>

          <div className="flex gap-2">

            <button className="px-3 py-2 border rounded flex items-center gap-2 text-sm">
              <Mail size={15}/>
              Email
            </button>

            <button className="px-3 py-2 border rounded flex items-center gap-2 text-sm">
              <Pencil size={15}/>
              Update
            </button>

            <button
              onClick={handleExport}
              className="px-3 py-2 border rounded flex items-center gap-2 text-sm"
            >
              <Download size={15}/>
              Export
            </button>

            <button className="px-3 py-2 border border-red-300 text-red-600 rounded flex items-center gap-2 text-sm">
              <Trash2 size={15}/>
              Delete
            </button>

          </div>

        </div>
      )}

      <div className="flex justify-between items-center mb-5">

        <div>

          <h1 className="text-2xl font-black text-slate-800">
            Payments
          </h1>

          <p className="text-slate-500 mt-1 text-sm">
            Payments &gt; List | Total Payments : {filtered.length}
          </p>

        </div>

        <div className="flex gap-2">

          <button
            onClick={handleImport}
            className="px-3 py-2 bg-white border rounded-lg flex items-center gap-2 text-sm"
          >
            <Upload size={15}/>
            Import
          </button>

          <button
            onClick={handleExport}
            className="px-3 py-2 bg-white border rounded-lg flex items-center gap-2 text-sm"
          >
            <Download size={15}/>
            Export
          </button>

          <button
            onClick={handleSync}
            className="px-3 py-2 bg-white border rounded-lg flex items-center gap-2 text-sm"
          >
            {syncing ? (
              <Loader2 size={15} className="animate-spin"/>
            ) : (
              <RefreshCw size={15}/>
            )}

            Sync
          </button>

          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            + Add Payment
          </button>


          <AddPaymentModal
                  isOpen={open}
                  onClose={() => setOpen(false)}
                />

        </div>

      </div>

      <div className="bg-white rounded-lg border p-3 mb-4">

        <div className="flex gap-3 flex-wrap">

          <input
            type="text"
            placeholder="Search Payment..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="flex-1 min-w-[260px] border rounded-lg px-3 py-2"
          />

          {["All","Paid","Pending","Overdue"].map((item)=>(
            <button
              key={item}
              onClick={()=>setActiveFilter(item)}
              className={`px-4 py-2 rounded-full text-sm ${
                activeFilter===item
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 hover:bg-slate-200"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

      </div>

            {/* ================= TABLE ================= */}

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-slate-50 text-xs uppercase text-slate-500">

            <tr>

              <th className="p-3 w-12 text-center">

                <input
                  type="checkbox"
                  checked={
                    selected.length === filtered.length &&
                    filtered.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="cursor-pointer"
                />

              </th>

              <th className="p-3 text-left">Payment ID</th>

              <th className="p-3 text-left">
                Account Manager
              </th>

              <th className="p-3 text-left">
                Customer
              </th>

              <th className="p-3 text-left">
                Distributor
              </th>

              <th className="p-3 text-left">
                Invoice
              </th>

              <th className="p-3 text-left">
                Payment Date
              </th>

              <th className="p-3 text-left">
                Amount
              </th>

              <th className="p-3 text-left">
                Cheque No.
              </th>

              <th className="p-3 text-left">
                Cheque Date
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((payment, index) => (

              <tr
                key={payment.id}
                onClick={() =>
                  navigate(`/payments/${payment.id}`)
                }
                className="border-t border-slate-100 hover:bg-slate-50 transition cursor-pointer"
              >

                <td
                  className="p-3 text-center"
                  onClick={(e) => e.stopPropagation()}
                >

                  <input
                    type="checkbox"
                    checked={selected.includes(index)}
                    onChange={() => toggleRow(index)}
                  />

                </td>

                <td className="p-3">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">

                      <CreditCard
                        size={18}
                        className="text-blue-700"
                      />

                    </div>

                    <div>

                      <div className="font-semibold text-slate-800">

                        {payment.paymentId}

                      </div>

                      <div className="text-xs text-slate-500">

                        Payment Reference

                      </div>

                    </div>

                  </div>

                </td>

                <td className="p-3">

                  {payment.accountManager}

                </td>

                <td className="p-3">

                  <div className="flex items-center gap-2">

                    <Building2
                      size={16}
                      className="text-slate-500"
                    />

                    {payment.customer}

                  </div>

                </td>

                <td className="p-3">

                  {payment.distributor}

                </td>

                <td className="p-3 font-medium">

                  {payment.invoice}

                </td>

                <td className="p-3">

                  {payment.paymentDate}

                </td>

                <td className="p-3 font-semibold text-green-700">

                  <div className="flex items-center gap-1">

                    <IndianRupee size={15}/>

                    {payment.amount.replace("₹","")}

                  </div>

                </td>

                <td className="p-3">

                  {payment.chequeNumber}

                </td>

                <td className="p-3">

                  {payment.chequeDate}

                </td>

                <td className="p-3">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold

                    ${
                      payment.status === "Paid"
                        ? "bg-green-100 text-green-700"

                        : payment.status === "Pending"

                        ? "bg-yellow-100 text-yellow-700"

                        : "bg-red-100 text-red-700"
                    }`}
                  >

                    {payment.status}

                  </span>

                </td>

                <td
                  className="p-3"
                  onClick={(e) => e.stopPropagation()}
                >

                  <div className="flex items-center gap-2">

                    <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center">

                      <Eye size={16}/>

                    </button>

                    <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center">

                      <Pencil size={16}/>

                    </button>

                    <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center">

                      <Download size={16}/>

                    </button>

                    <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center">

                      <MoreHorizontal size={16}/>

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {filtered.length === 0 && (

          <div className="py-16 text-center">

            <CreditCard
              size={60}
              className="mx-auto text-slate-300 mb-4"
            />

            <h3 className="font-semibold text-slate-700">

              No Payments Found

            </h3>

            <p className="text-slate-500 mt-2">

              Try changing your search or filters.

            </p>

          </div>

        )}

      </div>

            {/* ================= OVERLAY ================= */}

      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}

      {/* ================= DETAILS DRAWER ================= */}

      <div
        className={`fixed top-0 right-0 h-full w-[340px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="border-b p-5">

          <h2 className="font-bold text-lg">

            {selected.length > 1
              ? "Bulk Payment Summary"
              : "Payment Details"}

          </h2>

        </div>

        <div className="p-5 space-y-5">

          {/* MULTIPLE PAYMENTS */}

          {selected.length > 1 && (
            <>
              <div className="space-y-3">

                {selectedPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="border rounded-lg p-3"
                  >
                    <div className="font-semibold">
                      {payment.paymentId}
                    </div>

                    <div className="text-sm text-slate-500 mt-1">
                      {payment.customer}
                    </div>

                    <div className="text-blue-600 mt-2">
                      {payment.amount}
                    </div>
                  </div>
                ))}

              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">

                Apply Bulk Update

              </button>
            </>
          )}

          {/* SINGLE PAYMENT */}

          {selected.length === 1 && (
            <>
              <div className="text-center">

                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto">

                  <CreditCard
                    size={36}
                    className="text-blue-700"
                  />

                </div>

                <h3 className="mt-4 text-lg font-bold">

                  {selectedPayments[0].paymentId}

                </h3>

                <p className="text-slate-500">

                  {selectedPayments[0].customer}

                </p>

              </div>

              <div className="space-y-4 text-sm">

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Account Manager
                  </span>

                  <span className="font-medium">
                    {selectedPayments[0].accountManager}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Distributor
                  </span>

                  <span className="font-medium">
                    {selectedPayments[0].distributor}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Invoice
                  </span>

                  <span className="font-medium">
                    {selectedPayments[0].invoice}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Payment
                  </span>

                  <span className="font-semibold text-green-600">
                    {selectedPayments[0].amount}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Cheque Number
                  </span>

                  <span>
                    {selectedPayments[0].chequeNumber}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Cheque Date
                  </span>

                  <span>
                    {selectedPayments[0].chequeDate}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Status
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedPayments[0].status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : selectedPayments[0].status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {selectedPayments[0].status}
                  </span>
                </div>

              </div>

              <div className="grid grid-cols-2 gap-3 pt-4">

                <button className="border rounded-lg py-2 hover:bg-slate-50">

                  Edit

                </button>

                <button className="bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700">

                  View

                </button>

              </div>
            </>
          )}

          {/* EMPTY */}

          {selected.length === 0 && (

            <div className="h-full flex flex-col items-center justify-center text-center pt-20">

              <CreditCard
                size={60}
                className="text-slate-300 mb-5"
              />

              <h3 className="font-semibold text-slate-700">

                No Payment Selected

              </h3>

              <p className="text-slate-500 text-sm mt-2">

                Select a payment to view its details.

              </p>

            </div>

          )}

        </div>
      </div>

      {/* ================= DRAWER BUTTON ================= */}

      <div
        onClick={() => setDrawerOpen(!drawerOpen)}
        className="fixed right-0 top-1/2 h-[120px] w-[42px] bg-blue-600 text-white flex items-center justify-center rotate-180 cursor-pointer shadow-xl z-50"
        style={{ writingMode: "vertical-rl" }}
      >
        Details
      </div>

    </div>
  );
}