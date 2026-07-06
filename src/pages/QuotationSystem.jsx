import { useMemo, useState } from "react";
import {
  Download,
  Send,
  Save,
  FileCheck,
  Plus,
  Trash2,
  User,
  Package,
  CheckCircle2,
} from "lucide-react";

/* ---------------- DATA ---------------- */

const customers = [
  {
    id: 1,
    name: "ABC Enterprise Pvt Ltd",
    email: "finance@abc.com",
    address: "Noida, Uttar Pradesh",
    phone: "+91 9876543210",
  },
  {
    id: 2,
    name: "Bharat Vault",
    email: "accounts@bharatvault.com",
    address: "New Delhi, India",
    phone: "+91 9876501234",
  },
];

const products = [
  { id: 1, name: "CRM Subscription", price: 12000 },
  { id: 2, name: "Lead Automation Suite", price: 18000 },
  { id: 3, name: "Sales Dashboard License", price: 25000 },
  { id: 4, name: "Premium Support Plan", price: 15000 },
];

const templates = [
  {
    id: "corporate",
    name: "Standard Corporate",
    desc: "Professional blue enterprise layout",
    bg: "from-blue-50 to-slate-100",
  },
  {
    id: "modern",
    name: "Modern Minimal",
    desc: "Bold typography & whitespace",
    bg: "from-white to-slate-50",
  },
  {
    id: "executive",
    name: "Executive Gold",
    desc: "Luxury premium quotation theme",
    bg: "from-yellow-50 to-amber-100",
  },
];

/* ---------------- MAIN ---------------- */

