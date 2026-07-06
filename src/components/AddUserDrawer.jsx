import { useState, useRef } from "react";
import { X } from "lucide-react";

export default function AddUserDrawer({ isOpen, onClose }) {
  const registrationRef = useRef(null);

  const [form, setForm] = useState({
    department: "",
    userId: "",
    email: "",
    contact: "",
    password: "",
    username: "",
  });

  const [errors, setErrors] = useState({});

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!form.department)
      newErrors.department = "This is a required field";

    if (!form.userId)
      newErrors.userId = "This is a required field";

    if (!form.email)
      newErrors.email = "This is a required field";

    if (!form.contact)
      newErrors.contact = "This is a required field";

    if (!form.password)
      newErrors.password = "This is a required field";

    if (!form.username)
      newErrors.username = "This is a required field";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    console.log(form);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}

      <div
        className="flex-1 bg-black/20"
        onClick={onClose}
      ></div>

      {/* Drawer */}

      <div className="w-[65%] bg-white h-full shadow-xl flex flex-col animate-in slide-in-from-right">

        {/* Header */}

        <div className="flex justify-between items-center px-6 py-3 border-b">

          <h2 className="text-lg font-semibold text-gray-800">
            Add User
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        {/* Body */}

        <div className="flex flex-1 overflow-hidden">

          {/* Left Menu */}

          <div className="w-56 border-r p-5">

            <div
              onClick={() => scrollToSection(registrationRef)}
              className="cursor-pointer text-gray-600 hover:text-blue-600 font-medium"
            >
              Registration Information
            </div>

          </div>

          {/* Form */}

          <div className="flex-1 overflow-y-auto p-6">

            <section ref={registrationRef}>

              <h3 className="font-semibold text-gray-800 mb-6">
                User Registration
              </h3>

              <div className="grid grid-cols-2 gap-5">

                {/* Department */}

                <div>
                  <label className="text-xs text-gray-500">
                    Department
                    <span className="text-red-500">*</span>
                  </label>

                  <select
                    value={form.department}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        department: e.target.value,
                      })
                    }
                    className={`w-full mt-1 border rounded px-3 py-2 text-sm ${
                      errors.department
                        ? "border-red-500"
                        : ""
                    }`}
                  >
                    <option value="">
                      Select Department
                    </option>

                    <option>Sales</option>

                    <option>Marketing</option>

                    <option>Finance</option>

                    <option>HR</option>

                    <option>IT</option>

                  </select>

                  {errors.department && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.department}
                    </p>
                  )}
                </div>

                {/* User ID */}

                <div>
                  <label className="text-xs text-gray-500">
                    User ID
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    value={form.userId}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        userId: e.target.value,
                      })
                    }
                    className={`w-full mt-1 border rounded px-3 py-2 text-sm ${
                      errors.userId
                        ? "border-red-500"
                        : ""
                    }`}
                  />

                  {errors.userId && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.userId}
                    </p>
                  )}
                </div>

                {/* Email */}

                <div>
                  <label className="text-xs text-gray-500">
                    Email
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    className={`w-full mt-1 border rounded px-3 py-2 text-sm ${
                      errors.email
                        ? "border-red-500"
                        : ""
                    }`}
                  />

                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Contact */}

                <div>
                  <label className="text-xs text-gray-500">
                    Contact Number
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    value={form.contact}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        contact: e.target.value,
                      })
                    }
                    className={`w-full mt-1 border rounded px-3 py-2 text-sm ${
                      errors.contact
                        ? "border-red-500"
                        : ""
                    }`}
                  />

                  {errors.contact && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.contact}
                    </p>
                  )}
                </div>

                {/* Password */}

                <div>
                  <label className="text-xs text-gray-500">
                    Password
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        password: e.target.value,
                      })
                    }
                    className={`w-full mt-1 border rounded px-3 py-2 text-sm ${
                      errors.password
                        ? "border-red-500"
                        : ""
                    }`}
                  />

                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Username */}

                <div>
                  <label className="text-xs text-gray-500">
                    Username
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    value={form.username}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        username: e.target.value,
                      })
                    }
                    className={`w-full mt-1 border rounded px-3 py-2 text-sm ${
                      errors.username
                        ? "border-red-500"
                        : ""
                    }`}
                  />

                  {errors.username && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.username}
                    </p>
                  )}
                </div>

              </div>

            </section>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t px-6 py-4 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 text-white rounded"
          >
            Register / Save
          </button>

        </div>

      </div>

    </div>
  );
}