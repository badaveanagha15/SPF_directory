import React, { useState, useMemo } from "react";
import {
  DollarSign,
  TrendingUp,
  Activity,
  AlertTriangle,
  Target,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ComposedChart,
  LineChart,
} from "recharts";

const baseRevenueData = [
  { month: "Jan", actual: 820000, predicted: 850000, low: 780000, high: 920000 },
  { month: "Feb", actual: 910000, predicted: 940000, low: 870000, high: 1000000 },
  { month: "Mar", actual: 1050000, predicted: 1100000, low: 1000000, high: 1180000 },
  { month: "Apr", actual: 1180000, predicted: 1220000, low: 1100000, high: 1320000 },
  { month: "May", actual: 1320000, predicted: 1400000, low: 1280000, high: 1500000 },
  { month: "Jun", actual: 1480000, predicted: 1550000, low: 1420000, high: 1680000 },
];

const cashFlowData = [
  { month: "Jan", incoming: 1200000, outgoing: 800000, net: 400000 },
  { month: "Feb", incoming: 1350000, outgoing: 850000, net: 500000 },
  { month: "Mar", incoming: 1500000, outgoing: 920000, net: 580000 },
  { month: "Apr", incoming: 1650000, outgoing: 1100000, net: 550000 },
  { month: "May", incoming: 1820000, outgoing: 1180000, net: 640000 },
  { month: "Jun", incoming: 2050000, outgoing: 1280000, net: 770000 },
];

const leadSourceData = [
  { source: "Website", leads: 320, revenue: 1850000 },
  { source: "Referral", leads: 180, revenue: 1420000 },
  { source: "Facebook", leads: 240, revenue: 980000 },
  { source: "Google Ads", leads: 290, revenue: 1680000 },
  { source: "Cold Call", leads: 110, revenue: 520000 },
  { source: "Events", leads: 145, revenue: 760000 },
];

const performers = [
  { name: "Rinku Singh", revenue: 4800000, growth: 18, score: 96 },
  { name: "Akshay Mehta", revenue: 4300000, growth: 14, score: 91 },
  { name: "Priya Sharma", revenue: 3900000, growth: 12, score: 88 },
];

const departments = [
  { name: "Sales", achievement: 96 },
  { name: "Marketing", achievement: 82 },
  { name: "Support", achievement: 67 },
  { name: "Operations", achievement: 48 },
];

const funnel = [
  { stage: "New Leads", value: 1000 },
  { stage: "Contacted", value: 820 },
  { stage: "Qualified", value: 540 },
  { stage: "Proposal", value: 300 },
  { stage: "Negotiation", value: 140 },
  { stage: "Closed Won", value: 78 },
];

const formatINR = (num) =>
  `₹${new Intl.NumberFormat("en-IN").format(num)}`;

export default function OwnerAnalytics() {
  const [annualGoal, setAnnualGoal] = useState(50000000);

  const multiplier = annualGoal / 50000000;

  const revenueData = useMemo(() => {
    return baseRevenueData.map((item) => ({
      ...item,
      predicted: Math.round(item.predicted * multiplier),
      low: Math.round(item.low * multiplier),
      high: Math.round(item.high * multiplier),
    }));
  }, [annualGoal, multiplier]);

  return (
    <div className="ml-[60px] min-h-screen bg-slate-50 px-4 py-4 pt-14">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-black text-slate-950">
          Executive Vault
        </h1>
        <p className="text-slate-500 text-xs mt-1">
          Mission-critical analytics dashboard for organization owner
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <PulseCard title="Total Revenue" value={formatINR(128000000)} live />
        <PulseCard
          title="Sales of Year"
          value={formatINR(42000000)}
          subtitle="+22% YoY"
        />
        <PulseCard
          title="Projected Revenue"
          value={formatINR(annualGoal)}
        />
        <PulseCard title="Target Achieved" value="76%" />
      </div>

      <div className="grid grid-cols-12 gap-3">
        {/* Revenue Prediction */}
        <Card className="col-span-8">
          <SectionTitle title="Revenue Prediction Engine" />
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatINR(value)} />

              <Area dataKey="high" fill="#dbeafe" stroke="none" />
              <Area dataKey="low" fill="#fff" stroke="none" />

              <Area
                dataKey="actual"
                stroke="#2563eb"
                fill="#bfdbfe"
                strokeWidth={3}
              />

              <Line
                dataKey="predicted"
                stroke="#0f172a"
                strokeDasharray="6 6"
                strokeWidth={3}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        {/* Performance */}
        <Card className="col-span-4">
          <SectionTitle title="Top Performers" />
          <div className="space-y-2">
            {performers.map((item, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg border border-slate-200 bg-white"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-xs text-slate-500">
                      {formatINR(item.revenue)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-blue-600">
                      {item.score}/100
                    </p>
                    <p className="text-xs text-green-600">
                      +{item.growth}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Cash Flow */}
        <Card className="col-span-8">
          <SectionTitle title="Cash Flow Intelligence" />
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatINR(value)} />
              <Bar dataKey="incoming" fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Line dataKey="outgoing" stroke="#f43f5e" strokeWidth={3} />
              <Line dataKey="net" stroke="#10b981" strokeWidth={3} />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        {/* Department */}
        <Card className="col-span-4">
          <SectionTitle title="Department Heatmap" />
          <div className="space-y-3">
            {departments.map((dept, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{dept.name}</span>
                  <span>{dept.achievement}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{ width: `${dept.achievement}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Lead Source Analytics */}
        <Card className="col-span-6">
          <SectionTitle title="Lead Source Analytics" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={leadSourceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="source" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="leads" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Funnel */}
        <Card className="col-span-6">
          <SectionTitle title="Lead Leakage Funnel" />
          <div className="space-y-2">
            {funnel.map((item, index) => {
              const drop =
                index === 0 ? 0 : funnel[index - 1].value - item.value;

              return (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.stage}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{
                        width: `${(item.value / funnel[0].value) * 100}%`,
                      }}
                    />
                  </div>

                  {drop > 200 && (
                    <div className="flex items-center gap-1 text-xs text-rose-500 mt-1">
                      <AlertTriangle size={12} />
                      High Drop: {drop}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Strategy */}
        <Card className="col-span-12">
          <SectionTitle title="Strategy Simulator" />
          <label className="text-sm text-slate-500">
            Annual Revenue Goal
          </label>

          <input
            type="range"
            min={30000000}
            max={100000000}
            step={1000000}
            value={annualGoal}
            onChange={(e) => setAnnualGoal(Number(e.target.value))}
            className="w-full mt-3"
          />

          <p className="text-xl font-black text-blue-600 mt-3 tabular-nums">
            {formatINR(annualGoal)}
          </p>
        </Card>
      </div>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white border border-slate-200 rounded-xl shadow-sm p-4 ${className}`}
    >
      {children}
    </div>
  );
}

function SectionTitle({ title }) {
  return (
    <h2 className="text-base font-bold text-slate-950 mb-3">
      {title}
    </h2>
  );
}

function PulseCard({ title, value, subtitle, live }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm px-4 py-3">
      <div className="flex justify-between items-center">
        <p className="text-sm text-slate-500">{title}</p>

        {live && (
          <div className="flex items-center gap-1 text-xs text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </div>
        )}
      </div>

      <p className="text-xl font-black text-slate-950 mt-2 tabular-nums">
        {value}
      </p>

      {subtitle && (
        <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
}