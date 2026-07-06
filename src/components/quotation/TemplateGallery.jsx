const templates = [
  "standard",
  "modern",
  "minimal",
  "luxury",
  "dark",
];

export default function TemplateGallery({
  selectedTemplate,
  setSelectedTemplate,
}) {
  return (
    <div className="grid grid-cols-5 gap-4">
      {templates.map((template) => (
        <div
          key={template}
          onClick={() => setSelectedTemplate(template)}
          className={`cursor-pointer rounded-xl border p-4 capitalize ${
            selectedTemplate === template
              ? "border-blue-600 shadow-md"
              : "border-slate-200"
          }`}
        >
          <div className="h-28 bg-slate-100 rounded-lg mb-3" />
          <p className="font-semibold">{template}</p>
        </div>
      ))}
    </div>
  );
}