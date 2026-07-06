import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Building2,
  Sparkles,
  Shield,
  Users,
  BarChart3,
} from "lucide-react";

import { loginUser } from "../api/auth";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const stats = [
    {
      title: "Organizations",
      value: "2,500+",
      icon: <Building2 size={20} />,
    },
    {
      title: "Employees",
      value: "1.2 Lakh",
      icon: <Users size={20} />,
    },
    {
      title: "Revenue Managed",
      value: "₹850 Cr+",
      icon: <BarChart3 size={20} />,
    },
  ];

  const validate = () => {
    let temp = {};

    if (!form.email.trim()) {
      temp.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      temp.email = "Invalid email address";
    }

    if (!form.password.trim()) {
      temp.password = "Password is required";
    }

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

    const handleLogin = async () => {
        if (!validate()) return;

        try {
            setLoading(true);

            const { data } = await loginUser({
            login: form.email,
            password: form.password,
            });

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert(data.message);

            window.location.href = "/sales/dashboard";

        } catch (error) {
            if (error.response) {
            alert(error.response.data.message);
            } else {
            alert("Unable to connect to server.");
            }
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* ================= LEFT BRANDING ================= */}

      <div className="hidden lg:flex relative w-[48%] overflow-hidden bg-slate-900">

        {/* Animated Background */}

        <div className="absolute inset-0">

          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-700 blur-[130px] opacity-40"></div>

          <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-cyan-500 blur-[150px] opacity-30"></div>

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:35px_35px]"></div>

        </div>

        {/* Branding */}

        <div className="relative z-20 flex flex-col justify-between h-full p-14 text-white">

          <div>

            <div className="flex items-center gap-3">

              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl">

                <Sparkles size={28} />

              </div>

              <div>

                <h1 className="text-3xl font-black tracking-wide">
                  Enterprise CRM
                </h1>

                <p className="text-blue-200 text-sm mt-1">
                  Business Management Platform
                </p>

              </div>

            </div>

            <div className="mt-20 max-w-xl">

              <span className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/40 px-4 py-2 rounded-full text-sm">

                <ShieldCheck size={18} />

                Secure Enterprise Workspace

              </span>

              <h2 className="mt-8 text-6xl leading-tight font-black">

                Manage Your Entire Business

                <span className="block text-blue-400">
                  From One Platform.
                </span>

              </h2>

              <p className="mt-8 text-lg text-slate-300 leading-8">

                Streamline Sales, CRM, HRMS, Inventory,
                Finance, Quotations, Projects, Analytics,
                Employee Management and Customer Success
                using one unified enterprise platform.

              </p>

            </div>

          </div>

          {/* Statistics */}

          <div className="grid grid-cols-3 gap-5">

            {stats.map((item, index) => (

              <div
                key={index}
                className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-5"
              >

                <div className="text-blue-300 mb-4">

                  {item.icon}

                </div>

                <h3 className="text-3xl font-black tabular-nums">

                  {item.value}

                </h3>

                <p className="text-slate-300 text-sm mt-2">

                  {item.title}

                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* ================= RIGHT LOGIN ================= */}

      <div className="flex-1 flex items-center justify-center p-10 bg-slate-100">

        <div className="w-full max-w-md">

          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-10">

            <div className="flex justify-center">

              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">

                <Shield size={30} className="text-white" />

              </div>

            </div>

            <h2 className="mt-6 text-center text-4xl font-black text-slate-900">

              Welcome Back

            </h2>

            <p className="text-center text-slate-500 mt-3">

              Sign in to continue to your workspace

            </p>

            {/* Email */}

                        <div className="mt-10 space-y-6">

              {/* ================= EMAIL ================= */}

              <div>

                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Email Address
                </label>

                <div
                  className={`relative rounded-xl border transition-all ${
                    errors.email
                      ? "border-red-400 ring-2 ring-red-100"
                      : "border-slate-300 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100"
                  }`}
                >
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl outline-none bg-transparent text-slate-800 placeholder:text-slate-400"
                  />
                </div>

                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.email}
                  </p>
                )}

              </div>

              {/* ================= PASSWORD ================= */}

              <div>

                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Password
                </label>

                <div
                  className={`relative rounded-xl border transition-all ${
                    errors.password
                      ? "border-red-400 ring-2 ring-red-100"
                      : "border-slate-300 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100"
                  }`}
                >
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        password: e.target.value,
                      })
                    }
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl outline-none bg-transparent text-slate-800 placeholder:text-slate-400"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.password}
                  </p>
                )}

              </div>

              {/* ================= OPTIONS ================= */}

              <div className="flex items-center justify-between">

                <label className="flex items-center gap-3 cursor-pointer">

                  <input
                    type="checkbox"
                    checked={form.remember}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        remember: e.target.checked,
                      })
                    }
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />

                  <span className="text-sm text-slate-600">
                    Remember Me
                  </span>

                </label>

                <button
                  type="button"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
                >
                  Forgot Password?
                </button>

              </div>

              {/* ================= LOGIN BUTTON ================= */}

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition-all duration-200 text-white rounded-xl py-3.5 font-semibold shadow-lg shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={20}
                      className="animate-spin"
                    />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              {/* ================= DIVIDER ================= */}

              <div className="relative py-2">

                <div className="absolute inset-0 flex items-center">

                  <div className="w-full border-t border-slate-200"></div>

                </div>

                <div className="relative flex justify-center">

                  <span className="bg-white px-4 text-sm text-slate-400">
                    Enterprise Security
                  </span>

                </div>

              </div>

                            {/* ================= SECURITY FEATURES ================= */}

              <div className="grid grid-cols-2 gap-3">

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <ShieldCheck
                        size={20}
                        className="text-emerald-600"
                      />
                    </div>

                    <div>
                      <p className="font-semibold text-slate-800">
                        Secure Login
                      </p>
                      <p className="text-xs text-slate-500">
                        SSL Encrypted
                      </p>
                    </div>

                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Lock
                        size={20}
                        className="text-blue-600"
                      />
                    </div>

                    <div>
                      <p className="font-semibold text-slate-800">
                        Protected
                      </p>
                      <p className="text-xs text-slate-500">
                        Role Based Access
                      </p>
                    </div>

                  </div>
                </div>

              </div>

              {/* ================= FOOTER ================= */}

              <div className="pt-3 text-center">

                <p className="text-sm text-slate-500">
                  Need access to the CRM?
                </p>

                <button
                  type="button"
                  className="mt-2 text-blue-600 hover:text-blue-700 font-semibold transition"
                >
                  Contact Administrator
                </button>

              </div>

            </div>

          </div>

          {/* COPYRIGHT */}

          <div className="mt-10 text-center text-xs text-slate-400">
            © 2026 Enterprise CRM Platform.
            <br />
            All Rights Reserved.
          </div>

        </div>

      </div>

    </div>
  );
}