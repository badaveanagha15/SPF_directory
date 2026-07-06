import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

const allSections = [
  "General Information",
  "Communication",
  "Location",
  "Professional",
  ];


export default function AddLeadModal({ onClose }) {
  const [activeSection, setActiveSection] = useState("General Information");

  const [form, setForm] = useState({
    firstName: "",
    source: "",
    lastName: "",
    emails: [""],
    phones: [""],
    city: "",
    state: "",
    company: "",
  });

  const sectionRefs = useRef({});

  const visibleSections = allSections;

  const isVisible = () => true;

  // Scroll to section
  const scrollTo = (section) => {
    sectionRefs.current[section]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Scroll spy
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
      ></div>

      {/* MODAL */}
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
        </div>

        {/* CONTENT */}
        <div className="flex-1 flex flex-col">

          {/* HEADER */}
          <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white z-10">
            <h2 className="text-blue-600 font-semibold text-lg">
              Add Lead
            </h2>

            <div className="flex items-center gap-4">
              

              <button onClick={onClose}>
                <X />
              </button>
            </div>
          </div>

          {/* FORM */}
          <div className="flex-1 overflow-auto px-6 py-4 space-y-10">

            {/* GENERAL */}
            {isVisible("General Information") && (
              <section
                ref={(el) =>
                  (sectionRefs.current["General Information"] = el)
                }
              >
                <h3 className="font-semibold mb-4">
                  General Information
                </h3>

                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <label className="text-xs text-gray-500">
                      First Name
                    </label>
                    <input
                      className="w-full border rounded px-3 py-2"
                      value={form.firstName}
                      onChange={(e) =>
                        updateField("firstName", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">
                      Last Name 
                    </label>
                    <input
                     className="w-full border rounded px-3 py-2"
                      value={form.lastName}
                      onChange={(e) =>
                        updateField("lastName", e.target.value)
                      }
                    />

                  </div>
                </div>
                  <div>
                    <label className="text-xs text-gray-500">
                      Source
                    </label>
                    <input
                      className="w-full border rounded px-3 py-2"
                      value={form.source}
                      onChange={(e)=>updateField("source", e.target.value)}
                    />
                  </div>

              </section>
            )}

           {/* COMMUNICATION */}
            {isVisible("Communication") && (
            <section
                ref={(el) => (sectionRefs.current["Communication"] = el)}
            >
                <h3 className="font-semibold mb-4">Communication</h3>

                <div className="grid grid-cols-2 gap-6">

                {/* EMAILS */}
                <div>
                    <label className="text-xs text-gray-500">Emails</label>

                    {form.emails.map((email, i) => (
                    <div key={i} className="flex items-center gap-2 mt-2">

                        {/* Radio */}
                        <input
                        type="radio"
                        name="primaryEmail"
                        className="mt-1"
                        />

                        {/* Type */}
                        <select className="border rounded px-2 py-2 text-sm">
                        <option>Office</option>
                        <option>Personal</option>
                        </select>

                        {/* Input */}
                        <input
                        value={email}
                        onChange={(e) => {
                            const copy = [...form.emails];
                            copy[i] = e.target.value;
                            updateField("emails", copy);
                        }}
                        placeholder={`Email #${i + 1}`}
                        className="flex-1 border rounded px-3 py-2 text-sm"
                        />

                        {/* Delete */}
                        {i > 0 && (
                        <button
                            onClick={() => {
                            const copy = form.emails.filter(
                                (_, index) => index !== i
                            );
                            updateField("emails", copy);
                            }}
                            className="text-gray-400 hover:text-red-500"
                        >
                            🗑
                        </button>
                        )}
                    </div>
                    ))}

                    <button
                    onClick={addEmail}
                    className="text-blue-600 text-sm mt-3"
                    >
                    + Add Email
                    </button>
                </div>

                {/* PHONES */}
                <div>
                    <label className="text-xs text-gray-500">
                    Contact Number
                    </label>

                    {form.phones.map((phone, i) => (
                    <div key={i} className="flex items-center gap-2 mt-2">

                        {/* Radio */}
                        <input
                        type="radio"
                        name="primaryPhone"
                        className="mt-1"
                        />

                        {/* Type */}
                        <select className="border rounded px-2 py-2 text-sm">
                        <option>Mobile</option>
                        <option>Work</option>
                        </select>

                        {/* Country + Input */}
                        <div className="flex border rounded overflow-hidden">
                        <div className="px-2 bg-gray-100 flex items-center text-sm">
                            🇮🇳 +91
                        </div>

                        <input
                            value={phone}
                            onChange={(e) => {
                            const copy = [...form.phones];
                            copy[i] = e.target.value;
                            updateField("phones", copy);
                            }}
                            placeholder="9999999999"
                            className="px-3 py-2 outline-none text-sm w-[140px]"
                        />
                        </div>

                        {/* Delete */}
                        {i > 0 && (
                        <button
                            onClick={() => {
                            const copy = form.phones.filter(
                                (_, index) => index !== i
                            );
                            updateField("phones", copy);
                            }}
                            className="text-gray-400 hover:text-red-500"
                        >
                            🗑
                        </button>
                        )}
                    </div>
                    ))}

                    <button
                    onClick={addPhone}
                    className="text-blue-600 text-sm mt-3"
                    >
                    + Add Phone
                    </button>
                </div>
                </div>

        
          
            </section>
            )}
            
            {/* LOCATION */}
            {isVisible("Location") && (
              <section
                ref={(el) =>
                  (sectionRefs.current["Location"] = el)
                }
              >
                <h3 className="font-semibold mb-4">Location</h3>

                <div className="grid grid-cols-2 gap-4">
<input placeholder="Address" className="border rounded px-3 py-2" />
<input placeholder="Pincode" className="border rounded px-3 py-2" />
<input placeholder="City" className="border rounded px-3 py-2" />
<input placeholder="State" className="border rounded px-3 py-2" />
</div>
              </section>
            )}

            {/* PROFESSIONAL */}
            <section
              ref={(el)=>(sectionRefs.current["Professional"]=el)}
            >
              <h3 className="font-semibold mb-4">Professional</h3>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Company Name" className="border rounded px-3 py-2"/>
                <select className="border rounded px-3 py-2">
                  <option>Select Status</option>
                  <option>New</option><option>Contacted</option><option>Qualified</option><option>Won</option><option>Lost</option>
                </select>
                <select className="border rounded px-3 py-2">
                  <option>Select Priority</option>
                  <option>Low</option><option>Medium</option><option>High</option>
                </select>
                <input type="date" className="border rounded px-3 py-2"/>
              </div>
            </section>

            
{/* Additional */}
<section ref={(el)=>(sectionRefs.current["Requirement"]=el)}>
<h3 className="font-semibold mb-4">Requirement</h3>
<textarea className="w-full border rounded px-3 py-2 h-32" placeholder="Notes"></textarea>
</section>

          </div>

          {/* FOOTER */}
          <div className="border-t p-4 flex justify-end gap-3 sticky bottom-0 bg-white">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
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