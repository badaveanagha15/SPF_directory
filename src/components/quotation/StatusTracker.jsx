const stages = [
  "Draft",
  "Sent",
  "Viewed",
  "Accepted",
  "Invoice",
  "Paid",
];

export default function StatusTracker({ status }) {
  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {stages.map((stage, index) => (
        <span
          key={stage}
          className={`px-3 py-2 rounded-full text-xs ${
            index <= status
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {stage}
        </span>
      ))}
    </div>
  );
}