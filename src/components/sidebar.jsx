import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { icon: "🏠", path: "/", title: "Dashboard" },
    { icon: "👤", path: "/leads", title: "Leads" },
    { icon: "💼", path: "/deals", title: "Deals" },
    { icon: "✅", path: "/tasks", title: "Tasks" },
    { icon: "📞", path: "/calls", title: "Calls" },
    { icon: "✉️", path: "/emails", title: "Emails" },
  ];

  return (
    <aside className="fixed top-0 left-0 w-[60px] h-full bg-white border-r flex flex-col items-center pt-16 space-y-6">

      {menu.map((item, i) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
            title={item.title}
            key={i}
            to={item.path}
            className={`relative flex items-center justify-center ${
              isActive ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
            }`}
          >
            {/* Active Bar */}
            {isActive && (
              <div className="absolute left-0 w-[4px] h-full bg-blue-600"></div>
            )}

            {item.icon}
          </Link>
        );
      })}
    </aside>
  );
}