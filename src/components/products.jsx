import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Pencil,
  MessageCircle,
  Download,
  Trash2,
  Loader2,
  Upload,
  RefreshCw,
  MoreHorizontal,
  Package,
  Boxes,
  Wrench,
  BadgeIndianRupee,
} from "lucide-react";

const productsData = [
  {
    name: "Solar Generator",
    sku: "SKU-001",
    type: "Hardware",
    category: "Energy",
    price: "₹45,000",
    status: "In Stock",
    created: "2026-04-15",
  },
  {
    name: "CRM Setup Service",
    sku: "SKU-002",
    type: "Service",
    category: "Consulting",
    price: "₹15,000",
    status: "Active",
    created: "2026-04-12",
  },
  {
    name: "Vault Pro Plan",
    sku: "SKU-003",
    type: "Subscription",
    category: "Software",
    price: "₹999/mo",
    status: "Low Stock",
    created: "2026-04-10",
  },
];

export default function Products() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [syncing, setSyncing] = useState(false);
  const [toast, setToast] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  /* FILTER */
  const filtered = productsData.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === "All"
        ? true
        : activeFilter === "Software"
        ? product.category === "Software"
        : product.type === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const selectedProducts = selected.map((i) => filtered[i]);

  /* SELECT */

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

  /* ACTIONS */

  const handleExport = () => {
    console.log("Export:", selectedProducts);
  };

  const handleImport = () => {
    setToast("Products imported successfully ✅");

    setTimeout(() => {
      setToast("");
    }, 2000);
  };

  const handleSync = () => {
    setSyncing(true);

    setTimeout(() => {
      setSyncing(false);

      setToast("Sync completed ✅");

      setTimeout(() => {
        setToast("");
      }, 2000);
    }, 2000);
  };

  const filters = ["All", "Hardware", "Software", "Service"];

  return (
    <div className="ml-[60px] pt-16 p-6 bg-[#F1F5F9] min-h-screen">
      {/* TOAST */}

      {toast && (
        <div className="fixed top-20 right-6 bg-black text-white px-4 py-2 rounded shadow z-50 text-sm">
          {toast}
        </div>
      )}

      {/* BULK ACTION BAR */}

      {selected.length > 0 && (
        <div className="sticky top-14 z-40 bg-white border border-slate-200 rounded-lg mb-4 px-4 py-2 flex items-center justify-between shadow-sm">
          {/* LEFT */}

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700">
              {selected.length} Products selected
            </span>

            <div className="h-5 w-px bg-slate-300"></div>
          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-slate-200 rounded hover:bg-slate-50">
              <Mail size={14} />
              Email
            </button>

            <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-slate-200 rounded hover:bg-slate-50">
              <Pencil size={14} />
              Update
            </button>

            <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-slate-200 rounded hover:bg-slate-50">
              <MessageCircle size={14} />
              Whatsapp
            </button>

            <button
              onClick={handleExport}
              className="flex items-center gap-1 px-3 py-1.5 text-sm border border-slate-200 rounded hover:bg-slate-50"
            >
              <Download size={14} />
              Export
            </button>

            <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-red-300 text-red-600 hover:bg-red-50 rounded">
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}

      <div className="flex justify-between items-center mb-4">
        {/* LEFT */}

        <div>
          <h1 className="text-2xl font-black text-slate-800">
            Products
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Products &gt; List | Total Products: {filtered.length}
          </p>
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-2">
          <button
            onClick={handleImport}
            className="px-3 py-2 border border-slate-200 rounded-lg flex items-center gap-2 bg-white hover:bg-slate-50 text-sm"
          >
            <Upload size={14} />
            Import
          </button>

          <button
            onClick={handleExport}
            className="px-3 py-2 border border-slate-200 rounded-lg flex items-center gap-2 bg-white hover:bg-slate-50 text-sm"
          >
            <Download size={14} />
            Export
          </button>

          <button
            onClick={handleSync}
            className="px-3 py-2 border border-slate-200 rounded-lg flex items-center gap-2 bg-white hover:bg-slate-50 text-sm"
          >
            {syncing ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <RefreshCw size={14} />
            )}

            Sync
          </button>

          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
            + Add Product
          </button>
        </div>
      </div>

      {/* FILTER + SEARCH */}

      <div className="bg-white border border-slate-200 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 min-w-[250px] px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* FILTERS */}

          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setActiveFilter(item)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                activeFilter === item
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="p-3 w-12 text-center">
                <input
                  type="checkbox"
                  onChange={toggleSelectAll}
                  className="cursor-pointer"
                />
              </th>

              <th className="p-3 text-left">Product Name</th>
              <th className="p-3 text-left">SKU</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Created</th>

              <th className="p-3 text-left">
                <MoreHorizontal size={14} />
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((product, index) => (
              <tr
                onClick={() => navigate(`/products/${product.id}`)}
                key={index}
                className="border-t border-slate-100 hover:bg-slate-50 transition cursor-pointer"
              >
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    checked={selected.includes(index)}
                    onChange={() => toggleRow(index)}
                    className="cursor-pointer"
                  />
                </td>

                {/* PRODUCT */}

                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center">
                      <Package size={18} />
                    </div>

                    <div>
                      <div className="font-semibold text-slate-800">
                        {product.name}
                      </div>

                      <div className="text-xs text-slate-500 mt-0.5">
                        Product Item
                      </div>
                    </div>
                  </div>
                </td>

                {/* SKU */}

                <td className="p-3 text-slate-700">
                  {product.sku}
                </td>

                {/* TYPE */}

                <td className="p-3">
                  <TypeBadge type={product.type} />
                </td>

                {/* CATEGORY */}

                <td className="p-3">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Boxes size={14} />
                    {product.category}
                  </div>
                </td>

                {/* PRICE */}

                <td className="p-3 font-medium text-slate-800">
                  <div className="flex items-center gap-1">
                    <BadgeIndianRupee size={14} />
                    {product.price}
                  </div>
                </td>

                {/* STATUS */}

                <td className="p-3">
                  <StatusBadge status={product.status} />
                </td>

                {/* CREATED */}

                <td className="p-3 text-slate-700">
                  {product.created}
                </td>

                {/* ACTION */}

                <td className="p-3 cursor-pointer text-slate-500 hover:text-slate-700">
                  <MoreHorizontal size={16} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* EMPTY */}

        {filtered.length === 0 && (
          <div className="py-10 text-center text-slate-500 text-sm">
            No Products Found
          </div>
        )}
      </div>

      {/* OVERLAY */}

      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}

      {/* DRAWER */}

      <div
        className={`fixed top-0 right-0 h-full w-[320px] bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          drawerOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b font-semibold text-slate-800">
          {selected.length > 1
            ? "Bulk Summary"
            : "Product Details"}
        </div>

        <div className="p-4 space-y-4">
          {/* MULTI */}

          {selected.length > 1 && (
            <>
              {selectedProducts.map((product, i) => (
                <div key={i}>• {product.name}</div>
              ))}

              <button className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4">
                Apply Bulk Update
              </button>
            </>
          )}

          {/* SINGLE */}

          {selected.length === 1 && (
            <>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center">
                  <Package size={20} />
                </div>

                <div>
                  <div className="font-semibold">
                    {selectedProducts[0]?.name}
                  </div>

                  <div className="text-sm text-slate-500">
                    {selectedProducts[0]?.category}
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>SKU</span>
                  <span className="font-medium">
                    {selectedProducts[0]?.sku}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Price</span>
                  <span className="font-medium">
                    {selectedProducts[0]?.price}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Status</span>

                  <StatusBadge
                    status={selectedProducts[0]?.status}
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-4 text-slate-600">
                <Wrench className="cursor-pointer" />
                <MessageCircle className="cursor-pointer" />
              </div>
            </>
          )}

          {/* EMPTY */}

          {selected.length === 0 && (
            <p className="text-slate-500 text-sm">
              No product selected
            </p>
          )}
        </div>
      </div>

      {/* DRAWER BUTTON */}

      <div
        onClick={() => setDrawerOpen(!drawerOpen)}
        className="fixed right-0 top-1/2 h-[120px] w-[40px] bg-blue-600 text-white flex items-center justify-center rotate-180 cursor-pointer z-50 shadow-lg"
        style={{ writingMode: "vertical-rl" }}
      >
        Details
      </div>
    </div>
  );
}

function TypeBadge({ type }) {
  const styles = {
    Hardware: "bg-blue-100 text-blue-700",
    Service: "bg-purple-100 text-purple-700",
    Subscription: "bg-teal-100 text-teal-700",
  };

  const icons = {
    Hardware: <Package size={12} />,
    Service: <Wrench size={12} />,
    Subscription: <Boxes size={12} />,
  };

  return (
    <span
      className={`flex items-center gap-1 w-fit px-2.5 py-1 text-xs rounded-full font-medium ${styles[type]}`}
    >
      {icons[type]}
      {type}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    "In Stock": "bg-green-100 text-green-700",
    "Low Stock": "bg-red-100 text-red-700",
    Active: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`px-2.5 py-1 text-xs rounded-full font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}