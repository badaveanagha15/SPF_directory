import { useState } from "react";
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
  UserCircle2,
  Users,
  Building2,
  CheckCircle2,
  Clock3,
  Eye,
  EyeOff,
} from "lucide-react";

export default function UserProfile() {
  const [twoFA, setTwoFA] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const user = {
    name: "Rinku Singh",
    role: "Senior Sales Executive",
    department: "Sales Department",
    status: "Active",
    employeeId: "EMP-2026-001",
    email: "rinku@email.com",
    phone: "+91 9650394795",
    joiningDate: "12 Jan 2024",
    dob: "08 Aug 1998",
    address: "B-45, Sector 62, Noida, Uttar Pradesh, India",
    officeLocation: "New Delhi Office",
    emergencyContact: "+91 9876543210",

    manager: {
      name: "Akshay Mehta",
      role: "Regional Sales Manager",
    },

    teamMembers: [
      "Priya Sharma",
      "Rahul Verma",
      "Ankit Jain",
      "Neha Kapoor",
    ],

    activities: [
      "Updated Lead Status - ABC Corp",
      "Closed Deal worth ₹2,50,000",
      "Created follow-up task for client",
      "Updated account notes",
    ],

    accessLevel: "Sales Executive",
  };

  return (
    <div className="ml-[60px] min-h-screen bg-slate-50 p-6 pt-16">
      {/* HEADER */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-5">
        <div className="flex justify-between items-start">
          <div className="flex gap-5 items-center">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="avatar"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
              />
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black text-slate-800">
                  {user.name}
                </h1>

                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                  {user.status}
                </span>
              </div>

              <p className="text-slate-500 mt-1 font-medium">
                {user.department} • {user.role}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium hover:bg-slate-50">
              Account Settings
            </button>

            <button className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-[30%_38%_30%] gap-5">
        {/* LEFT COLUMN */}
        <div className="space-y-5">
          <Card title="Personal Details">
            <InfoRow
              icon={<UserCircle2 size={15} />}
              label="Employee ID"
              value={user.employeeId}
            />

            <InfoRow
              icon={<Mail size={15} />}
              label="Primary Email"
              value={user.email}
            />

            <InfoRow
              icon={<Phone size={15} />}
              label="Work Phone"
              value={user.phone}
            />

            <InfoRow
              icon={<Calendar size={15} />}
              label="Date of Joining"
              value={user.joiningDate}
            />

            <InfoRow
              icon={<Calendar size={15} />}
              label="Date of Birth"
              value={user.dob}
            />

            <InfoRow
              icon={<MapPin size={15} />}
              label="Address"
              value={user.address}
            />
          </Card>

          <Card title="Contact Info">
            <InfoRow
              icon={<Phone size={15} />}
              label="Emergency Contact"
              value={user.emergencyContact}
            />

            <InfoRow
              icon={<MapPin size={15} />}
              label="Office Location"
              value={user.officeLocation}
            />
          </Card>
        </div>

        {/* CENTER COLUMN */}
        <div className="space-y-5">
          <Card title="Reporting Manager">
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/100?img=15"
                alt="manager"
                className="w-14 h-14 rounded-full"
              />

              <div>
                <h3 className="font-semibold text-slate-800">
                  {user.manager.name}
                </h3>
                <p className="text-sm text-slate-500">{user.manager.role}</p>
              </div>

              <button className="ml-auto px-3 py-2 rounded-lg bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100">
                Message
              </button>
            </div>
          </Card>

          <Card title="My Department">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Building2 size={15} />
                Revenue growth and customer expansion
              </div>

              <div className="space-y-2">
                {user.teamMembers.map((member) => (
                  <div
                    key={member}
                    className="flex items-center gap-2 text-sm text-slate-700"
                  >
                    <Users size={14} className="text-blue-600" />
                    {member}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card title="Recent Contributions">
            <div className="space-y-4">
              {user.activities.map((activity, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-1">
                    {i % 2 === 0 ? (
                      <CheckCircle2 size={15} className="text-green-600" />
                    ) : (
                      <Clock3 size={15} className="text-blue-600" />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      {activity}
                    </p>
                    <p className="text-xs text-slate-400">Today</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-5">
          <Card title="Security Hub">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-600 block mb-2">
                  Change Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                  />

                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-500"
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              <button className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
                Update Password
              </button>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Two-Factor Authentication
                  </p>
                  <p className="text-xs text-slate-500">
                    Additional account protection
                  </p>
                </div>

                <button
                  onClick={() => setTwoFA(!twoFA)}
                  className={`w-12 h-6 rounded-full transition ${
                    twoFA ? "bg-blue-600" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transition ${
                      twoFA ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </Card>

          <Card title="Access Level">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                <Shield size={18} />
              </div>

              <div>
                <p className="text-xs text-slate-500">Current Role</p>
                <p className="font-semibold text-slate-800">
                  {user.accessLevel}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* REUSABLE COMPONENTS */

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <h2 className="font-semibold text-slate-800 mb-4">{title}</h2>
      {children}
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex justify-between items-start border-b border-slate-100 py-3 last:border-none gap-4">
      <div className="flex items-center gap-2 text-sm text-slate-500 min-w-[140px]">
        {icon}
        {label}
      </div>

      <span className="text-sm font-medium text-slate-700 text-right">
        {value}
      </span>
    </div>
  );
}