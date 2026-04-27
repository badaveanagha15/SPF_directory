import { useState, useRef } from "react";
import { X } from "lucide-react";

export default function AddDealDrawer({ isOpen, onClose }) {
  const nameRef = useRef(null);

  /* ✅ NEW: section refs */
  const basicRef = useRef(null);
  const productRef = useRef(null);
  const campaignRef = useRef(null);

  /* ================= FORM ================= */
  const [form, setForm] = useState({
    name: "",
    owner: "Akshay",
    campaign: "",
  });

  const [errors, setErrors] = useState({});

  /* ================= PRODUCTS ================= */
  const [products, setProducts] = useState([
    {
      name: "",
      quantity: "",
      unit: "",
      price: "",
      discountType: "%",
      discount: "",
    },
  ]);

  /* ================= SCROLL FUNCTION ================= */
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    let newErrors = {};

    if (!form.name) newErrors.name = "This is a required field";
    if (!form.owner) newErrors.owner = "This is a required field";

    setErrors(newErrors);

    if (newErrors.name && nameRef.current) {
      nameRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    console.log("Form:", form);
    console.log("Products:", products);

    onClose();
  };

  /* ================= PRODUCT FUNCTIONS ================= */
  const addProduct = () => {
    setProducts((prev) => [
      ...prev,
      {
        name: "",
        quantity: "",
        unit: "",
        price: "",
        discountType: "%",
        discount: "",
      },
    ]);
  };

  const removeProduct = (index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const updateProduct = (index, key, value) => {
    const updated = [...products];
    updated[index][key] = value;
    setProducts(updated);
  };

  const calculateTotal = (p) => {
    const qty = Number(p.quantity || 0);
    const price = Number(p.price || 0);
    const discount = Number(p.discount || 0);

    let total = qty * price;

    if (p.discountType === "%") {
      total -= (total * discount) / 100;
    } else {
      total -= discount;
    }

    return total > 0 ? total.toFixed(0) : 0;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">

      {/* BACKDROP */}
      <div className="flex-1 bg-black/20" onClick={onClose}></div>

      {/* DRAWER */}
      <div className="w-[65%] bg-white h-full shadow-xl flex flex-col animate-in slide-in-from-right">

        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Add Deal</h2>

          <div className="flex items-center gap-4">
            
            <button onClick={onClose}>
              <X />
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="flex flex-1 overflow-hidden">

          {/* SIDEBAR */}
          <div className="w-50 border-r p-4 text-sm space-y-3">
            <div
              onClick={() => scrollToSection(basicRef)}
              className="text-gray-500 font-medium cursor-pointer"
            >
              Basic Information
            </div>

            <div
              onClick={() => scrollToSection(productRef)}
              className="text-gray-500 cursor-pointer"
            >
              Product or Services
            </div>

            <div
              onClick={() => scrollToSection(campaignRef)}
              className="text-gray-500 cursor-pointer"
            >
              Campaign Information
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">

            {/* BASIC INFO */}
            <section ref={basicRef}>
              <h3 className="font-semibold text-gray-800 mb-4">Basic Information</h3>

              <div className="grid grid-cols-2 gap-4">

                {/* NAME */}
                <div className="col-span-2">
                  <label className="text-xs text-gray-500">
                    Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    ref={nameRef}
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className={`w-full border px-3 py-2 rounded text-sm ${
                      errors.name && "border-red-500"
                    }`}
                    placeholder="Enter Value"
                  />

                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>


                {/* OWNER */}
                <div>
                  <label className="text-xs text-gray-500">
                    Owner <span className="text-red-500">*</span>
                  </label>

                  <input
                    value={form.owner}
                    onChange={(e) =>
                      setForm({ ...form, owner: e.target.value })
                    }
                    className={`w-full border px-3 py-2 rounded ${
                      errors.owner && "border-red-500"
                    }`}
                  />
                </div>

                {/* DATE */}
                <div>
                  <label className="text-xs text-gray-500">
                    Estimated Closure Date
                  </label>
                  <input
                    type="date"
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>

                {/* PIPELINE */}
                <div>
                  <label className="text-xs text-gray-500">Pipeline</label>
                  <select className="w-full border rounded px-3 py-2 text-sm">
                    <option>Search pipeline</option>
                  </select>
                </div>

                {/* STAGE */}
                <div>
                  <label className="text-xs text-gray-500">
                    Pipeline Stage
                  </label>
                  <select className="w-full border rounded px-3 py-2 text-sm">
                    <option>Select pipeline stage</option>
                  </select>
                </div>

                {/* CONTACT */}
                <div>
                  <label className="text-xs text-gray-500">Contacts</label>
                  <input
                    className="w-full border rounded px-3 py-2 text-sm"
                    placeholder="Search..."
                  />
                </div>

                {/* COMPANY */}
                <div>
                  <label className="text-xs text-gray-500">Company</label>
                  <input
                    className="w-full border rounded px-3 py-2 text-sm"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </section>

            {/* PRODUCT TABLE */}
            <section ref={productRef}>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Product or Services</h3>
                <button
                  onClick={addProduct}
                  className="text-blue-600 text-sm"
                >
                  + Add New
                </button>
              </div>

              <div className="border rounded-lg overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-xs text-gray-500">
                    <tr>
                      <th className="p-3 text-left">Product or Service</th>
                      <th className="p-3 text-left">Quantity</th>
                      <th className="p-3 text-left">Unit</th>
                      <th className="p-3 text-left">Price</th>
                      <th className="p-3 text-left">Discount</th>
                      <th className="p-3 text-left">Total Amount</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((p, index) => (
                      <tr key={index} className="border-t">

                        <td className="p-2">
                          <input
                            placeholder="Search..."
                            value={p.name}
                            onChange={(e) =>
                              updateProduct(index, "name", e.target.value)
                            }
                            className="w-full border rounded px-3 py-2 text-sm"
                          />
                        </td>

                        <td className="p-2">
                          <input
                            type="number"
                            value={p.quantity}
                            onChange={(e) =>
                              updateProduct(index, "quantity", e.target.value)
                            }
                            className="w-full border rounded px-3 py-2 text-sm"
                          />
                        </td>

                        <td className="p-2">
                          <select
                            value={p.unit}
                            onChange={(e) =>
                              updateProduct(index, "unit", e.target.value)
                            }
                            className="w-full border rounded px-3 py-2 text-sm"
                          >
                            <option>Choose</option>
                            <option>Nos</option>
                            <option>Kg</option>
                          </select>
                        </td>

                        <td className="p-2">
                          <div className="flex border rounded overflow-hidden">
                            <span className="px-2 bg-gray-100 flex items-center text-xs">
                              ₹
                            </span>
                            <input
                              type="number"
                              value={p.price}
                              onChange={(e) =>
                                updateProduct(index, "price", e.target.value)
                              }
                              className="w-full px-2 py-2 outline-none"
                            />
                          </div>
                        </td>

                        <td className="p-2">
                          <div className="flex border rounded overflow-hidden">
                            <input
                              type="number"
                              value={p.discount}
                              onChange={(e) =>
                                updateProduct(index, "discount", e.target.value)
                              }
                              className="w-full px-2 py-2 outline-none"
                            />
                            <select
                              value={p.discountType}
                              onChange={(e) =>
                                updateProduct(
                                  index,
                                  "discountType",
                                  e.target.value
                                )
                              }
                              className="px-2 bg-gray-100 text-sm"
                            >
                              <option value="%">%</option>
                              <option value="flat">₹</option>
                            </select>
                          </div>
                        </td>

                        <td className="p-2">
                          <input
                            readOnly
                            value={calculateTotal(p)}
                            className="w-full border px-2 py-2 rounded bg-gray-50"
                          />
                        </td>

                        <td className="p-2 text-center">
                          {products.length > 1 && (
                            <button
                              onClick={() => removeProduct(index)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              ✕
                            </button>
                          )}
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* CAMPAIGN */}
            <section ref={campaignRef}>
              <h3 className="font-semibold text-gray-800 mb-4">Campaign Information</h3>

              <div className="grid grid-cols-2 gap-4">
                <select className="border px-3 py-2 rounded">
                  <option>Choose Campaign</option>
                </select>

                <select className="border px-3 py-2 rounded">
                  <option>Choose Source</option>
                </select>
              </div>
            </section>

          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t px-6 py-3 flex justify-end gap-3 bg-white">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}