export default function QuotationSystem() {
  const [template, setTemplate] = useState("corporate");
  const [customerId, setCustomerId] = useState(1);
  const [signature, setSignature] = useState("Rinku Singh");
  const [taxMode, setTaxMode] = useState("cgst");
  const [terms, setTerms] = useState(
    "1. Quote valid for 15 days.\n2. 50% advance payment required."
  );

  const [items, setItems] = useState([
    {
      productId: 1,
      qty: 1,
      rate: 12000,
    },
  ]);

  const selectedCustomer = customers.find(
    (c) => c.id === Number(customerId)
  );

  const formatINR = (value) =>
    `₹${value.toLocaleString("en-IN")}`;

  const calculations = useMemo(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.qty * item.rate,
      0
    );

    const gst = subtotal * 0.18;

    return {
      subtotal,
      gst,
      total: subtotal + gst,
      cgst: gst / 2,
      sgst: gst / 2,
      igst: gst,
    };
  }, [items]);

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;

    if (field === "productId") {
      const selected = products.find(
        (p) => p.id === Number(value)
      );
      updated[index].rate = selected.price;
    }

    setItems(updated);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        productId: 1,
        qty: 1,
        rate: 12000,
      },
    ]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const renderTemplate = () => {
    const props = {
      customer: selectedCustomer,
      items,
      calculations,
      signature,
      terms,
      taxMode,
      formatINR,
    };

    switch (template) {
      case "modern":
        return <ModernTemplate {...props} />;
      case "executive":
        return <ExecutiveTemplate {...props} />;
      default:
        return <CorporateTemplate {...props} />;
    }
  };

  return (
    <div className="ml-[60px] min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50">
      {/* TOP BAR */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-black text-slate-900">
          Quotation Engine
        </h1>

        <div className="flex gap-3">
          <ActionButton
            icon={<FileCheck size={16} />}
            text="Convert Invoice"
          />
          <ActionButton
            primary
            icon={<Download size={16} />}
            text="Download PDF"
          />
          <ActionButton
            icon={<Send size={16} />}
            text="Send Email"
          />
          <ActionButton
            icon={<Save size={16} />}
            text="Save Draft"
          />
        </div>
      </div>

      <div className="grid grid-cols-[430px_1fr]">
        {/* LEFT PANEL */}
        <div className="bg-white/80 backdrop-blur-xl border-r border-slate-200 p-6 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <MiniStat title="Items" value={items.length} />
            <MiniStat
              title="Grand Total"
              value={formatINR(calculations.total)}
            />
          </div>

          {/* Template gallery */}
          <SectionTitle title="Choose Template" />

          <div className="grid grid-cols-1 gap-3">
            {templates.map((temp) => (
              <button
                key={temp.id}
                onClick={() => setTemplate(temp.id)}
                className={`rounded-2xl border p-4 text-left transition ${
                  template === temp.id
                    ? "border-blue-600 ring-2 ring-blue-100 shadow-md"
                    : "border-slate-200 hover:shadow-sm"
                }`}
              >
                <div
                  className={`h-24 rounded-xl bg-gradient-to-br ${temp.bg}`}
                />

                <h3 className="font-semibold text-slate-800 mt-3">
                  {temp.name}
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  {temp.desc}
                </p>
              </button>
            ))}
          </div>

          {/* Customer */}
          <SectionTitle title="Customer" />

          <select
            value={customerId}
            onChange={(e) =>
              setCustomerId(e.target.value)
            }
            className="w-full border rounded-xl px-4 py-3"
          >
            {customers.map((customer) => (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.name}
              </option>
            ))}
          </select>

          {/* Items */}
          <SectionTitle title="Products" />

          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="border rounded-xl p-4"
              >
                <select
                  value={item.productId}
                  onChange={(e) =>
                    updateItem(
                      index,
                      "productId",
                      Number(e.target.value)
                    )
                  }
                  className="w-full border rounded-lg px-3 py-2"
                >
                  {products.map((product) => (
                    <option
                      key={product.id}
                      value={product.id}
                    >
                      {product.name}
                    </option>
                  ))}
                </select>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  <input
                    type="number"
                    value={item.qty}
                    min={1}
                    onChange={(e) =>
                      updateItem(
                        index,
                        "qty",
                        Number(e.target.value)
                      )
                    }
                    className="border rounded-lg px-3 py-2"
                  />

                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) =>
                      updateItem(
                        index,
                        "rate",
                        Number(e.target.value)
                      )
                    }
                    className="border rounded-lg px-3 py-2"
                  />
                </div>

                <button
                  onClick={() =>
                    removeItem(index)
                  }
                  className="mt-3 text-red-500 text-sm flex items-center gap-2"
                >
                  <Trash2 size={14} />
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={addItem}
            className="w-full mt-4 border border-dashed border-slate-300 rounded-xl py-3 flex items-center justify-center gap-2 text-blue-600"
          >
            <Plus size={16} />
            Add Product
          </button>

          {/* Tax */}
          <SectionTitle title="Tax Mode" />

          <select
            value={taxMode}
            onChange={(e) =>
              setTaxMode(e.target.value)
            }
            className="w-full border rounded-xl px-4 py-3"
          >
            <option value="cgst">
              CGST + SGST
            </option>
            <option value="igst">
              IGST
            </option>
          </select>

          {/* Signature */}
          <SectionTitle title="Digital Signature" />

          <input
            value={signature}
            onChange={(e) =>
              setSignature(e.target.value)
            }
            className="w-full border rounded-xl px-4 py-3"
          />

          {/* Terms */}
          <SectionTitle title="Terms & Conditions" />

          <textarea
            rows={4}
            value={terms}
            onChange={(e) =>
              setTerms(e.target.value)
            }
            className="w-full border rounded-xl p-3"
          />
        </div>

        {/* RIGHT PREVIEW */}
        <div className="p-8">
          <div className="flex gap-3 mb-6">
            {[
              "Draft",
              "Sent",
              "Viewed",
              "Accepted",
              "Paid",
            ].map((step, i) => (
              <span
                key={step}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  i === 0
                    ? "bg-blue-100 text-blue-700"
                    : "bg-white border border-slate-200 text-slate-500"
                }`}
              >
                {step}
              </span>
            ))}
          </div>

          <div className="bg-slate-300 rounded-3xl p-8 shadow-inner">
            <div className="max-w-[900px] mx-auto">
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function ActionButton({
  icon,
  text,
  primary,
}) {
  return (
    <button
      className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition ${
        primary
          ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
          : "bg-white border border-slate-200 hover:bg-slate-50"
      }`}
    >
      {icon}
      {text}
    </button>
  );
}

