import { useState } from "react";
import {
  ShieldCheck,
  Search,
  Plus,
  Save,
  Lock,
  Database,
} from "lucide-react";

const roles = [
  "Admin",
  "Sales Manager",
  "Sales Executive",
  "Marketing",
  "Finance",
];

const modules = ["Leads", "Deals", "Contacts", "Products", "Tasks"];

const actions = ["View", "Create", "Edit", "Delete", "Export", "Import"];

/* MODULE FIELD DATA */
const moduleFields = {
  Leads: [
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Lead Source",
    "Status",
    "Assigned To",
    "Revenue",
    "Company",
  ],
  Deals: [
    "Deal Name",
    "Amount",
    "Stage",
    "Close Date",
    "Owner",
    "Contact",
  ],
  Contacts: [
    "Name",
    "Email",
    "Phone",
    "Designation",
    "Company",
  ],
  Products: [
    "Product Name",
    "SKU",
    "Price",
    "Stock",
    "Category",
  ],
  Tasks: [
    "Task Name",
    "Priority",
    "Due Date",
    "Assigned To",
    "Status",
  ],
};

function generateFieldPermissions(module) {
  return moduleFields[module].map((field) => ({
    field,
    visible: true,
    editable: true,
    required: false,
  }));
}

export default function PermissionManagement() {
  const [selectedRole, setSelectedRole] = useState("Admin");
  const [selectedModule, setSelectedModule] = useState("Leads");
  const [accessLevel, setAccessLevel] = useState("all");

  const [permissions, setPermissions] = useState(
    modules.reduce((acc, module) => {
      acc[module] = actions.reduce((obj, action) => {
        obj[action] = true;
        return obj;
      }, {});
      return acc;
    }, {})
  );

  const [fieldPermissions, setFieldPermissions] = useState(
    generateFieldPermissions("Leads")
  );

  /* CHANGE MODULE */
  const changeModule = (module) => {
    setSelectedModule(module);
    setFieldPermissions(generateFieldPermissions(module));
  };

  /* TOGGLE MODULE PERMISSIONS */
  const togglePermission = (module, action) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [action]: !prev[module][action],
      },
    }));
  };

  /* TOGGLE FIELD PERMISSIONS */
  const toggleFieldPermission = (index, key) => {
    const updated = [...fieldPermissions];
    updated[index][key] = !updated[index][key];
    setFieldPermissions(updated);
  };

  return (
    <div className="ml-[60px] min-h-screen bg-slate-50 p-6 pt-16">
      {/* HEADER */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-5">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-black text-slate-800">
                Access Control & Permissions
              </h1>
              <p className="text-sm text-slate-500">
                Manage module, field and role permissions
              </p>
            </div>
          </div>

          <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl flex items-center gap-2 hover:bg-blue-700">
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-[250px_1fr_380px] gap-5">
        {/* ROLE SIDEBAR */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-slate-800">Roles</h2>
            <button className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Plus size={16} />
            </button>
          </div>

          <div className="relative mb-4">
            <Search
              size={15}
              className="absolute left-3 top-3 text-slate-400"
            />
            <input
              placeholder="Search role..."
              className="w-full border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-2">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition ${
                  selectedRole === role
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-50 text-slate-700"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* CENTER */}
        <div className="space-y-5">
          {/* MODULE PERMISSIONS */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h2 className="font-semibold text-slate-800 mb-4">
              Module Permissions
            </h2>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3">Module</th>
                  {actions.map((action) => (
                    <th key={action} className="text-center">
                      {action}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {modules.map((module) => (
                  <tr
                    key={module}
                    className={`border-b border-slate-100 cursor-pointer ${
                      selectedModule === module ? "bg-blue-50" : ""
                    }`}
                    onClick={() => changeModule(module)}
                  >
                    <td className="py-4 font-medium">{module}</td>

                    {actions.map((action) => (
                      <td key={action} className="text-center">
                        <input
                          type="checkbox"
                          checked={permissions[module][action]}
                          onChange={(e) => {
                            e.stopPropagation();
                            togglePermission(module, action);
                          }}
                          className="accent-blue-600"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ACCESS RULES */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Lock size={16} className="text-blue-600" />
              <h2 className="font-semibold">Record Access</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {["own", "team", "department", "all"].map((level) => (
                <label
                  key={level}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="radio"
                    checked={accessLevel === level}
                    onChange={() => setAccessLevel(level)}
                    className="accent-blue-600"
                  />
                  {level.charAt(0).toUpperCase() + level.slice(1)} Records
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* FIELD PANEL */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Database size={16} className="text-blue-600" />
            <h2 className="font-semibold text-slate-800">
              {selectedModule} Fields
            </h2>
          </div>

          <div className="space-y-3 max-h-[650px] overflow-y-auto pr-2">
            {fieldPermissions.map((field, index) => (
              <div
                key={field.field}
                className="border border-slate-100 rounded-xl p-4"
              >
                <p className="font-medium text-sm text-slate-700 mb-3">
                  {field.field}
                </p>

                <div className="space-y-2 text-sm">
                  {["visible", "editable", "required"].map((key) => (
                    <label
                      key={key}
                      className="flex justify-between items-center"
                    >
                      <span className="capitalize text-slate-600">
                        {key}
                      </span>

                      <input
                        type="checkbox"
                        checked={field[key]}
                        onChange={() =>
                          toggleFieldPermission(index, key)
                        }
                        className="accent-blue-600"
                      />
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}