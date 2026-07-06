import { useState, useRef, useEffect } from "react";
import { X, Search } from "lucide-react";

/* ---------------- SECTIONS ---------------- */
const allSections = [
  "About",
  "Get in Touch",
  "Billing Address",
  "Shipping Address",
  "Other Information",
];

const requiredSections = ["About"];

export default function AddAccountModal({ onClose }) {
  const [showRequired, setShowRequired] = useState(false);
  const [activeSection, setActiveSection] = useState("About");

  const [form, setForm] = useState({
    accountName: "",
    website: "",
    type: "",
    parentAccount: "",
    owner: "",
    emails: [""],
    phones: [""],
    billingCity: "",
    billingState: "",
    billingCountry: "",
    shippingCity: "",
    shippingState: "",
    shippingCountry: "",
    description: "",
  });

  const sectionRefs = useRef({});

  const visibleSections = showRequired ? requiredSections : allSections;

  const isVisible = (section) =>
    !showRequired || requiredSections.includes(section);

  const scrollTo = (section) => {
    sectionRefs.current[section]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /* ---------------- SCROLL SPY ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      for (let sec of visibleSections) {
        const el = sectionRefs.current[sec];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleSections]);

  useEffect(() => {
    if (showRequired) scrollTo("About");
  }, [showRequired]);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addEmail = () => {
    setForm((prev) => ({ ...prev, emails: [...prev.emails, ""] }));
  };

  const addPhone = () => {
    setForm((prev) => ({ ...prev, phones: [...prev.phones, ""] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* DRAWER */}
      <div className="relative bg-white w-full max-w-6xl h-full flex ml-auto shadow-xl">

        {/* SIDEBAR */}
        <div className="w-[220px] border-r p-4 flex flex-col">
          <div className="space-y-3">
            {visibleSections.map((sec) => (
              <div
                key={sec}
                onClick={() => scrollTo(sec)}
                className={`cursor-pointer text-sm px-2 py-1 border-l-2 ${
                  activeSection === sec
                    ? "text-blue-600 border-blue-600 font-medium"
                    : "text-gray-500 border-transparent"
                }`}
              >
                {sec}
              </div>
            ))}
          </div>

          {/* SEARCH */}
          <div className="mt-auto">
            <div className="relative mt-4">
              <Search className="w-4 h-4 absolute left-2 top-2.5 text-gray-400" />
              <input
                placeholder="Search Fields"
                className="w-full pl-7 pr-2 py-2 border rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 flex flex-col">

          {/* HEADER */}
          <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white z-10">
            <h2 className="text-blue-600 font-semibold text-lg">
              Add Account
            </h2>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={showRequired}
                  onChange={() => setShowRequired(!showRequired)}
                />
                Show Required & Important Fields
              </label>

              <button onClick={onClose}>
                <X />
              </button>
            </div>
          </div>

          {/* FORM */}
          <div className="flex-1 overflow-auto px-6 py-4 space-y-10">

            {/* ABOUT */}
            {isVisible("About") && (
              <section ref={(el) => (sectionRefs.current["About"] = el)}>
                <h3 className="font-semibold mb-4">About</h3>

                <div className="grid grid-cols-2 gap-4">

                  <div className="col-span-2">
                    <label className="text-xs text-gray-500">
                      Account Name *
                    </label>
                    <input
                      className={`w-full border rounded px-3 py-2 ${
                        !form.accountName ? "border-red-500" : ""
                      }`}
                      value={form.accountName}
                      onChange={(e) =>
                        updateField("accountName", e.target.value)
                      }
                    />
                  </div>

                  <input
                    placeholder="Website"
                    className="border rounded px-3 py-2"
                    onChange={(e) =>
                      updateField("website", e.target.value)
                    }
                  />

                  <select
                    className="border rounded px-3 py-2"
                    onChange={(e) =>
                      updateField("type", e.target.value)
                    }
                  >
                    <option>Type</option>
                    <option>Customer</option>
                    <option>Partner</option>
                  </select>

                  <input
                    placeholder="Parent Account"
                    className="border rounded px-3 py-2"
                    onChange={(e) =>
                      updateField("parentAccount", e.target.value)
                    }
                  />

                  <input
                    placeholder="Owner"
                    className="border rounded px-3 py-2"
                    onChange={(e) =>
                      updateField("owner", e.target.value)
                    }
                  />

                  <textarea
                    placeholder="Description"
                    className="col-span-2 border rounded px-3 py-2"
                    onChange={(e) =>
                      updateField("description", e.target.value)
                    }
                  />
                </div>
              </section>
            )}

            {/* GET IN TOUCH */}
            {isVisible("Get in Touch") && (
              <section ref={(el) => (sectionRefs.current["Get in Touch"] = el)}>
                <h3 className="font-semibold mb-4">Get in Touch</h3>

                <div className="grid grid-cols-2 gap-6">

                  {/* EMAILS */}
                  <div>
                    <label className="text-xs text-gray-500">Emails</label>

                    {form.emails.map((email, i) => (
                      <div key={i} className="flex items-center gap-2 mt-2">

                        <input type="radio" name="primaryEmail" />

                        <select className="border rounded px-2 py-2 text-sm">
                          <option>Office</option>
                          <option>Personal</option>
                        </select>

                        <input
                          value={email}
                          onChange={(e) => {
                            const copy = [...form.emails];
                            copy[i] = e.target.value;
                            updateField("emails", copy);
                          }}
                          className="flex-1 border rounded px-3 py-2 text-sm"
                        />

                        {i > 0 && (
                          <button
                            onClick={() => {
                              const copy = form.emails.filter((_, idx) => idx !== i);
                              updateField("emails", copy);
                            }}
                          >
                            🗑
                          </button>
                        )}
                      </div>
                    ))}

                    <button onClick={addEmail} className="text-blue-600 text-sm mt-3">
                      + Add Email
                    </button>
                  </div>

                  {/* PHONES */}
                  <div>
                    <label className="text-xs text-gray-500">Phone Numbers</label>

                    {form.phones.map((phone, i) => (
                      <div key={i} className="flex items-center gap-2 mt-2">

                        <input type="radio" name="primaryPhone" />

                        <select className="border rounded px-2 py-2 text-sm">
                          <option>Mobile</option>
                          <option>Work</option>
                        </select>

                        <input
                          value={phone}
                          onChange={(e) => {
                            const copy = [...form.phones];
                            copy[i] = e.target.value;
                            updateField("phones", copy);
                          }}
                          className="border rounded px-3 py-2 text-sm"
                        />

                        {i > 0 && (
                          <button
                            onClick={() => {
                              const copy = form.phones.filter((_, idx) => idx !== i);
                              updateField("phones", copy);
                            }}
                          >
                            🗑
                          </button>
                        )}
                      </div>
                    ))}

                    <button onClick={addPhone} className="text-blue-600 text-sm mt-3">
                      + Add Phone
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* BILLING */}
            {isVisible("Billing Address") && (
              <section ref={(el) => (sectionRefs.current["Billing Address"] = el)}>
                <h3 className="font-semibold mb-4">Billing Address</h3>

                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="City" className="border px-3 py-2 rounded" />
                  <input placeholder="State" className="border px-3 py-2 rounded" />
                  <input placeholder="Country" className="border px-3 py-2 rounded" />
                </div>
              </section>
            )}

            {/* SHIPPING */}
            {isVisible("Shipping Address") && (
              <section ref={(el) => (sectionRefs.current["Shipping Address"] = el)}>
                <h3 className="font-semibold mb-4">Shipping Address</h3>

                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="City" className="border px-3 py-2 rounded" />
                  <input placeholder="State" className="border px-3 py-2 rounded" />
                  <input placeholder="Country" className="border px-3 py-2 rounded" />
                </div>
              </section>
            )}

            {/* OTHER */}
            {isVisible("Other Information") && (
              <section ref={(el) => (sectionRefs.current["Other Information"] = el)}>
                <h3 className="font-semibold mb-4">Other Information</h3>

                <textarea className="w-full border rounded px-3 py-2 h-32" />
              </section>
            )}
          </div>

          {/* FOOTER */}
          <div className="border-t p-4 flex justify-end gap-3 sticky bottom-0 bg-white">
            <button onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>

            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => console.log(form)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}