function SectionTitle({ title }) {
  return (
    <h2 className="text-sm font-semibold text-slate-700 mt-6 mb-3">
      {title}
    </h2>
  );
}

function MiniStat({ title, value }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
      <p className="text-xs text-slate-500">
        {title}
      </p>
      <p className="font-bold text-slate-800 mt-1">
        {value}
      </p>
    </div>
  );
}

/* ---------------- TEMPLATES ---------------- */

function BaseTemplate({
  customer,
  items,
  calculations,
  signature,
  terms,
  taxMode,
  formatINR,
  className = "",
}) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-xl p-10 min-h-[1100px] ${className}`}
    >
      <h1 className="text-4xl font-black mb-8">
        QUOTATION
      </h1>

      <div className="grid grid-cols-2 gap-8 mb-10">
        <div>
          <p className="font-semibold text-sm text-slate-500 mb-2">
            BILL TO
          </p>
          <p className="font-semibold">
            {customer.name}
          </p>
          <p>{customer.email}</p>
          <p>{customer.phone}</p>
          <p>{customer.address}</p>
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-500">
            Quote No
          </p>
          <p className="font-semibold">
            QT-2026-001
          </p>
        </div>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-3 text-left">
              Product
            </th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr
              key={index}
              className="border-t"
            >
              <td className="p-3">
                {
                  products.find(
                    (p) =>
                      p.id ===
                      Number(item.productId)
                  )?.name
                }
              </td>
              <td className="text-center">
                {item.qty}
              </td>
              <td className="text-center">
                {formatINR(item.rate)}
              </td>
              <td className="text-center font-medium">
                {formatINR(
                  item.qty * item.rate
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8 text-right space-y-2">
        <p>
          Subtotal:{" "}
          {formatINR(
            calculations.subtotal
          )}
        </p>

        {taxMode === "cgst" ? (
          <>
            <p>
              CGST:{" "}
              {formatINR(
                calculations.cgst
              )}
            </p>
            <p>
              SGST:{" "}
              {formatINR(
                calculations.sgst
              )}
            </p>
          </>
        ) : (
          <p>
            IGST:{" "}
            {formatINR(
              calculations.igst
            )}
          </p>
        )}

        <p className="text-xl font-bold">
          Grand Total:{" "}
          {formatINR(calculations.total)}
        </p>
      </div>

      <div className="mt-14">
        <p className="font-semibold text-sm mb-3">
          Terms & Conditions
        </p>
        <pre className="text-sm text-slate-600 whitespace-pre-wrap">
          {terms}
        </pre>
      </div>

      <div className="mt-14 border border-dashed border-slate-300 rounded-2xl p-6 bg-slate-50">
        <p className="text-xs text-slate-500 mb-3">
          Authorized Signature
        </p>
        <p className="text-3xl italic font-serif">
          {signature}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-12">
        <button className="bg-green-50 border border-green-300 rounded-xl py-3 text-green-700 font-medium flex items-center justify-center gap-2">
          <CheckCircle2 size={16} />
          Accept Quote
        </button>

        <button className="border border-slate-300 rounded-xl py-3 font-medium">
          Add Signature
        </button>
      </div>
    </div>
  );
}

function CorporateTemplate(props) {
  return <BaseTemplate {...props} />;
}

function ModernTemplate(props) {
  return (
    <BaseTemplate
      {...props}
      className="border-0 shadow-2xl"
    />
  );
}

function ExecutiveTemplate(props) {
  return (
    <BaseTemplate
      {...props}
      className="border-t-8 border-yellow-500"
    />
  );
}