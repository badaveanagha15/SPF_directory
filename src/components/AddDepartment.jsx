import { useMemo, useState } from "react";
import {
  X,
  Building2,
  Users,
  Shield,
  Search,
  Check,
} from "lucide-react";

export default function AddDepartment({ open, onClose }) {
  const [activeSection, setActiveSection] = useState("basic");
  const [searchField, setSearchField] = useState("");

  const [form, setForm] = useState({
    departmentName: "",
    head: "",
    parent: "",
    description: "",
    access: "Inherited",
    status: true,
  });

  const [errors, setErrors] = useState({});

  const managers = [
    "Rinku Singh",
    "Akshay Mehta",
    "Aman Gupta",
    "Neha Sharma",
    "Pooja Sharma",
  ];

  const departments = [
    "Head Office",
    "Sales",
    "Marketing",
    "Finance",
    "Operations",
    "Human Resources",
  ];

  const sections = [
    {
      id: "basic",
      title: "Basic Information",
      icon: <Building2 size={17} />,
    },
    {
      id: "hierarchy",
      title: "Organizational Hierarchy",
      icon: <Users size={17} />,
    },
    {
      id: "access",
      title: "Access Control",
      icon: <Shield size={17} />,
    },
  ];

  const filteredSections = useMemo(() => {
    if (!searchField) return sections;

    return sections.filter((s) =>
      s.title.toLowerCase().includes(searchField.toLowerCase())
    );
  }, [searchField]);

  const updateField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    setErrors({
      ...errors,
      [field]: "",
    });
  };

  const saveDepartment = () => {
    let validation = {};

    if (!form.departmentName.trim()) {
      validation.departmentName = "This is a required field";
    }

    if (!form.head) {
      validation.head = "This is a required field";
    }

    setErrors(validation);

    if (Object.keys(validation).length) return;

    console.log(form);

    onClose();
  };

  return (
    <>
      {/* BACKDROP */}

      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* DRAWER */}

      <div
        className={`fixed top-0 right-0 h-screen w-full max-w-[900px] bg-white shadow-2xl z-50 transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}

        <div className="sticky top-0 bg-white border-b border-slate-200 z-30 px-8 py-5 flex justify-between items-center">

          <div>

            <h2 className="text-2xl font-black text-slate-900">
              Add Department
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Create a new department and configure hierarchy.
            </p>

          </div>

          <div className="flex items-center gap-4">

            <label className="flex items-center gap-2 text-sm text-slate-600">

              <input
                type="checkbox"
                checked
                readOnly
              />

              Show Required Fields

            </label>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center"
            >
              <X size={20} />
            </button>

          </div>

        </div>

        {/* BODY */}

        <div className="grid grid-cols-[230px_1fr] h-[calc(100vh-150px)]">

          {/* LEFT NAVIGATION */}

          <div className="border-r border-slate-200 bg-slate-50 flex flex-col">

            <div className="flex-1 overflow-y-auto p-5">

              {filteredSections.map((section) => (

                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left mb-2 transition ${
                    activeSection === section.id
                      ? "bg-blue-600 text-white shadow"
                      : "hover:bg-white"
                  }`}
                >
                  {section.icon}

                  {section.title}

                </button>

              ))}

            </div>

            <div className="p-4 border-t">

              <div className="relative">

                <Search
                  className="absolute left-3 top-3 text-slate-400"
                  size={17}
                />

                <input
                  value={searchField}
                  onChange={(e) =>
                    setSearchField(e.target.value)
                  }
                  placeholder="Search Fields"
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200"
                />

              </div>

            </div>

          </div>

          {/* FORM */}

          <div className="overflow-y-auto p-8 space-y-10">

            {activeSection === "basic" && (

              <>

                <h3 className="text-lg font-bold text-slate-800">
                  Basic Information
                </h3>

                {/* Department */}

                <div>

                  <label className="font-medium text-slate-700">

                    Department Name
                    <span className="text-red-500 ml-1">*</span>

                  </label>

                  <input
                    value={form.departmentName}
                    onChange={(e) =>
                      updateField(
                        "departmentName",
                        e.target.value
                      )
                    }
                    className="mt-2 w-full border rounded-xl px-4 py-3"
                  />

                  {errors.departmentName && (

                    <p className="text-red-500 text-xs mt-1">
                      {errors.departmentName}
                    </p>

                  )}

                </div>

                {/* Description */}

                <div>

                  <label className="font-medium text-slate-700">
                    Description
                  </label>

                  <textarea
                    rows={5}
                    value={form.description}
                    onChange={(e) =>
                      updateField(
                        "description",
                        e.target.value
                      )
                    }
                    className="mt-2 w-full border rounded-xl px-4 py-3"
                  />

                </div>

              </>

            )}

            {activeSection === "hierarchy" && (

              <>

                <h3 className="text-lg font-bold">
                  Organizational Hierarchy
                </h3>

                <div>

                  <label className="font-medium">

                    Head of Department
                    <span className="text-red-500 ml-1">*</span>

                  </label>

                  <select
                    value={form.head}
                    onChange={(e) =>
                      updateField("head", e.target.value)
                    }
                    className="mt-2 w-full border rounded-xl px-4 py-3"
                  >
                    <option value="">
                      Select Manager
                    </option>

                    {managers.map((m) => (

                      <option key={m}>{m}</option>

                    ))}

                  </select>

                  {errors.head && (

                    <p className="text-red-500 text-xs mt-1">
                      {errors.head}
                    </p>

                  )}

                </div>

                <div className="mt-6">

                  <label className="font-medium">
                    Parent Department
                  </label>

                  <select
                    value={form.parent}
                    onChange={(e) =>
                      updateField(
                        "parent",
                        e.target.value
                      )
                    }
                    className="mt-2 w-full border rounded-xl px-4 py-3"
                  >
                    <option value="">
                      None
                    </option>

                    {departments.map((d) => (

                      <option key={d}>{d}</option>

                    ))}

                  </select>

                </div>

              </>

            )}

            {activeSection === "access" && (

              <>

                <h3 className="text-lg font-bold">
                  Access Control
                </h3>

                <div className="space-y-5">

                  <div className="border rounded-xl p-5">

                    <div className="flex justify-between">

                      <div>

                        <h4 className="font-semibold">
                          Department Status
                        </h4>

                        <p className="text-sm text-slate-500">
                          Allow users to access this department.
                        </p>

                      </div>

                      <button
                        onClick={() =>
                          updateField(
                            "status",
                            !form.status
                          )
                        }
                        className={`w-14 h-8 rounded-full transition ${
                          form.status
                            ? "bg-blue-600"
                            : "bg-slate-300"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 bg-white rounded-full mt-1 transition ${
                            form.status
                              ? "ml-7"
                              : "ml-1"
                          }`}
                        />
                      </button>

                    </div>

                  </div>

                  <div>

                    <label className="font-medium">
                      Permission Model
                    </label>

                    <select
                      value={form.access}
                      onChange={(e) =>
                        updateField(
                          "access",
                          e.target.value
                        )
                      }
                      className="mt-2 w-full border rounded-xl px-4 py-3"
                    >
                      <option>Inherited</option>
                      <option>Custom</option>
                      <option>Restricted</option>
                    </select>

                  </div>

                </div>

              </>

            )}

          </div>

        </div>

        {/* FOOTER */}

        <div className="sticky bottom-0 bg-white border-t border-slate-200 px-8 py-5 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl border border-slate-300 font-medium"
          >
            Cancel
          </button>

          <button
            onClick={saveDepartment}
            className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2"
          >
            <Check size={18} />

            Save Department

          </button>

        </div>

      </div>
    </>
  );
}