import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Users, UserRound, Wallet, Boxes, KanbanSquare, BarChart3,
  ShieldCheck, Workflow, Globe2, Check, Sparkles,
} from "lucide-react";

export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${inView ? "in-view" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Nav /><Hero /><LogoStrip /><ModulesBento />
      <Workflow2 /><Stats /><Pricing /><CTA /><Footer />
    </div>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <a href="#" className="flex items-center gap-2">
          <LogoMark />
          <span className="font-display text-lg font-bold tracking-tight">Nexora</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#modules" className="hover:text-foreground">Modules</a>
          <a href="#workflow" className="hover:text-foreground">Workflow</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#login" className="hidden rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground sm:inline-flex">Sign in</a>
          <a href="#demo" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
            Book a demo <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-[oklch(0.7_0.16_280)] text-primary-foreground">
      <Sparkles className="h-4 w-4" />
    </span>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="absolute -top-32 left-1/2 -z-0 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-brand-soft blur-3xl animate-blob" />
      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-16 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse-dot" />
              New · Nexora 4.0 with AI-assisted workflows
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              One ERP portal to run<br className="hidden sm:block" />
              <span className="animate-gradient bg-gradient-to-r from-brand via-[oklch(0.55_0.2_280)] to-brand bg-clip-text text-transparent">
                your entire enterprise.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Nexora unifies CRM, HR, Finance, Inventory, Projects and Analytics in a
              single workspace — so every team works from one source of truth.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#demo" className="group inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 hover:shadow-lg hover:shadow-brand/30 sm:w-auto">
                Start free trial <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#modules" className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-muted sm:w-auto">
                Explore modules
              </a>
            </div>
          </Reveal>
          <p className="mt-4 text-xs text-muted-foreground">No credit card required · 14-day trial · Cancel anytime</p>
        </div>
        <Reveal delay={500}><div className="animate-float"><DashboardPreview /></div></Reveal>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <div className="relative mx-auto mt-14 max-w-5xl">
      <div className="absolute -inset-x-8 -bottom-10 -top-2 -z-10 rounded-[2rem] bg-gradient-to-b from-brand/15 to-transparent blur-2xl" />
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-brand/10">
        <div className="flex items-center gap-1.5 border-b border-border bg-surface-muted px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.75_0.18_25)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.85_0.16_85)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.16_150)]" />
          <span className="ml-3 text-xs text-muted-foreground">app.nexora.io / overview</span>
        </div>
        <div className="grid grid-cols-12 gap-3 p-3 sm:p-5">
          <aside className="col-span-12 flex gap-2 overflow-x-auto rounded-xl bg-surface p-2 text-xs sm:col-span-3 sm:flex-col sm:overflow-visible">
            {[{label:"Overview",active:true},{label:"CRM"},{label:"HR"},{label:"Finance"},{label:"Inventory"},{label:"Projects"}].map(item => (
              <div key={item.label} className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-2 sm:whitespace-normal ${item.active ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"}`}>
                {item.label}
              </div>
            ))}
          </aside>
          <main className="col-span-12 space-y-3 sm:col-span-9">
            <div className="grid grid-cols-3 gap-3">
              <MiniStat label="Revenue" value="$1.24M" delta="+12.4%" />
              <MiniStat label="Pipeline" value="384" delta="+8.1%" />
              <MiniStat label="Headcount" value="2,418" delta="+24" />
            </div>
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">Revenue vs forecast</span>
                <span className="text-[10px] text-muted-foreground">Last 12 months</span>
              </div>
              <ChartLine />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value, delta }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-lg font-bold sm:text-xl">{value}</div>
      <div className="text-[10px] font-medium text-[oklch(0.55_0.15_150)]">{delta}</div>
    </div>
  );
}

function ChartLine() {
  return (
    <svg viewBox="0 0 400 120" className="h-24 w-full sm:h-32">
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.62 0.19 256)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="oklch(0.62 0.19 256)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0,90 C40,80 60,60 90,55 C120,50 150,80 180,70 C210,60 240,30 280,35 C320,40 350,20 400,15 L400,120 L0,120 Z" fill="url(#g1)" />
      <path d="M0,90 C40,80 60,60 90,55 C120,50 150,80 180,70 C210,60 240,30 280,35 C320,40 350,20 400,15" fill="none" stroke="oklch(0.62 0.19 256)" strokeWidth="2" className="animate-draw" />
      <path d="M0,100 C50,95 100,90 150,88 C200,86 250,75 300,72 C340,70 380,65 400,62" fill="none" stroke="oklch(0.7 0.04 256)" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  );
}

