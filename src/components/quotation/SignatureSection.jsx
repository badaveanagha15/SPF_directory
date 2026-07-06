import React, { useState } from "react";

export default function SignatureSection({ setStatus }) {
  const [signed, setSigned] = useState(false);

  return (
    <div className="mt-6 border-t pt-5">
      <h3 className="font-semibold mb-3">
        Customer Approval
      </h3>

      <div className="h-28 border rounded-xl flex items-center justify-center text-slate-400">
        {signed ? "Signed Successfully" : "Signature Area"}
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => {
            setSigned(true);
            setStatus(3);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Accept Quote
        </button>

        <button className="px-4 py-2 border rounded-lg">
          Add Signature
        </button>
      </div>
    </div>
  );
}