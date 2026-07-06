const products = [
  { id: 1, name: "CRM License", price: 25000, tax: 18 },
  { id: 2, name: "Support Package", price: 12000, tax: 18 },
  { id: 3, name: "Subscription", price: 35000, tax: 18 },
];

export default function BuilderPanel({
  items,
  setItems,
  selectedCustomer,
  setSelectedCustomer,
}) {
  const customers = [
    {
      id: 1,
      name: "ABC Enterprise",
      email: "abc@gmail.com",
    },
    {
      id: 2,
      name: "Bharat Vault",
      email: "vault@gmail.com",
    },
  ];

  const addRow = () => {
    setItems([
      ...items,
      {
        productId: "",
        name: "",
        quantity: 1,
        rate: 0,
        discount: 0,
        tax: 18,
      },
    ]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];

    if (field === "productId") {
      const product = products.find(
        (p) => p.id === Number(value)
      );

      updated[index] = {
        ...updated[index],
        productId: product.id,
        name: product.name,
        rate: product.price,
        tax: product.tax,
      };
    } else {
      updated[index][field] = Number(value);
    }

    setItems(updated);
  };

  return (
    <div className="bg-white p-5 rounded-xl border">
      <h2 className="font-bold text-lg mb-4">
        Builder
      </h2>

      <select
        className="w-full border rounded-lg p-2 mb-4"
        onChange={(e) =>
          setSelectedCustomer(
            customers.find(
              (c) => c.id === Number(e.target.value)
            )
          )
        }
      >
        <option>Select Customer</option>

        {customers.map((customer) => (
          <option
            key={customer.id}
            value={customer.id}
          >
            {customer.name}
          </option>
        ))}
      </select>

      {items.map((item, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 mb-4"
        >
          <select
            value={item.productId}
            onChange={(e) =>
              updateItem(
                index,
                "productId",
                e.target.value
              )
            }
            className="w-full border rounded-lg p-2 mb-3"
          >
            <option>Select Product</option>

            {products.map((product) => (
              <option
                key={product.id}
                value={product.id}
              >
                {product.name}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-4 gap-2">
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                updateItem(
                  index,
                  "quantity",
                  e.target.value
                )
              }
              className="border p-2 rounded"
              placeholder="Qty"
            />

            <input
              type="number"
              value={item.rate}
              onChange={(e) =>
                updateItem(index, "rate", e.target.value)
              }
              className="border p-2 rounded"
              placeholder="Rate"
            />

            <input
              type="number"
              value={item.discount}
              onChange={(e) =>
                updateItem(
                  index,
                  "discount",
                  e.target.value
                )
              }
              className="border p-2 rounded"
              placeholder="Disc%"
            />

            <input
              type="number"
              value={item.tax}
              onChange={(e) =>
                updateItem(index, "tax", e.target.value)
              }
              className="border p-2 rounded"
              placeholder="Tax%"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addRow}
        className="w-full bg-blue-600 text-white rounded-lg py-2"
      >
        Add Product
      </button>
    </div>
  );
}