/* ---------- Logo strip ---------- */
function LogoStrip() {
  const names = ["Lumen Co", "Helix", "Northwind", "Vertex", "Orbital", "Cinder"];
  const loop = [...names, ...names];
  return (
    <section className="border-y border-border/60 bg-surface/60">
      <div className="mx-auto max-w-7xl px-5 py-8">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">Trusted by 2,400+ teams worldwide</p>
        <div className="mt-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max gap-12 animate-marquee">
            {loop.map((n, i) => (
              <div key={i} className="shrink-0 font-display text-sm font-semibold tracking-tight text-muted-foreground opacity-70">{n}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Modules bento ---------- */
function ModulesBento() {
  return (
    <section id="modules" className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
      <SectionHeading eyebrow="Modules" title="Every department, one platform."
        sub="Activate only what you need. Each Nexora module is fully integrated — share data, automations and reports across teams without rebuilding anything." />
      <div className="mt-12 grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-4 sm:grid-cols-6 sm:gap-5">
        <BentoCard className="sm:col-span-4" icon={<Users className="h-5 w-5" />} title="CRM" desc="Pipeline, deals, contacts, and AI lead scoring in one inbox-style workspace."><CrmVisual /></BentoCard>
        <BentoCard className="sm:col-span-2" icon={<Wallet className="h-5 w-5" />} title="Finance" desc="Real-time GL, invoicing and multi-currency books."><FinanceVisual /></BentoCard>
        <BentoCard className="sm:col-span-2" icon={<UserRound className="h-5 w-5" />} title="HR & People" desc="Hiring, payroll, time-off and performance reviews."><HrVisual /></BentoCard>
        <BentoCard className="sm:col-span-2" icon={<Boxes className="h-5 w-5" />} title="Inventory" desc="Warehouses, SKUs, transfers and supplier orders."><InventoryVisual /></BentoCard>
        <BentoCard className="sm:col-span-2" icon={<KanbanSquare className="h-5 w-5" />} title="Projects" desc="Tasks, timesheets and capacity for every team."><ProjectsVisual /></BentoCard>
        <BentoCard className="sm:col-span-4" icon={<BarChart3 className="h-5 w-5" />} title="Analytics" desc="Cross-module dashboards with live KPIs and AI insights you can act on."><AnalyticsVisual /></BentoCard>
      </div>
    </section>
  );
}

function BentoCard({
  className = "",
  icon,
  title,
  desc,
  children,
}) {
  return (
    <Reveal className={className}>
      <article className="group hover-lift relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-soft text-brand transition-transform group-hover:scale-110 group-hover:rotate-3">{icon}</span>
          <h3 className="font-display text-base font-bold">{title}</h3>
        </div>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">{desc}</p>
        <div className="mt-5 flex-1">{children}</div>
      </article>
    </Reveal>
  );
}

function CrmVisual() {
  const stages = [
    { name: "Lead", count: 42, hue: "oklch(0.85 0.06 256)" },
    { name: "Qualified", count: 28, hue: "oklch(0.78 0.1 256)" },
    { name: "Proposal", count: 14, hue: "oklch(0.7 0.14 256)" },
    { name: "Won", count: 9, hue: "oklch(0.62 0.19 256)" },
  ];
  return (
    <div className="grid grid-cols-4 gap-2 rounded-xl border border-border bg-surface p-3">
      {stages.map(s => (
        <div key={s.name} className="flex flex-col gap-1.5">
          <div className="text-[10px] font-semibold text-muted-foreground">{s.name}</div>
          <div className="rounded-md px-2 py-1.5 text-[10px] font-bold text-primary-foreground" style={{ background: s.hue }}>
            ${(s.count * 3.2).toFixed(0)}K
          </div>
          <div className="h-8 rounded-md bg-card" />
          <div className="h-8 rounded-md bg-card" />
        </div>
      ))}
    </div>
  );
}

function FinanceVisual() {
  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-[10px] uppercase text-muted-foreground">Cash position</div>
          <div className="font-display text-xl font-bold">$842,310</div>
        </div>
        <span className="rounded-md bg-brand-soft px-1.5 py-0.5 text-[10px] font-semibold text-brand">+6.2%</span>
      </div>
      <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-card">
        <span className="h-full w-[55%] bg-brand" />
        <span className="h-full w-[25%] bg-[oklch(0.78_0.1_256)]" />
        <span className="h-full w-[20%] bg-[oklch(0.86_0.06_256)]" />
      </div>
      <div className="mt-3 flex justify-between text-[10px] text-muted-foreground">
        <span>Operating</span><span>Reserve</span><span>Tax</span>
      </div>
    </div>
  );
}

function HrVisual() {
  return (
    <div className="space-y-2 rounded-xl border border-border bg-surface p-3">
      {["Aarav P.", "Mira S.", "Diego R."].map((n, i) => (
        <div key={n} className="flex items-center gap-2 rounded-lg bg-card px-2 py-1.5">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-soft text-[10px] font-bold text-brand">
            {n.split(" ").map(s => s[0]).join("")}
          </span>
          <div className="flex-1 min-w-0">
            <div className="truncate text-xs font-semibold">{n}</div>
            <div className="text-[10px] text-muted-foreground">{["Engineering", "Design", "Sales"][i]}</div>
          </div>
          <span className="rounded-md bg-brand-soft px-1.5 py-0.5 text-[10px] font-semibold text-brand">
            {["PTO", "Active", "Onboard"][i]}
          </span>
        </div>
      ))}
    </div>
  );
}

function InventoryVisual() {
  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <div className="grid grid-cols-6 gap-1">
        {Array.from({ length: 24 }).map((_, i) => {
          const level = (i * 37) % 100;
          return (
            <div key={i} className="h-6 rounded-sm"
              style={{ background: `color-mix(in oklch, oklch(0.62 0.19 256) ${level}%, oklch(0.95 0.012 250))` }} />
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>4 warehouses</span>
        <span className="font-semibold text-foreground">98.4% in stock</span>
      </div>
    </div>
  );
}

function ProjectsVisual() {
  const cols = [{ name: "To do", items: 3 }, { name: "Doing", items: 2 }, { name: "Done", items: 4 }];
  return (
    <div className="grid grid-cols-3 gap-2 rounded-xl border border-border bg-surface p-3">
      {cols.map(c => (
        <div key={c.name} className="space-y-1.5">
          <div className="text-[10px] font-semibold text-muted-foreground">{c.name}</div>
          {Array.from({ length: c.items }).map((_, i) => (
            <div key={i} className="rounded-md border border-border bg-card p-1.5">
              <div className="h-1 w-2/3 rounded-full bg-brand-soft" />
              <div className="mt-1 h-1 w-1/2 rounded-full bg-surface-muted" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function AnalyticsVisual() {
  const bars = [40, 65, 50, 80, 60, 90, 70, 95, 78, 110, 88, 120];
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-end justify-between gap-1.5 sm:gap-2">
        {bars.map((h, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div className="w-full rounded-t-md bg-gradient-to-t from-brand to-[oklch(0.78_0.14_256)] animate-bar"
              style={{ height: `${h}px`, animationDelay: `${i * 70}ms` }} />
            <span className="text-[9px] text-muted-foreground">{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Workflow ---------- */
function Workflow2() {
  const items = [
    { icon: <Workflow className="h-5 w-5" />, title: "Unified data model", desc: "Customers, employees and ledgers share one schema — no more CSV exports between systems." },
    { icon: <ShieldCheck className="h-5 w-5" />, title: "Enterprise-grade security", desc: "SOC 2 Type II, SSO/SAML, granular roles and full audit trails on every record." },
    { icon: <Globe2 className="h-5 w-5" />, title: "Built for global teams", desc: "Multi-entity, multi-currency, multi-language. Compliant in 40+ countries out of the box." },
  ];
  return (
    <section id="workflow" className="border-y border-border/60 bg-surface/50">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:py-24">
        <SectionHeading eyebrow="Why Nexora" title="Replace 12 tools with one workspace."
          sub="Stop paying for disconnected SaaS. Nexora is the operating layer your enterprise actually runs on." />
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 120}>
              <div className="hover-lift h-full rounded-2xl border border-border bg-card p-6">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-soft text-brand">{it.icon}</span>
                <h3 className="mt-4 font-display text-lg font-bold">{it.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */
function Stats() {
  const stats = [
    { v: "2,400+", l: "Enterprises onboard" },
    { v: "$48B", l: "Processed annually" },
    { v: "99.99%", l: "Platform uptime" },
    { v: "40+", l: "Countries supported" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="grid grid-cols-2 gap-6 rounded-2xl border border-border bg-card p-8 sm:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.l} delay={i * 100}>
            <div className="text-center">
              <div className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{s.v}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Pricing ---------- */
function Pricing() {
  const tiers = [
    { name: "Starter", price: "$29", desc: "For small teams getting organized.",
      features: ["Up to 25 users", "CRM + HR modules", "Email support", "5 GB storage"] },
    { name: "Business", price: "$79", desc: "Everything growing companies need.",
      features: ["Unlimited users", "All modules included", "AI automations", "Priority support", "SSO + audit logs"], featured: true },
    { name: "Enterprise", price: "Custom", desc: "For multi-entity organizations.",
      features: ["Custom data residency", "Dedicated CSM", "SLA 99.99%", "On-prem option"] },
  ];
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
      <SectionHeading eyebrow="Pricing" title="Simple per-user pricing." sub="One plan covers every module. Upgrade or downgrade anytime." />
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {tiers.map((t, i) => (
          <Reveal key={t.name} delay={i * 140}>
            <div className={`hover-lift relative h-full rounded-2xl border p-7 ${t.featured ? "border-brand bg-card shadow-xl shadow-brand/10 lg:-translate-y-2" : "border-border bg-card"}`}>
              {t.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">Most popular</span>
              )}
              <h3 className="font-display text-lg font-bold">{t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold">{t.price}</span>
                {t.price !== "Custom" && <span className="text-sm text-muted-foreground">/ user / month</span>}
              </div>
              <ul className="mt-6 space-y-2.5">
                {t.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /><span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#demo" className={`mt-7 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition ${t.featured ? "bg-primary text-primary-foreground hover:opacity-90 hover:shadow-lg hover:shadow-brand/30" : "border border-border bg-background text-foreground hover:bg-surface-muted"}`}>
                {t.price === "Custom" ? "Contact sales" : "Start free trial"}
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
function CTA() {
  return (
    <section id="demo" className="mx-auto max-w-7xl px-5 pb-20">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[oklch(0.97_0.02_256)] to-card p-10 sm:p-16">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />
        <div className="relative max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">Ready to unify your enterprise?</h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">Get a personalized 30-minute walkthrough with one of our solution architects.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="#demo" className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
              Book a demo <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold hover:bg-surface-muted">Talk to sales</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer id="contact" className="border-t border-border/60 bg-surface/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:grid-cols-4">
        <div className="sm:col-span-2">
          <a href="#" className="flex items-center gap-2"><LogoMark /><span className="font-display text-lg font-bold tracking-tight">Nexora</span></a>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">The unified ERP portal for modern enterprises.</p>
        </div>
        <div>
          <div className="font-display text-sm font-semibold">Product</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="#modules" className="hover:text-foreground">Modules</a></li>
            <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
            <li><a href="#workflow" className="hover:text-foreground">Security</a></li>
          </ul>
        </div>
        <div>
          <div className="font-display text-sm font-semibold">Company</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">About</a></li>
            <li><a href="#" className="hover:text-foreground">Careers</a></li>
            <li><a href="#" className="hover:text-foreground">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Nexora Inc. All rights reserved.</span>
          <div className="flex gap-4"><a href="#" className="hover:text-foreground">Privacy</a><a href="#" className="hover:text-foreground">Terms</a></div>
        </div>
      </div>
    </footer>
  );
}

function SectionHeading({ eyebrow, title, sub }) {
    return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand">{eyebrow}</div>
      <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base text-muted-foreground">{sub}</p>
    </div>
  );
}
