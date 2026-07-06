import StandardTemplate from "./templates/StandardTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import LuxuryTemplate from "./templates/LuxuryTemplate";
import DarkTemplate from "./templates/DarkTemplate";

export default function PreviewPanel({
  template,
  items,
  customer,
}) {
  const templates = {
    standard: StandardTemplate,
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    luxury: LuxuryTemplate,
    dark: DarkTemplate,
  };

  const SelectedTemplate = templates[template];

  return (
    <div className="bg-slate-200 rounded-xl p-5">
      <SelectedTemplate
        items={items}
        customer={customer}
      />
    </div>
  );
}