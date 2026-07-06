export default function StandardTemplate({
  items = [],
  customer = {},
}) {
  const getTotal = (item) => {
    const subtotal = item.quantity * item.rate;
    const discount =
      subtotal * (item.discount / 100);
    const taxable = subtotal - discount;
    const tax = taxable * (item.tax / 100);

    return taxable + tax;
  };

  const grandTotal = items.reduce(
    (sum, item) => sum + getTotal(item),
    0
  );

  return (
    <div className="bg-white p-10 rounded-xl shadow-lg min-h-[900px]">
      <h1 className="text-3xl font-black mb-6">
        QUOTATION
      </h1>

      {customer?.name && (
        <div className="mb-6">
          <p className="font-semibold">
            {customer.name}
          </p>
          <p>{customer.email}</p>
        </div>
      )}

      <table className="w-full border text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-left">Product</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Tax</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="p-3">{item.name}</td>
              <td className="text-center">
                {item.quantity}
              </td>
              <td className="text-center">
                ₹{item.rate}
              </td>
              <td className="text-center">
                {item.tax}%
              </td>
              <td className="text-center font-semibold">
                ₹
                {getTotal(item).toLocaleString(
                  "en-IN"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 text-right">
        <h2 className="text-xl font-bold">
          Grand Total: ₹
          {grandTotal.toLocaleString("en-IN")}
        </h2>
      </div>
    </div>
  );
}